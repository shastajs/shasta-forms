'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValues = exports.reducers = exports.connect = exports.Field = exports.Form = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.startcase');

var _lodash2 = _interopRequireDefault(_lodash);

var _immutable = require('immutable');

var _reduxForm = require('redux-form');

var _shasta = require('shasta');

var _reduxFormSchema = require('redux-form-schema');

var _reduxFormSchema2 = _interopRequireDefault(_reduxFormSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// recursively reduce form fields into a schema
var reduceSchema = function reduceSchema(schema, field) {
  // recurse if children is an array (if element has child elements)
  if (Array.isArray(field.props.children)) {
    return field.props.children.reduce(reduceSchema, schema);
  } else if (field.type.displayName === 'Field' || field.type === 'input') {
    // TODO: support plain old inputs better
    // TODO: better hidden support
    if (field.props.type === 'hidden') {
      return schema;
    }
    var fieldProps = (0, _assign2.default)({}, field.props);
    // label is specified or uppercase name
    fieldProps.label = field.props.label || (0, _lodash2.default)(field.props.name);
    schema[fieldProps.name] = fieldProps;
    return schema;
  } else {
    return schema;
  }
};

// Form
// redux-form form container that abstracts need for defining required props
// and provides fields to child *Field* elements via context

// shasta-forms
// experiemental, api will change [1/24/16]

// see `/client/views/CRM/PersonForm.js` for example

// TODO:
// - replace schema with expressing props on Field elements
// - create custom form element components

var Form = exports.Form = function (_Component) {
  (0, _inherits3.default)(Form, _Component);

  function Form() {
    (0, _classCallCheck3.default)(this, Form);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Form).apply(this, arguments));
  }

  (0, _createClass3.default)(Form, [{
    key: 'getSchema',
    value: function getSchema(form) {
      var schema = form.reduce(reduceSchema, {});
      return schema;
    }
  }, {
    key: 'getForm',
    value: function getForm() {
      // TODO: iterate through children looking for <Form>
      var form = this.props.children;
      var schema = this.getSchema(form);
      var initialValues = this.props.initialValues;

      var myForm = function (_Component2) {
        (0, _inherits3.default)(myForm, _Component2);

        function myForm() {
          (0, _classCallCheck3.default)(this, myForm);
          return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(myForm).apply(this, arguments));
        }

        (0, _createClass3.default)(myForm, [{
          key: 'getChildContext',
          value: function getChildContext() {
            return { fields: this.props.fields };
          }
        }, {
          key: 'render',
          value: function render() {
            // noValidate turns off browser validation
            // TODO: turn off our validation if they want it on
            return _react2.default.createElement(
              'form',
              (0, _extends3.default)({}, this.props, {
                initialValues: initialValues,
                onSubmit: this.props.handleSubmit(this.props.onFormSubmit),
                noValidate: true }),
              form
            );
          }
        }]);
        return myForm;
      }(_shasta.Component);

      // connect redux-form


      myForm.propTypes = {
        actions: _shasta.PropTypes.object
      };
      myForm.childContextTypes = {
        fields: _react2.default.PropTypes.object
      };
      var formcom = connect(this.props.name, schema, myForm);
      return _react2.default.createElement(formcom, this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.getForm();
    }
  }]);
  return Form;
}(_shasta.Component);

// Field
// wraps label, input and error handling into one component
// options are loaded from schema into parent form

// - name: name of the field, used for error handling, redux-form integration and auto-label
// - type: simple input type
// - noLabel: include (set to true) in tag if you want to not have a lable
// - label: set a label explicitly

// TODO:
// - support passing plain old inputs
// - support input components

Form.propTypes = {
  name: _shasta.PropTypes.string.isRequired,
  fields: _shasta.PropTypes.object,
  handleSubmit: _shasta.PropTypes.func,
  onFormSubmit: _shasta.PropTypes.func.isRequired,
  resetForm: _shasta.PropTypes.func,
  submitting: _shasta.PropTypes.bool,
  children: _shasta.PropTypes.node,
  errors: _shasta.PropTypes.object,
  className: _shasta.PropTypes.string,
  initialValues: _shasta.PropTypes.object
};

var Field = exports.Field = function (_Component3) {
  (0, _inherits3.default)(Field, _Component3);

  function Field() {
    (0, _classCallCheck3.default)(this, Field);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Field).apply(this, arguments));
  }

  (0, _createClass3.default)(Field, [{
    key: 'render',
    value: function render() {
      var label = this.props.label || (0, _lodash2.default)(this.props.name);
      var field = this.context.fields[this.props.name];
      if (!field) {
        return null;
      }
      var isError = field.error && field.touched;
      return(
        // mixin error class if there's an error
        _react2.default.createElement(
          'div',
          { ref: this.props.name, className: (0, _classnames2.default)('field', { error: isError }) },
          this.props.noLabel ? null : _react2.default.createElement(
            'label',
            null,
            label
          ),
          _react2.default.createElement('input', (0, _extends3.default)({
            type: this.props.inputType
          }, field, this.props)),
          isError ? _react2.default.createElement(
            'div',
            {
              className: 'ui basic red pointing prompt label animating transition scale in' },
            field.error
          ) : null
        )
      );
    }
  }]);
  return Field;
}(_shasta.Component);

// connect
// wraps redux-form decorator and provides some default values
// (http://erikras.github.io/redux-form/)

// * reduxMountPoint: where in the store forms should be mounted- default is 'form', we default to 'forms'
// * form: static.formName, simply the form's name
// * getFormState: convert to JS for redux-form to work with immutable.js

Field.propTypes = {
  name: _shasta.PropTypes.string.isRequired,
  inputType: _shasta.PropTypes.string,
  noLabel: _shasta.PropTypes.bool,
  label: _shasta.PropTypes.string
};
Field.contextTypes = {
  fields: _shasta.PropTypes.object,
  doRender: _shasta.PropTypes.bool
};
Field.defaultProps = {
  inputType: 'text'
};
Field.displayName = 'Field';
var connect = exports.connect = function connect(name, schema, form) {
  var opt = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  // redux-form-schema decoration

  var _buildSchema = (0, _reduxFormSchema2.default)(schema);

  var fields = _buildSchema.fields;
  var validate = _buildSchema.validate;

  return (0, _reduxForm.reduxForm)((0, _extends3.default)({
    reduxMountPoint: 'forms',
    form: name,
    fields: fields,
    validate: validate,
    getFormState: function getFormState(state, cursor) {
      return state.get(cursor).toJS();
    }
  }, opt))(form);
};

// reducer
// redux-form reducer wrapped to support immutable.js
var reducers = exports.reducers = {
  forms: function forms() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? (0, _immutable.Map)() : arguments[0];
    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    return (0, _immutable.fromJS)((0, _reduxForm.reducer)(state.toJS(), action));
  }
};

// export redux-form's getValues

var getValues = exports.getValues = _reduxForm.reduxForm.getValues;