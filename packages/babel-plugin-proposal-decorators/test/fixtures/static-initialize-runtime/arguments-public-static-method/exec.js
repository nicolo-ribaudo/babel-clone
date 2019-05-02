const fn = jest.fn();

class A {
  @initialize(fn)
  static method() {}
}

expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(A, "method");
expect(A).toHaveProperty("method");
