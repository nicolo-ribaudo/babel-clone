const value = {};
const value2 = {};

const fn = jest.fn();

class A {
  @expose(fn)
  static #prop = value;

  static getProp() {
    return this.#prop;
  }
}

expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(A, "#prop", expect.any(Function) , expect.any(Function));

expect(fn.mock.calls[0][2](A)).toBe(value);
fn.mock.calls[0][3](A, value2);
expect(A.getProp()).toBe(value2);
