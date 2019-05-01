var _f = f;

class A {}

var _foo = {
  writable: true,
  value: 2
};

_f(A, "#foo", obj => babelHelpers.classStaticPrivateFieldSpecGet(obj, A, _foo), (obj, val) => babelHelpers.classStaticPrivateFieldSpecSet(obj, A, _foo, val));
