const Joi = require('joi')

const schema = Joi.object({
  title: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  address: Joi.object({
    address_line_1: Joi.string().required(),
    address_line_2: Joi.string().allow(null).allow('').optional(),
    postcode: Joi.string().required(),
    county: Joi.string().allow(null).allow('').optional()
  }),
  contacts: [
    {
      contact: Joi.string().required(),
      type: 'email'
    },
    {
      contact: Joi.string().required(),
      type: 'phone'
    }
  ]
})

module.exports = schema
