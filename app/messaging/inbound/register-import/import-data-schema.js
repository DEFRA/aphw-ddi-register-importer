const Joi = require('joi')

const schema = Joi.object({
  filename: Joi.string(),
  email: Joi.string().email({ tlds: false })
})

const validate = request => {
  const result = schema.validate(request, { abortEarly: false })

  if (result.error) {
    const error = new Error(`Register import data is invalid, ${result.error.message}`)
    throw error
  }

  return true
}

module.exports = {
  schema,
  validate
}