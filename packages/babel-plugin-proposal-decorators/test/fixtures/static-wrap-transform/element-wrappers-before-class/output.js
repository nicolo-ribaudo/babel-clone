var _f = f;
var _g = g;
var _h = h;
var _i = i;

class A {
  foo() {}

}

A.prototype["foo"] = _h(A.prototype["foo"]);

var _bar = _i(function _bar() {});

A = _f(_g(A));
