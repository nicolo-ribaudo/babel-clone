var _f = f;
export class A {
  constructor() {
    _prop.set(this, {
      writable: true,
      value: void 0
    });
  }

}

var _prop = new WeakMap();

_f(A.prototype, "#prop", obj => babelHelpers.classPrivateFieldGet(obj, _prop), (obj, val) => babelHelpers.classPrivateFieldSet(obj, _prop, val));
