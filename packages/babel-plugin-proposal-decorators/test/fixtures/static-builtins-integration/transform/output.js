var _a = a;
var _b = b;
var _c = c;
var _d = d;
var _e = e;
var _f = f;
var _g = g;
var _h = h;
var _i = i;
var _j = j;
var _k = k;
var _l = l;
var _m = m;
var _n = n;
var _o = o;
var _p = p;
var _q = q;

class A {
  constructor() {
    _foo.set(this, {
      writable: true,
      value: void 0
    });

    _l(this, "method");

    _p(this, "foo", 3);

    _c(this);
  }

  method() {}

}

var _foo = new WeakMap();

var _bar = _g(_i(function _bar() {}));

A.prototype["method"] = _k(_n(A.prototype["method"]));
A = _a(_e(A));

_f(A.prototype, "#foo", obj => babelHelpers.classPrivateFieldGet(obj, _foo), (obj, val) => babelHelpers.classPrivateFieldSet(obj, _foo, val));

_h(A, "#bar", obj => babelHelpers.classStaticPrivateMethodGet(obj, A, _bar), (obj, val) => babelHelpers.classStaticPrivateMethodSet(obj, A, _bar, val));

_m(A.prototype, "method");

_j(A.prototype, "method");

_q(A.prototype, "foo");

_o(A.prototype, "foo");

_d(A);

_b(A);
