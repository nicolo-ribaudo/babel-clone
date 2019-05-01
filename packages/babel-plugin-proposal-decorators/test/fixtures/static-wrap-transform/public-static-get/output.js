var _f = f;

class A {
  static get fn() {}

}

Object.defineProperty(A, "fn", {
  get: _f(Object.getOwnPropertyDescriptor(A, "fn").get)
});
