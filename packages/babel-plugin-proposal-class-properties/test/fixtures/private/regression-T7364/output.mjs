var _class, _myAsyncMethod2;

class MyClass {
  constructor() {
    var _this = this;

    _myAsyncMethod.set(this, {
      writable: true,
      value: function () {
        var _ref = babelHelpers.asyncToGenerator(function* () {
          console.log(_this);
        });

        return function value() {
          return _ref.apply(this, arguments);
        };
      }()
    });
  }

}

var _myAsyncMethod = new WeakMap();

_class = class MyClass2 {
  constructor() {
    var _this2 = this;

    _myAsyncMethod2.set(this, {
      writable: true,
      value: function () {
        var _ref2 = babelHelpers.asyncToGenerator(function* () {
          console.log(_this2);
        });

        return function value() {
          return _ref2.apply(this, arguments);
        };
      }()
    });
  }

}, _myAsyncMethod2 = new WeakMap(), _class;
export default class MyClass3 {
  constructor() {
    var _this3 = this;

    _myAsyncMethod3.set(this, {
      writable: true,
      value: function () {
        var _ref3 = babelHelpers.asyncToGenerator(function* () {
          console.log(_this3);
        });

        return function value() {
          return _ref3.apply(this, arguments);
        };
      }()
    });
  }

}

var _myAsyncMethod3 = new WeakMap();
