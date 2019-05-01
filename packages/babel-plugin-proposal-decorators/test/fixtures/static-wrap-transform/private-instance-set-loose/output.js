var _f = f;

class A {
  constructor() {
    Object.defineProperty(this, _fn, {
      set: _set_fn
    });
  }

}

var _fn = babelHelpers.classPrivateFieldLooseKey("fn");

var _set_fn = _f(function (x) {});
