# shasta-forms [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

This is a work in progress - There is sparse documentation, no tests, and it's not on npm. Use at your own risk while we finish up!

shasta-forms provides a wrapper around [redux-form](https://github.com/erikras/redux-form) which provides a few nice features:
- just write jsx form fields with attributes, no outside metadata
- validation via [redux-form-schema](https://github.com/Lighthouse-io/redux-form-schema)
- automatic error reporting
- works with shasta/immutable.js OOTB

see [redux-form-schema](https://github.com/Lighthouse-io/redux-form-schema) and [validator.js](https://github.com/chriso/validator.js) for validation documentation- simply pass into `Field` jsx

## Install

```
npm install shasta-forms
```
## Usage
```js
import React from 'react'
import { PropTypes, Component } from 'shasta'
import { Form, Field } from 'shasta-forms'

// standard Component
class PersonForm extends Component {
  handleSubmit (data) {
    // an action that saves a person
    this.actions.people.save(data)
    // do something after
  }
  render () {
    return (
      <div>
        <h3>{title}</h3>
        <Form
          name='person'
          className='ui form'
          onFormSubmit={this.handleSubmit}>
          {/* simply define a Field, with options like `required` */}
          <Field
            name='name'
            required />
          <Field name='location' required placeholder='San Francisco, CA' />
          <div className='field'>
            <label>Images</label>
            <Field name='smallImage' placeholder='//me.com/smallImage.png' noLabel />
            <Field name='largeImage' placeholder='//me.com/largeImage.png' noLabel />
          </div>
          <div className='six wide field'>
            {/* type='email' gives you email validation */}
            <Field name='email' type='email' />
            <Field name='twitter' />
            <Field name='facebook' />
            <Field name='instagram' />
          </div>
          <button type='submit' className='ui button'>Submit</button>
        </Form>
      </div>
    )
  }
}

// connect the Component
export default Component.connect(PersonForm, require('core/actions'))
```
## Coming soon
- Custom extended `Field` types
- React Native support

[downloads-image]: http://img.shields.io/npm/dm/shasta-forms.svg
[npm-url]: https://npmjs.org/package/shasta-forms
[npm-image]: http://img.shields.io/npm/v/shasta-forms.svg

[travis-url]: https://travis-ci.org/shastajs/shasta-forms
[travis-image]: https://travis-ci.org/shastajs/shasta-forms.png?branch=master
