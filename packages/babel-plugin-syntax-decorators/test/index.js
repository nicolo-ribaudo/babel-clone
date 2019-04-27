import { parse } from "@babel/core";
import syntaxDecorators from "../lib";

function makeParser(code, options) {
  return () =>
    parse(code, {
      babelrc: false,
      configFile: false,
      plugins: [[syntaxDecorators, options]],
    });
}

describe("'legacy' option", function() {
  test("must be boolean", function() {
    expect(makeParser("", { legacy: "legacy" })).toThrow();
  });

  test("'legacy': false", function() {
    expect(makeParser("({ @dec fn() {} })", { legacy: false })).toThrow();
  });

  test("'legacy': true", function() {
    expect(makeParser("({ @dec fn() {} })", { legacy: true })).not.toThrow();
  });

  test("defaults to 'false'", function() {
    expect(makeParser("({ @dec fn() {} })", {})).toThrow();
  });
});

describe("'static' option", function() {
  test("must be boolean", function() {
    expect(makeParser("", { static: "static" })).toThrow();
  });

  test("can't be used with legacy decorators", function() {
    expect(makeParser("", { static: true, legacy: true })).toThrow();
  });

  test("'static': false", function() {
    expect(makeParser("decorator @dec {}", { static: false })).toThrow();
  });

  test("'static': true", function() {
    expect(makeParser("decorator @dec {}", { static: true })).not.toThrow();
  });

  test("defaults to 'false'", function() {
    expect(makeParser("decorator @dec {}")).toThrow();
  });
});

describe("'decoratorsBeforeExport' option", function() {
  test("must be boolean", function() {
    expect(makeParser("", { decoratorsBeforeExport: "before" })).toThrow();
  });

  test.skip("is required", function() {
    expect(makeParser("", { legacy: false })).toThrow(/decoratorsBeforeExport/);
  });

  test("is incompatible with legacy", function() {
    expect(
      makeParser("", { decoratorsBeforeExport: false, legacy: true }),
    ).toThrow();
  });

  test("is incompatible with static", function() {
    expect(
      makeParser("", { decoratorsBeforeExport: false, static: true }),
    ).toThrow();
  });

  const BEFORE = "@dec export class Foo {}";
  const AFTER = "export @dec class Foo {}";

  // These are skipped
  run(BEFORE, true, false);
  run(AFTER, true, true);
  run(BEFORE, false, true);
  run(AFTER, false, false);

  function run(code, before, throws) {
    const name =
      (before === undefined ? "default" : before) +
      " - decorators " +
      (code === BEFORE ? "before" : "after") +
      "export";

    test(name, function() {
      const expectTheParser = expect(
        makeParser(code, { decoratorsBeforeExport: before }),
      );
      throws ? expectTheParser.toThrow() : expectTheParser.not.toThrow();
    });
  }
});
