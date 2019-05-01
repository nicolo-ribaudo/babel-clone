import { types as t, template } from "@babel/core";
import { hasOwnDecorators } from "./misc";
import { getPropertyName } from "../misc";

function getLoneArg(dec, scope) {
  const args = dec.arguments;

  if (args.length === 0) {
    return scope.buildUndefinedNode();
  } else if (t.isSpreadElement(args[0])) {
    return t.memberExpression(args[0].argument, t.numericLiteral(0), true);
  } else {
    return args[0];
  }
}

function extractDecorators(path, name) {
  const decorators = [];

  if (!hasOwnDecorators(path.node)) return decorators;

  for (const dec of path.get("decorators")) {
    if (dec.node.id.name === name) decorators.unshift(dec);
  }

  return decorators;
}

export function extractInitializerFn(el) {
  const decorators = extractDecorators(el, "initialize");
  if (decorators.length === 0) return null;
  if (decorators.length > 1) {
    throw decorators[1].buildCodeFrameError(
      "Only one @initialize decorator per element is allowed.",
    );
  }

  const dec = decorators[0];

  if (el.isPrivate()) {
    throw dec.buildCodeFrameError(
      "@initialize is not allowed on private elements.",
    );
  }

  const fn = getLoneArg(dec.node, el.scope);
  dec.remove();
  return fn;
}

export function applyClassInitializers(path) {
  const decorators = extractDecorators(path, "initialize");
  if (!decorators.length) return null;

  const instanceNodes = [];
  for (const dec of decorators) {
    instanceNodes.push(
      template.statement.ast`${getLoneArg(dec.node, path.scope)}(this);`,
    );
    dec.remove();
  }

  return { instanceNodes };
}

export function buildInitializerCall(fn, target, prop, value) {
  const name = getPropertyName(prop);
  const args = value ? [target, name, value] : [target, name];

  return t.expressionStatement(t.callExpression(fn, args));
}

export function extractElementWrappers(el) {
  const decorators = extractDecorators(el, "wrap");
  if (decorators.length === 0) return [];

  if (!el.isMethod()) {
    throw decorators[0].buildCodeFrameError(
      "@wrap decorators are only allowed on classes or methods.",
    );
  }

  return decorators.map(dec => {
    const fn = getLoneArg(dec.node, el.scope);
    dec.remove();
    return fn;
  });
}

export function applyClassWrappers(path, ref) {
  const decorators = extractDecorators(path, "wrap");
  if (!decorators.length) return null;

  const calls = decorators.reduce((result, dec) => {
    const fn = getLoneArg(dec.node, dec.scope);
    dec.remove();
    return t.callExpression(fn, [result]);
  }, t.cloneNode(ref));

  return {
    needsClassRef: true,
    staticNodes: [
      t.expressionStatement(
        t.assignmentExpression("=", t.cloneNode(ref), calls),
      ),
    ],
  };
}

export function buildPublicMethodWrapper(wrappers, ref, isInstance, node) {
  const obj = isInstance
    ? t.memberExpression(ref, t.identifier("prototype"))
    : ref;
  const name = getPropertyName(node);
  const isMethod = node.kind === "method";

  let value;
  if (isMethod) {
    value = t.memberExpression(obj, name, true);
  } else {
    value = template.expression.ast`
      Object.getOwnPropertyDescriptor(
        ${obj},
        ${name}
      ).${t.identifier(node.kind)}
    `;
  }

  for (const fn of wrappers) {
    value = t.callExpression(fn, [value]);
  }

  if (isMethod) {
    return template.statement.ast`
      ${t.cloneNode(obj)}[${t.cloneNode(name)}] = ${value};
    `;
  } else {
    return template.statement.ast`
      Object.defineProperty(${t.cloneNode(obj)}, ${t.cloneNode(name)}, {
        ${t.identifier(node.kind)}: ${value}
      });
    `;
  }
}

export function extractElementRegisters(el) {
  const decorators = extractDecorators(el, "register");
  if (decorators.length === 0) return [];

  if (el.isPrivate()) {
    throw decorators[0].buildCodeFrameError(
      "@register is not allowed on private elements.",
    );
  }

  return decorators.map(dec => {
    const fn = getLoneArg(dec.node, el.scope);
    dec.remove();
    return fn;
  });
}

export function applyClassRegisters(path, ref) {
  const decorators = extractDecorators(path, "register");
  if (!decorators.length) return null;

  const calls = decorators.map(dec => {
    const fn = getLoneArg(dec.node, dec.scope);
    dec.remove();
    return t.expressionStatement(t.callExpression(fn, [t.cloneNode(ref)]));
  });

  return { needsClassRef: true, finalNodes: calls };
}

export function buildRegisterCalls(registers, ref, isInstance, node) {
  const obj = isInstance
    ? t.memberExpression(ref, t.identifier("prototype"))
    : ref;
  const name = getPropertyName(node);

  return registers.map(fn =>
    t.expressionStatement(
      t.callExpression(fn, [t.cloneNode(obj), t.cloneNode(name)]),
    ),
  );
}

export function extractElementExpositors(el) {
  const decorators = extractDecorators(el, "expose");
  if (decorators.length === 0) return [];

  if (!el.isPrivate()) {
    throw decorators[0].buildCodeFrameError(
      "@expose is only allowed on private elements.",
    );
  }

  return decorators.map(dec => {
    const fn = getLoneArg(dec.node, el.scope);
    dec.remove();
    return fn;
  });
}

export function disallowClassExpositor(path) {
  const decorators = extractDecorators(path, "expose");

  if (decorators.length > 0) {
    throw decorators[0].buildCodeFrameError(
      "@expose is only allowed on private elements.",
    );
  }
}

export function buildExpositorCalls(
  expositors,
  ref,
  isInstance,
  node,
  privateNamesMap,
  file,
) {
  const obj = isInstance
    ? t.memberExpression(ref, t.identifier("prototype"))
    : ref;
  const { name } = node.key.id;
  const {
    id,
    static: isStatic,
    method: isMethod,
    methodId,
    getId,
    setId,
  } = privateNamesMap.get(name);

  let getFn, setFn;

  if (isStatic) {
    const helperGet = isMethod
      ? "classStaticPrivateMethodGet"
      : "classStaticPrivateFieldSpecGet";
    const helperSet = isMethod
      ? "classStaticPrivateMethodSet"
      : "classStaticPrivateFieldSpecSet";

    getFn = template.expression.ast`
      obj => ${file.addHelper(helperGet)}(obj, ${ref}, ${id})
    `;
    setFn = template.expression.ast`
      (obj, val) => ${file.addHelper(helperSet)}(obj, ${ref}, ${id}, val)
    `;
  } else if (isMethod && !getId && !setId) {
    getFn = template.expression.ast`
      obj => ${file.addHelper("classPrivateMethodGet")}(obj, ${id}, ${methodId})
    `;
    setFn = file.addHelper("classPrivateMethodSet");
  } else {
    getFn = template.expression.ast`
      obj => ${file.addHelper("classPrivateFieldGet")}(obj, ${id})
    `;
    setFn = template.expression.ast`
      (obj, val) => ${file.addHelper("classPrivateFieldSet")}(obj, ${id}, val)
    `;
  }

  return expositors.map(fn =>
    t.expressionStatement(
      t.callExpression(fn, [
        t.cloneNode(obj),
        t.stringLiteral("#" + name),
        getFn,
        setFn,
      ]),
    ),
  );
}
