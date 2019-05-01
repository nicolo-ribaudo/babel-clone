var _f = f;

class A {
  static set fn(x) {}

}

Object.defineProperty(A, "fn", {
  set: _f(Object.getOwnPropertyDescriptor(A, "fn").set)
});
