let result = [];

function push(n) {
  return () => result.push(n);
}

class A {
  static #a = result.push(1);

  @expose(push(3))
  static #method() {}

  @expose(push(4))
  #prop = result.push("Instance");

  @expose(push(5))
  #method2() {}

  @expose(push(6))
  static #d = result.push(2);
}

expect(result).toEqual([1, 2, 3, 4, 5, 6]);
