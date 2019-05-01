var _f = f;

class A {
  constructor() {
    Object.defineProperty(this, _fn, {
      get: _get_fn
    });
  }

}

var _fn = babelHelpers.classPrivateFieldLooseKey("fn");

var _get_fn = _f(function () {});
