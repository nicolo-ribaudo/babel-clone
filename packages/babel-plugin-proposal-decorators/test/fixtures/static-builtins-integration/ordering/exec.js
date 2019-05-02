let result = [];

const log = (n, v = () => {}) => {
  result.push(n);
  return (...args) => {
    result.push(1000 + n);
    return v(...args);
  };
};

// 0.X: keys
// 1.X: Declaration-time decorators
// 2.X: Instantiation-time decorators
// 3.X: Field initializers

@wrap(log(1.7, x => x))
@register(log(1.16))
@initialize(log(2.3))
@register(log(1.15))
@wrap(log(1.6, x => x))
class A {
  @expose(log(1.8))
  #foo = log(3.1);

  @wrap(log(1.2, x => x))
  @expose(log(1.9))
  @wrap(log(1.1, x => x))
  static #bar() {}

  @register(log(1.11))
  @wrap(log(1.4, x => x))
  @initialize(log(2.1))
  @register(log(1.10))
  @wrap(log(1.3, x => x))
  [log(0.1)]() {}

  @register(log(1.13))
  @initialize(log(2.2))
  @register(log(1.12))
  [log(0.2)] = log(3.2);

  @initialize(log(1.5))
  @register(log(1.14))
  static [log(0.3)] = log(3.3);
}

expect(result).toEqual([
  // Computed keys and arguments evaluation
  1.7, 1.16, 2.3, 1.15, 1.6,
  1.8,
  1.2, 1.9, 1.1,
  1.11, 1.4, 2.1, 1.10, 1.3, 0.1,
  1.13, 2.2, 1.12, 0.2,
  1.5, 1.14, 0.3,

  // @wrap and static @initialize
  1001.1, 1001.2,
  1001.3, 1001.4,
  3.3, 1001.5,
  1001.6, 1001.7,

  // @register and @expose
  1001.8,
  1001.9,
  1001.10, 1001.11,
  1001.12, 1001.13,
  1001.14,
  1001.15, 1001.16,
]);

result = [];
new A();

expect(result).toEqual([
  3.1,
  1002.1,
  3.2, 1002.2,
  1002.3,
]);
