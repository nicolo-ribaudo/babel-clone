const value = {};

const fn = jest.fn();

class A {
  @expose(fn)
  static #method() {
    return value;
  }

  static getMethod() {
    return this.#method;
  }
}

expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(A, "#method", expect.any(Function) , expect.any(Function));

expect(fn.mock.calls[0][2](A)).toBe(A.getMethod());
expect(fn.mock.calls[0][2](A)()).toBe(value);
expect(() => fn.mock.calls[0][3](A, () => {})).toThrow();
expect(fn.mock.calls[0][2](A)).toBe(A.getMethod());
expect(fn.mock.calls[0][2](A)()).toBe(value);
