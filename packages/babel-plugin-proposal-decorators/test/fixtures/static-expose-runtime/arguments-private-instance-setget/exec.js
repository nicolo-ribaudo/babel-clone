const value = {};
const value2 = {};
let param;

const fn = jest.fn();

class A {
  @expose(fn)
  get #prop() {
    return value;
  }

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
expect(fn.mock.calls[0][2](instance)).toBe(value);
expect(instance.getProp()).toBe(value);
fn.mock.calls[0][3](instance, value2);
expect(param).toBe(value2);
