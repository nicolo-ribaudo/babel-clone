let result = [];

function push(n) {
  return () => result.push(n);
}

@initialize(push(16))
@initialize(push(15))
class A {
  a = result.push(11);

  @initialize(push(12))
  b = result.push("Never");

  static a = result.push(1);

  @initialize(push(2))
  static b = result.push("Never");

  @initialize(push(3))
  static method() {}

  @initialize(push(13))
  method() {}

  c = result.push(14);

  static d = result.push(4);
}

expect(result).toEqual([1, 2, 3, 4]);

result = [];
new A;

expect(result).toEqual([11, 12, 13, 14, 15, 16]);
