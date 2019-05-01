import { template, traverse, types as t } from "@babel/core";
import { environmentVisitor } from "@babel/helper-replace-supers";
import { hasOwnDecorators } from "./decorators/misc";

const findBareSupers = traverse.visitors.merge([
  {
    Super(path) {
      const { node, parentPath } = path;
      if (parentPath.isCallExpression({ callee: node })) {
        this.push(parentPath);
      }
    },
  },
  environmentVisitor,
]);

const referenceVisitor = {
  "TSTypeAnnotation|TypeAnnotation"(path) {
    path.skip();
  },

  ReferencedIdentifier(path) {
    if (this.scope.hasOwnBinding(path.node.name)) {
      this.scope.rename(path.node.name);
      path.skip();
    }
  },
};

const classFieldDefinitionEvaluationTDZVisitor = traverse.visitors.merge([
  {
    ReferencedIdentifier(path) {
      if (
        this.classBinding &&
        this.classBinding === path.scope.getBinding(path.node.name)
      ) {
        const classNameTDZError = this.file.addHelper("classNameTDZError");
        const throwNode = t.callExpression(classNameTDZError, [
          t.stringLiteral(path.node.name),
        ]);

        path.replaceWith(t.sequenceExpression([throwNode, path.node]));
        path.skip();
      }
    },
  },
  environmentVisitor,
]);

export function injectInitialization(path, constructor, nodes, renamer) {
  if (!nodes.length) return;

  const isDerived = !!path.node.superClass;

  if (!constructor) {
    const newConstructor = t.classMethod(
      "constructor",
      t.identifier("constructor"),
      [],
      t.blockStatement([]),
    );

    if (isDerived) {
      newConstructor.params = [t.restElement(t.identifier("args"))];
      newConstructor.body.body.push(template.statement.ast`super(...args)`);
    }

    [constructor] = path.get("body").unshiftContainer("body", newConstructor);
  }

  if (renamer) {
    renamer(referenceVisitor, { scope: constructor.scope });
  }

  if (isDerived) {
    const bareSupers = [];
    constructor.traverse(findBareSupers, bareSupers);
    for (const bareSuper of bareSupers) {
      bareSuper.insertAfter(nodes);
    }
  } else {
    constructor.get("body").unshiftContainer("body", nodes);
  }
}

export function extractImpureExpressions(ref, path, paths, file) {
  const declarations = [];
  const classBinding = path.node.id && path.scope.getBinding(path.node.id.name);

  extractDecorators(path, declarations);

  for (const path of paths) {
    extractDecorators(path, declarations);

    if (path.node.computed) {
      path.traverse(classFieldDefinitionEvaluationTDZVisitor, {
        classBinding,
        file,
      });

      path.set("key", maybeExtract(path.get("key"), declarations));
    }
  }

  return declarations;
}

function extractDecorators(path, declarations) {
  if (hasOwnDecorators(path.node)) {
    for (const dec of path.get("decorators")) {
      const args = dec.get("arguments");

      if (args.some(arg => arg.isSpreadElement())) {
        const ident = path.scope.generateUidIdentifier();
        declarations.push(
          t.variableDeclaration("var", [
            t.variableDeclarator(ident, t.arrayExpression(dec.node.arguments)),
          ]),
        );
        dec.node.arguments = [t.spreadElement(t.cloneNode(ident))];
      } else {
        for (let i = 0; i < args.length; i++) {
          dec.node.arguments[i] = maybeExtract(args[i], declarations);
        }
      }
    }
  }
}

function maybeExtract(path, declarations) {
  if (path.isConstantExpression()) return path.node;

  const ident = path.scope.generateUidIdentifierBasedOnNode(path.node);
  declarations.push(
    t.variableDeclaration("var", [t.variableDeclarator(ident, path.node)]),
  );

  return t.cloneNode(ident);
}

export function getPropertyName(node) {
  if (node.computed) return node.key;
  if (t.isLiteral(node.key)) return t.stringLiteral(String(node.key.value));
  return t.stringLiteral(node.key.name);
}
