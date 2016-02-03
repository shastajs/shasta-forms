'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shasta = require('shasta');

var _immutable = require('immutable');

var _lodash = require('lodash.pick');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.reduce');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.some');

var _lodash6 = _interopRequireDefault(_lodash5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataComponent = function (_Component) {
  (0, _inherits3.default)(DataComponent, _Component);

  function DataComponent() {
    (0, _classCallCheck3.default)(this, DataComponent);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DataComponent).apply(this, arguments));

    if (!_this.constructor.storeProps) {
      throw new Error('DataComponent requires storeProps to be defined!');
    }

    if (_this.fetch) _this.fetch();
    return _this;
  }

  (0, _createClass3.default)(DataComponent, [{
    key: 'isFetching',
    value: function isFetching() {
      var _this2 = this;

      return !this.isErrored() && (0, _lodash6.default)(this.constructor.storeProps, function (cursor, prop) {
        return typeof _this2.props[prop] === 'undefined';
      });
    }
  }, {
    key: 'isErrored',
    value: function isErrored() {
      var _this3 = this;

      return (0, _lodash6.default)(this.constructor.storeProps, function (cursor, prop) {
        return _this3.props[prop] && _this3.props[prop].has('error');
      });
    }
  }, {
    key: 'getLoadingFields',
    value: function getLoadingFields() {
      var _this4 = this;

      return (0, _immutable.fromJS)((0, _lodash4.default)(this.constructor.storeProps, function (prev, cursor, prop) {
        if (typeof _this4.props[prop] === 'undefined') {
          prev.push(prop);
        }
        return prev;
      }, []));
    }
  }, {
    key: 'getErrors',
    value: function getErrors() {
      var _this5 = this;

      return (0, _immutable.fromJS)((0, _lodash4.default)(this.constructor.storeProps, function (prev, cursor, prop) {
        if (_this5.props[prop] && _this5.props[prop].has('error')) {
          prev[prop] = _this5.props[prop].get('error');
        }
        return prev;
      }, {}));
    }
  }, {
    key: 'getData',
    value: function getData() {
      return (0, _lodash2.default)(this.props, (0, _keys2.default)(this.constructor.storeProps));
    }
  }, {
    key: 'renderLoader',
    value: function renderLoader() {}
  }, {
    key: 'renderErrors',
    value: function renderErrors() {}
  }, {
    key: 'renderData',
    value: function renderData() {}
  }, {
    key: 'render',
    value: function render() {
      return this.isFetching() ? this.renderLoader(this.getLoadingFields()) : this.isErrored() ? this.renderErrors(this.getErrors()) : this.renderData(this.getData());
    }
  }]);
  return DataComponent;
}(_shasta.Component);

DataComponent.displayName = 'DataComponent';
exports.default = DataComponent;
module.exports = exports['default'];