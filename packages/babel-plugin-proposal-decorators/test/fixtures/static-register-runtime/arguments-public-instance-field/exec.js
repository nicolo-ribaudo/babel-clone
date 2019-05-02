const fn = jest.fn();

class A {
  @register(fn)
  prop;
}

expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(A.prototype, "prop");
