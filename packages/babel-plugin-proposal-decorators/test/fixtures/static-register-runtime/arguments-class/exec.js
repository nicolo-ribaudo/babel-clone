const fn = jest.fn();

@register(fn)
class A {}

expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(A);
