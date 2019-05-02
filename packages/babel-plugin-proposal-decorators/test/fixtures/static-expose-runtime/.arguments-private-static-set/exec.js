const value = {};
let param;

const fn = jest.fn();

class A {
  @expose(fn)
  static set #prop(x) {
    param = x;
  }

  static getProp() {
    return this.#prop;
  }
}

expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(A, "#prop", expect.any(Function) , expect.any(Function));

expect(fn.mock.calls[0][2](A)).toBeUndefined();
fn.mock.calls[0][3](A, value);
expect(param).toBe(value);
expect(A.getProp()).toBeUndefined();
