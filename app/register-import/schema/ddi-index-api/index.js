const Joi = require('joi')
const person = require('./person')
const dog = require('./dog')

const schema = Joi.object({
  person,
  dog
})

module.exports = schema
