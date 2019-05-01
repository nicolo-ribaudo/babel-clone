var _f = f;

class A {
  static fn() {}

}

A["fn"] = _f(A["fn"]);
