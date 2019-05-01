let result = [];

function push(n) {
  return x => (result.push(n), x);
}

@wrap(push(7))
@wrap(push(6))
class A {
  static a = result.push(1);

  @wrap(push(2))
  static method() {}

  @wrap(push(3))
  get #foo() {}

  @wrap(push(4))
  method() {}

  static d = result.push(5);
}

expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
