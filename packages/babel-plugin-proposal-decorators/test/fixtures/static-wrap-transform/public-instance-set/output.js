var _f = f;

class A {
  set fn(x) {}

}

Object.defineProperty(A.prototype, "fn", {
  set: _f(Object.getOwnPropertyDescriptor(A.prototype, "fn").set)
});
