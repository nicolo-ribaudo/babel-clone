import validate from "../validators/validate";

export function Decorator(expressionOrId, args = undefined) {
  const isStatic = expressionOrId.type === "DecoratorIdentifier";
  const countArgs = arguments.length;
  const expectedCount = isStatic ? 2 : 1;

  if (countArgs > expectedCount) {
    throw new Error(
      `Decorator: Too many arguments passed. ` +
        `Received ${countArgs} but can receive no more than ${expectedCount}`,
    );
  }

  let node;

  if (isStatic) {
    node = {
      type: "Decorator",
      id: expressionOrId,
      arguments: args,
    };
    validate(node, "id", expressionOrId);
    validate(node, "arguments", args);
  } else {
    node = {
      type: "Decorator",
      expression: expressionOrId,
    };
    validate(node, "expression", expressionOrId);
  }

  return node;
}
