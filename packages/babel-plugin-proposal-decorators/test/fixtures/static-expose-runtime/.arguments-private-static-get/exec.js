const value = {};

const fn = jest.fn();

class A {
  @expose(fn)
  static get #prop() {
    return value;
  }

  static getProp() {
    return this.#prop;
  }
}

expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(A, "#prop", expect.any(Function) , expect.any(Function));

expect(fn.mock.calls[0][2](A)).toBe(value);
expect(() => fn.mock.calls[0][3](A, "foo")).toThrow();
expect(A.getProp()).toBe(value);
