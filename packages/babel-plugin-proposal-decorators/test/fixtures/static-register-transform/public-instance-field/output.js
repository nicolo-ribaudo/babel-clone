var _f = f;

class A {
  constructor() {
    babelHelpers.defineProperty(this, "foo", 2);
  }

}

_f(A.prototype, "foo");
