const value = {};
const value2 = {};

const fn = jest.fn();

class A {
  @expose(fn)
  #prop = value;

  getProp() {
    return this.#prop;
  }
}

expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(A.prototype, "#prop", expect.any(Function) , expect.any(Function));

const instance = new A;
expect(fn.mock.calls[0][2](instance)).toBe(value);
fn.mock.calls[0][3](instance, value2);
expect(instance.getProp()).toBe(value2);
