var _f = f;

class C extends A {
  constructor(...args) {
    super(...args);

    _f(this);
  }

}
