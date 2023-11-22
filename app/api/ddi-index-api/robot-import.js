const { post } = require('./base')
const schema = require('../../schema/dda-index-api/robot-import')

const robotImportEndpoint = 'robot-import'

const buildPayload = (add) => {
  const register = []

  add.forEach(p => ({
    dogs: p.dogs.map(d => ({
      indexNumber: d.indexNumber,
      name: d.name,
      dateOfBirth: d.dateOfBirth,
      colour: d.colour,
      sex: d.gender,
      neutered: d.neutered,
      microchipNumber: `${d.microchipNumber}`
    })),
    people: [
      {
        type: 'owner',
        firstName: p.firstName,
        lastName: p.lastName,
        address: {
          addressLine1: p.addressLine1,
          addressLine2: p.addressLine2 ?? undefined,
          townOrCity: p.townOrCity,
          postcode: p.postcode,
          country: p.country
        },
        contacts: [
          {
            type: 'Phone',
            contact: `${p.telephone}`
          },
          {
            type: 'Email',
            contact: p.email
          }
        ]
      }
    ]
  }))

  return {
    data: register
  }
}

const createRegistration = async data => {
  const data = buildPayload(data)
  const { error } = schema.validate(data)

  if (error) {
    throw new Error(error)
  }

  return post(robotImportEndpoint, data)
}

module.exports = {
  createRegistration
}
