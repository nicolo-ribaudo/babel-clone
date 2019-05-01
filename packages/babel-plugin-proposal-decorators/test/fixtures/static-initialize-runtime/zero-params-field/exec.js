expect(() => {
  class A {
    @initialize()
    static x = 1;
  }
}).toThrow(/is not a function/);
