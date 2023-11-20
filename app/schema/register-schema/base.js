const Joi = require('joi')

const schema = Joi.object({
  person: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string().optional(),
    townOrCity: Joi.string().required(),
    county: Joi.string().optional(),
    country: Joi.string().required(),
    postcode: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    phoneNumber: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    email: Joi.string().required()
  }).required(),
  dog: Joi.object({
    name: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    colour: Joi.string().required(),
    gender: Joi.string().required(),
    insuranceStartDate: Joi.date().required(),
    neutered: Joi.string().required(),
    microchipped: Joi.string().required(),
    microchipNumber: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    referenceNumber: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    applicationStatus: Joi.string().optional()
  }).required()
})

const validate = (data) => {
  const result = schema.validate(data, { abortEarly: false })

  return {
    isValid: result.error === undefined,
    errors: result.error ?? undefined
  }
}

module.exports = {
  schema,
  validate
}
