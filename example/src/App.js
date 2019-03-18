import React, { Component } from 'react'

import Input from 'fields-validation'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fields: {
        firstName: {
          label: 'Enter first name',
          placeholder: '',
          value: '',
          type: 'text',
          validateRule: 'required'
        }
      }
    }
  }

  updateInput = (fieldKey, value, error) => {
    this.setState({
      fields: {
        [fieldKey]: {
          ...this.state.fields[fieldKey],
          value,
          error
        }
      }
    })
  }

  render () {
    const {
      firstName
    } = this.state.fields

    // you can also add custom rules using validate.js
    const customRules = {
      test: {
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
        label={firstName.label}
        type={firstName.type}
        placeholder={firstName.placeholder}
        fieldKey='firstName'
        validateRule={firstName.validateRule}
        validateObj={{ [firstName.validateRule]: firstName.value }}
        value={firstName.value}
        setValue={this.updateInput}
        required='*'
        error={firstName.error}
        customRules={customRules}
      />
    )
  }
}
