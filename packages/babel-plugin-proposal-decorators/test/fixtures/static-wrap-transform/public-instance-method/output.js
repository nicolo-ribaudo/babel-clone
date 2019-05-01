var _f = f;

class A {
  fn() {}

}

A.prototype["fn"] = _f(A.prototype["fn"]);
