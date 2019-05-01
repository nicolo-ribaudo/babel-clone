var _f = f;

class A {}

var _fn = babelHelpers.classPrivateFieldLooseKey("fn");

var _fn2 = _f(function _fn2() {});

Object.defineProperty(A, _fn, {
  value: _fn2
});
