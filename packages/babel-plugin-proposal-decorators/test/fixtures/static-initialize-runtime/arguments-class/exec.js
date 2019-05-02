const fn = jest.fn();

@initialize(fn)
class A {}

expect(fn).not.toBeCalled();

const instance = new A;

expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(instance);
