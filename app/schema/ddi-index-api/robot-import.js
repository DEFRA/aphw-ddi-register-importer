const Joi = require('joi')

const schema = Joi.object({
  data: Joi.array().items(Joi.object({
    dogs: Joi.array().items(Joi.object({
      indexNumber: Joi.number().required(),
      name: Joi.string().required(),
      dateOfBirth: Joi.date().iso().required(),
      colour: Joi.string().required(),
      sex: Joi.string().required(),
      neutered: Joi.string().required(),
      microchipNumber: Joi.string().required()
    })),
    people: Joi.array().items(Joi.object({
      type: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      address: Joi.object({
        addressLine1: Joi.string().required(),
        addressLine2: Joi.string().valid('').optional(),
        townOrCity: Joi.string(),
        postcode: Joi.string().required(),
        country: Joi.string().required()
      }),
      contacts: Joi.array().items(Joi.object({
        type: Joi.string().required(),
        contact: Joi.string().required()
      }))
    })),
    policeForce: Joi.string().optional()
  }))
})

const validate = (payload) => {
  return schema.validate(payload)
}

module.exports = {
  schema,
  validate
}
