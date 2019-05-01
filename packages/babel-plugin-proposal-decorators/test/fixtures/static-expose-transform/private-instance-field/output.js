var _f = f;

class A {
  constructor() {
    _foo.set(this, {
      writable: true,
      value: 2
    });
  }

}

var _foo = new WeakMap();

_f(A.prototype, "#foo", obj => babelHelpers.classPrivateFieldGet(obj, _foo), (obj, val) => babelHelpers.classPrivateFieldSet(obj, _foo, val));
