const value = {};

const fn = jest.fn();

class A {
  @expose(fn)
  #method() {
    return value;
  }

  getMethod() {
    return this.#method;
  }
}

expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(A.prototype, "#method", expect.any(Function) , expect.any(Function));

const instance = new A;
expect(fn.mock.calls[0][2](instance)).toBe(instance.getMethod());
expect(fn.mock.calls[0][2](instance)()).toBe(value);
expect(() => fn.mock.calls[0][3](instance, () => {})).toThrow();
expect(fn.mock.calls[0][2](instance)).toBe(instance.getMethod());
expect(fn.mock.calls[0][2](instance)()).toBe(value);
