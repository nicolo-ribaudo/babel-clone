const value = {};

const replacement = jest.fn();
const fn = jest.fn().mockReturnValue(replacement);

class A {
  @wrap(fn)
  static #method() { return value }

  static getMethod() { return this.#method };
}

expect(replacement).not.toHaveBeenCalled();
expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(expect.any(Function));

expect(fn.mock.calls[0][0]()).toBe(value);
expect(replacement).not.toHaveBeenCalled();

expect(A.getMethod()).toBe(replacement);

