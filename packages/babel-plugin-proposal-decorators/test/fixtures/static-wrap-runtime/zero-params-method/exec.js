expect(() => {
  class A {
    @wrap()
    method() {}
  }
}).toThrow(/is not a function/);
