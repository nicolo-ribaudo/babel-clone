var _f = f;

class A {
  fn() {}

}

Object.defineProperty(A.prototype, "fn", {
  value: _f(Object.getOwnPropertyDescriptor(A.prototype, "fn").value)
});
