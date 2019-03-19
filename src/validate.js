import validateJS from 'validate.js'

const defaultValidation = {
  required: {
    presence: {
      allowEmpty: false,
      message: '^Field is required'
    }
  },
  creditCardNumber: {
    presence: true,
    format: {
      pattern: /^(34|37|4|5[1-5]).*$/,
      message: '^is not a valid credit card number'
    },
    length: function(value, attributes, attributeName, options, constraints) {
      if (value) {
        // Amex
        if ((/^(34|37).*$/).test(value)) return {is: 15}
        // Visa, Mastercard
        if ((/^(4|5[1-5]).*$/).test(value)) return {is: 16}
      }
      // Unknown card, don't validate length
      return false
    }
  },
  creditCardZip: function(value, attributes, attributeName, options, constraints) {
    if (!(/^(34|37).*$/).test(attributes.creditCardNumber)) return null
    return {
      presence: {message: 'is required when using AMEX'},
      length: {is: 5}
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must be at least 6 characters'
    }
  }
}

export default function validate(obj, userValidation = {}) {
  const formValues = obj
  const constraints = {}
  const validation = {
    ...defaultValidation,
    ...userValidation
  }

  Object.keys(obj).map(key => constraints[key] = validation[key])

  const result = validateJS(formValues, constraints)

  if (result) return Object.values(result)[0]

  return null
}
