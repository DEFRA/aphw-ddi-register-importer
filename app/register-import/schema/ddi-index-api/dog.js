const Joi = require('joi')

const dogGenders = [
  'Male',
  'Female'
]

const schema = Joi.object({
  name: Joi.string().required(),
  birth_date: Joi.date().iso().required(),
  colour: Joi.string().required(),
  gender: Joi.string().valid(dogGenders).required(),
  neutered: Joi.boolean().required(),
  microchipped: Joi.boolean().required(),
  microchip_number: Joi.string().required()
})

module.exports = schema
