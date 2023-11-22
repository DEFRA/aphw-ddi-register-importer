const Joi = require('joi')

const schema = Joi.object({
  baseUrl: Joi.string()
})

const config = {
  baseUrl: process.env.DDI_INDEX_API_BASE_URL,
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The DDI Index API config is invalid. ${result.error.message}`)
}

module.exports = result.value
