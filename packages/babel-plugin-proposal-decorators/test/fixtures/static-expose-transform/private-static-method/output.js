var _f = f;

class A {}

var _fn = function _fn() {};

_f(A, "#fn", obj => babelHelpers.classStaticPrivateMethodGet(obj, A, _fn), (obj, val) => babelHelpers.classStaticPrivateMethodSet(obj, A, _fn, val));
