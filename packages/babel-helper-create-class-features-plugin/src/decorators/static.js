import { types as t, template } from "@babel/core";
import { hasOwnDecorators } from "./misc";

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

function handleRegisterDecorators(path, ref) {
  const nodes = [];

  const target =
    path.isClass() || path.node.static
      ? ref
      : t.memberExpression(ref, t.identifier("prototype"));

  const name =
    path.isClass() || path.isPrivate()
      ? null
      : path.node.computed
      ? path.node.key
      : t.stringLiteral(
          t.isIdentifier(path.node.key)
            ? path.node.key.name
            : path.node.key.value,
        );

  for (const dec of path.get("decorators")) {
    if (dec.node.id.name === "register") {
      const fn = getLoneArg(dec.node, path.scope);
      const args = name
        ? [t.cloneNode(target), t.cloneNode(name)]
        : [t.cloneNode(target)];

      nodes.unshift(t.expressionStatement(t.callExpression(fn, args)));

      dec.remove();
    }
  }

  return nodes;
}

export function transformClassDecorators(ref, path) {
  const staticNodes = [];

  for (const el of path.get("body.body")) {
    staticNodes.push(...handleRegisterDecorators(el, ref));
  }
  staticNodes.push(...handleRegisterDecorators(path, ref));

  return {
    staticNodes,
  };
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
