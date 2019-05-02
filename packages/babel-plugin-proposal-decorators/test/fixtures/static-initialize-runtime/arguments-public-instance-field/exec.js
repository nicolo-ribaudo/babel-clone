const value = {};
const fn = jest.fn();

class A {
  @initialize(fn)
  prop = value;
}

expect(fn).not.toBeCalled();

const instance = new A;

expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(instance, "prop", value);
expect(instance).not.toHaveProperty("prop");
