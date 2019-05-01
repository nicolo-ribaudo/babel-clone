var _f = f;
var _g = g;

class A {
  constructor() {
    _f(this, "a");

    _g(this, "a");
  }

  get a() {}

  set a(x) {}

}
