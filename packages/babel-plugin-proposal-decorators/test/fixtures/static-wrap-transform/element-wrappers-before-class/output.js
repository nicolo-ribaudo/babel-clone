var _f = f;
var _g = g;
var _h = h;
var _i = i;

class A {
  foo() {}

}

Object.defineProperty(A.prototype, "foo", {
  value: _h(Object.getOwnPropertyDescriptor(A.prototype, "foo").value)
});

var _bar = _i(function _bar() {});

A = _f(_g(A));
