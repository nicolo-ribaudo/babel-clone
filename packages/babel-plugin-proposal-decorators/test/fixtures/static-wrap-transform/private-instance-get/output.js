var _f = f;

class A {
  constructor() {
    _fn.set(this, {
      get: _get_fn
    });
  }

}

var _fn = new WeakMap();

var _get_fn = _f(function () {});
