import { declare } from "@babel/helper-plugin-utils";

export default declare((api, options) => {
  api.assertVersion(7);

  const { legacy = false, static: static_ = false } = options;
  if (typeof legacy !== "boolean") {
    throw new Error("'legacy' must be a boolean.");
  }
  if (typeof static_ !== "boolean") {
    throw new Error("'static' must be a boolean.");
  }

  let proposal: "legacy" | "big" | "static";
  if (legacy) {
    if (static_) {
      throw new Error(
        "'static' and 'legacy' decorators can't be enabled at the same time.",
      );
    }
    proposal = "legacy";
  } else if (static_) {
    proposal = "static";
  } else {
    proposal = "big";
  }

  const { decoratorsBeforeExport } = options;
  if (decoratorsBeforeExport === undefined) {
    if (proposal === "big") {
      throw new Error(
        "The '@babel/plugin-syntax-decorators' plugin requires a" +
          " 'decoratorsBeforeExport' option, whose value must be a boolean." +
          " If you want to use the legacy decorators semantics, you can set" +
          " the 'legacy: true' option.",
      );
    }
  } else {
    if (proposal !== "big") {
      throw new Error(
        `'decoratorsBeforeExport' can't be used with ${proposal} decorators.`,
      );
    }
    if (typeof decoratorsBeforeExport !== "boolean") {
      throw new Error("'decoratorsBeforeExport' must be a boolean.");
    }
  }

  return {
    name: "syntax-decorators",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push(
        {
          legacy: "decorators-legacy",
          big: ["decorators", { decoratorsBeforeExport }],
          static: "staticDecorators",
        }[proposal],
      );
    },
  };
});
