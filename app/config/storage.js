const Joi = require('joi')

const schema = Joi.object({
  useConnectionString: Joi.bool().default(false),
  connectionString: Joi.string().when('useConnectionStr', { is: true, then: Joi.required(), otherwise: Joi.allow('').optional() }),
  account: Joi.string().required(),
  container: Joi.string().required()
})

const config = {
  useConnectionString: process.env.AZURE_STORAGE_USE_CONNECTION_STRING,
  connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
  account: process.env.AZURE_STORAGE_ACCOUNT_NAME,
  container: 'register-uploads'
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The storage config is invalid. ${result.error.message}`)
}

module.exports = result.value
