expect(() => {
  class A {
    @initialize()
    static method() {}
  }
}).toThrow(/is not a function/);
