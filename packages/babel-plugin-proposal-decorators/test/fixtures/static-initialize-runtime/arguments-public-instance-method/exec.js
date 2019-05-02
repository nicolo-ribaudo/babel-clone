const fn = jest.fn();

class A {
  @initialize(fn)
  method() {}
}

expect(fn).not.toBeCalled();

const instance = new A;

expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(instance, "method");
expect(instance).toHaveProperty("method");
expect(A.prototype).toHaveProperty("method");
