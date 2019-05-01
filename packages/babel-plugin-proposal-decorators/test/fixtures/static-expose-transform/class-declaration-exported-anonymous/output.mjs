var _class, _f, _prop;

export default (_f = f, _class = class {
  constructor() {
    _prop.set(this, {
      writable: true,
      value: void 0
    });
  }

}, _prop = new WeakMap(), _f(_class.prototype, "#prop", obj => babelHelpers.classPrivateFieldGet(obj, _prop), (obj, val) => babelHelpers.classPrivateFieldSet(obj, _prop, val)), _class);
