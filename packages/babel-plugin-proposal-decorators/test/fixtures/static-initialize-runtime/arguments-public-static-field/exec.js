const value = {};
const fn = jest.fn();

class A {
  @initialize(fn)
  static prop = value;
}

expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(A, "prop", value);
expect(A).not.toHaveProperty("prop");
