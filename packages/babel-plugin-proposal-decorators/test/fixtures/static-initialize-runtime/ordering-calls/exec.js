let result = [];

function push(n) {
  return () => result.push(n);
}

@initialize(push(17))
@initialize(push(16))
class A {
  a = result.push(11);

  @initialize(push(13))
  b = result.push(12);

  static a = result.push(1);

  @initialize(push(3))
  static b = result.push(2);

  @initialize(push(4))
  static method() {}

  @initialize(push(14))
  method() {}

  c = result.push(15);

  static d = result.push(5);
}

expect(result).toEqual([1, 2, 3, 4, 5]);

result = [];
new A;

expect(result).toEqual([11, 12, 13, 14, 15, 16, 17]);
