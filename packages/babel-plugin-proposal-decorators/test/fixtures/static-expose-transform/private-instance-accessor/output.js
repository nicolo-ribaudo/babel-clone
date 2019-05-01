var _f = f;

class A {
  constructor() {
    _fn.set(this, {
      get: _get_fn,
      set: _set_fn
    });
  }

}

var _fn = new WeakMap();

var _get_fn = function () {};

var _set_fn = function (a) {};

_f(A.prototype, "#fn", obj => babelHelpers.classPrivateFieldGet(obj, _fn), (obj, val) => babelHelpers.classPrivateFieldSet(obj, _fn, val));
