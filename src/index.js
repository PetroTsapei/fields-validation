import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import style from './styles.css';

import validate from './validate'

export default class Input extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    setValue: PropTypes.func.isRequired,
    validateRule: PropTypes.string,
    required: PropTypes.string,
    customRules: PropTypes.object,
    errorClass: PropTypes.string
  }

  getError(obj = {}) {
    const errors = validate(obj, this.props.customRules)

    return errors ? errors[0] : null
  }

  updateProps(value) {
    const {
      setValue,
      validateRule
    } = this.props
    let validateObj = {[validateRule]: value}
    const error = this.getError(validateObj)

    setValue(value, error)
  }

  render() {
    const {
      label,
      error,
      validateRule,
      setValue,
      required,
      customRules,
      errorClass,
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
          onChange={e => this.updateProps(e.target.value)}
        />
        {
          error
            ? <span className={`${errorClass || null}`}>
              {error}
            </span>
            : null
        }
      </div>
    )
  }
}
