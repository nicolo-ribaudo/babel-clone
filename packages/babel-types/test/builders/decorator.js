import * as t from "../..";

describe("builders", function() {
  describe("decorator", function() {
    it("legacy", function() {
      expect(t.decorator(t.identifier("foo"))).toMatchSnapshot();
    });

    it("static - no args", function() {
      expect(t.decorator(t.decoratorIdentifier("foo"))).toMatchSnapshot();
    });

    it("static - args", function() {
      expect(
        t.decorator(t.decoratorIdentifier("foo"), [t.identifier("bar")]),
      ).toMatchSnapshot();
    });
  });
});
