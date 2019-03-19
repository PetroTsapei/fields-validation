import React, { Component } from 'react'

import Input from 'fields-validation'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }
  }

  updateInput = (value, error) => {
    this.setState({ value, error })
  }

  render () {
    // you can also add custom rules using validate.js
    const customRules = {
      name_for_your_rules: {
        presence: {
          allowEmpty: false,
          message: '^Please enter a valid value'
        },
        length: {
          maximum: 10
        }
      }
    }

    return (
      <Input
        label='test'
        type='text'
        placeholder='enter text'
        validateRule='required'
        value={this.state.value}
        setValue={this.updateInput}
        required='*'
        error={this.state.error}
        errorClass='field-container__error'
        customRules={customRules}
      />
    )
  }
}
