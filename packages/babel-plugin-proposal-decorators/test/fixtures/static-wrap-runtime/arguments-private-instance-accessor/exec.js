const value = {};
const value2 = {};

const replacement = jest.fn().mockReturnValue(value2);
const fn = jest.fn().mockReturnValue(replacement);

class A {
  @wrap(fn)
  get #method() { return value }

  getMethod() { return this.#method };
}

expect(replacement).not.toHaveBeenCalled();
expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(expect.any(Function));

expect(fn.mock.calls[0][0]()).toBe(value);
expect(replacement).not.toHaveBeenCalled();

expect(new A().getMethod()).toBe(value2);
expect(replacement).toHaveBeenCalled();
