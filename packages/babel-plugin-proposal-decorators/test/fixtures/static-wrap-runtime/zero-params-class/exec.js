expect(() => {
  @wrap()
  class A {}
}).toThrow(/is not a function/);
