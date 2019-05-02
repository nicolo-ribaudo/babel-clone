const value = {};

const fn = jest.fn();

class A {
  @expose(fn)
  get #prop() {
    return value;
  }

  getProp() {
    return this.#prop;
  }
}

expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(A.prototype, "#prop", expect.any(Function) , expect.any(Function));

const instance = new A;
expect(fn.mock.calls[0][2](instance)).toBe(value);
expect(() => fn.mock.calls[0][3](instance, "foo")).toThrow();
expect(instance.getProp()).toBe(value);
