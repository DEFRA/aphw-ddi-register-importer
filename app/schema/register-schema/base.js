const joiDate = require('@joi/date')
const Joi = require('joi').extend(joiDate)

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
    dateOfBirth: Joi.date().format('DD/MM/YYYY').required(),
    phoneNumber: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    email: Joi.string().required()
  }).required(),
  dog: Joi.object({
    name: Joi.string().required(),
    dateOfBirth: Joi.date().format('DD/MM/YYYY').required(),
    colour: Joi.string().required(),
    gender: Joi.string().required(),
    insuranceStartDate: Joi.date().format('DD/MM/YYYY').required(),
    neutered: Joi.string().required(),
    microchipped: Joi.string().required(),
    microchipNumber: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    indexNumber: Joi.number().required()
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
