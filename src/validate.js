import validateJS from 'validate.js'

const defaultValidation = {
  required: {
    presence: {
      allowEmpty: false,
      message: '^Field is required'
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
