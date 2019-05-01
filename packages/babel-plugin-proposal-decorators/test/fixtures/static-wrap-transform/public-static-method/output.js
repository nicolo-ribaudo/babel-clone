var _f = f;

class A {
  static fn() {}

}

Object.defineProperty(A, "fn", {
  value: _f(Object.getOwnPropertyDescriptor(A, "fn").value)
});
