const value = {};
const value2 = {};
let param;

const fn = jest.fn();

class A {
  @expose(fn)
  static get #prop() {
    return value;
  }

  static set #prop(x) {
    param = x;
  }

  static getProp() {
    return this.#prop;
  }
}

expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(A, "#prop", expect.any(Function) , expect.any(Function));

expect(fn.mock.calls[0][2](A)).toBe(value);
expect(A.getProp()).toBe(value);
fn.mock.calls[0][3](A, value2);
expect(param).toBe(value2);
