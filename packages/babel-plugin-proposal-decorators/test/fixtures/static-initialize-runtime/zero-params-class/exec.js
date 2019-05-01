expect(() => {
  @initialize()
  class A {}

  new A;
}).toThrow(/is not a function/);
