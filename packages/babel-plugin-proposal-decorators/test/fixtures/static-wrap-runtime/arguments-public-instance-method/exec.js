const value = {};

const replacement = jest.fn();
const fn = jest.fn().mockReturnValue(replacement);

class A {
  @wrap(fn)
  method() { return value }
}

expect(replacement).not.toHaveBeenCalled();
expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(expect.any(Function));

expect(fn.mock.calls[0][0]()).toBe(value);
expect(replacement).not.toHaveBeenCalled();

expect(new A().method).toBe(replacement);
