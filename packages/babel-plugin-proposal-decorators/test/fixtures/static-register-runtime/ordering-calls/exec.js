let result = [];

function push(n) {
  return () => result.push(n);
}

@register(push(8))
@register(push(7))
class A {
  static a = result.push(1);

  @register(push(3))
  static method() {}

  @register(push(4))
  prop = result.push("Instance");

  @register(push(5))
  method() {}

  @register(push(6))
  static d = result.push(2);
}

expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
