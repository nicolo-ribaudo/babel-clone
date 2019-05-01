var _f = f;

class A {
  constructor() {
    _fn.add(this);
  }

}

var _fn = new WeakSet();

var _fn2 = function _fn2() {};

_f(A.prototype, "#fn", obj => babelHelpers.classPrivateMethodGet(obj, _fn, _fn2), babelHelpers.classPrivateMethodSet);
