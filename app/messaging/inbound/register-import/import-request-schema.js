const Joi = require('joi')

const schema = Joi.object({
  specVersion: Joi.string().required(),
  type: Joi.string().required(),
  source: Joi.string().required(),
  id: Joi.string().uuid().required(),
  time: Joi.date().required(),
  subject: Joi.string().default('None'),
  dataContentType: Joi.string().default('None'),
  data: Joi.any().default({})
}).required()

const validate = notification => {
  const result = schema.validate(notification, { abortEarly: false })

  if (result.error) {
    const error = new Error(`Register import message is invalid, ${result.error.message}`)
    throw error
  }
}

module.exports = {
  schema,
  validate
}
