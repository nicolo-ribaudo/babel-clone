var _f = f;

class A {
  get fn() {}

}

Object.defineProperty(A.prototype, "fn", {
  get: _f(Object.getOwnPropertyDescriptor(A.prototype, "fn").get)
});
