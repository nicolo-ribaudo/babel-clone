const fn = jest.fn();

class A {
  @register(fn)
  static prop;
}

expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(A, "prop");
