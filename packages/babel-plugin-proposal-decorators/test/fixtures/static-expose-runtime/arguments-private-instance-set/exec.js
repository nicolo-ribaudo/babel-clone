const value = {};
let param;

const fn = jest.fn();

class A {
  @expose(fn)
  set #prop(x) {
    param = x;
  }

  getProp() {
    return this.#prop;
  }
}

expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(A.prototype, "#prop", expect.any(Function) , expect.any(Function));

const instance = new A;
expect(fn.mock.calls[0][2](instance)).toBeUndefined();
fn.mock.calls[0][3](instance, value);
expect(param).toBe(value);
expect(instance.getProp()).toBeUndefined();
