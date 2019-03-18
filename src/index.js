import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import validate from './validate'

export default class Input extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    validateObj: PropTypes.object,
    setValue: PropTypes.func.isRequired,
    validateRule: PropTypes.string,
    fieldKey: PropTypes.string,
    required: PropTypes.string,
    customRules: PropTypes.object
  }

  getError(obj = {}) {
    const errors = validate(obj, this.props.customRules)

    return errors ? errors[0] : null
  }

  updateProps(value) {
    const {
      setValue,
      validateObj = {},
      validateRule,
      fieldKey = null
    } = this.props
    validateObj[validateRule] = value
    const error = this.getError(validateObj)

    setValue(fieldKey, value, error)
  }

  onChange = (e) => {
    this.updateProps(e.target.value)
  }

  render() {
    const {
      label,
      error,
      validateObj,
      validateRule,
      setValue,
      fieldKey,
      required,
      customRules,
      ...props
    } = this.props

    return (
      <div className='field-container'>
        { label &&
        <label className='field-label'>
          {label}
          { required &&
          <span className='field-required'>{required}</span>
          }
        </label>
        }
        <input
          {...props}
          onChange={this.onChange}
        />
        {
          error
            ? <span className='field-container__error'>
              {error}
            </span>
            : null
        }
      </div>
    )
  }
}
