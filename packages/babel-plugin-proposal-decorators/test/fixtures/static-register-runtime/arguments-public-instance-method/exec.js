const fn = jest.fn();

class A {
  @register(fn)
  method() {}
}

expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(A.prototype, "method");
