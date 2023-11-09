const properties = require('./register-properties')

const schema = {
  'EmailRef': {
    prop: properties.emailRef,
    type: Number
  },
  'Person': {
    prop: 'person',
    type: {
      'Title': {
        prop: properties.person.title,
        type: String
      },
      'FirstName': {
        prop: properties.person.firstName,
        type: String
      },
      'LastName': {
        prop: properties.person.lastName,
        type: String
      },
      'AddressLine1': {
        prop: properties.person.addressLine1,
        type: String
      },
      'AddressLine2': {
        prop: properties.person.addressLine2,
        type: String
      },
      'TownOrCity': {
        prop: properties.person.townOrCity,
        type: String
      },
      'County': {
        prop: properties.person.county,
        type: String
      },
      'Postcode': {
        prop: properties.person.postcode,
        type: String
      },
      'DateOfBirth': {
        prop: properties.person.dateOfBirth,
        type: String
      },
      'PhoneNumber': {
        prop: properties.person.phoneNumber,
        type: Number
      },
      'EmailAddress': {
        prop: properties.person.email,
        type: String
      }
    }
  },
  'Dog': {
    prop: 'dog',
    type: {
      'DogsName': {
        prop: properties.dog.name,
        type: String
      },
      'DogDOB': {
        prop: properties.dog.dateOfBirth,
        type: String
      },
      'DogColour': {
        prop: properties.dog.colour,
        type: String
      },
      'DogGender': {
        prop: properties.dog.gender,
        type: String
      },
      'Neutered': {
        prop: properties.dog.neutered,
        type: String
      },
      'Microchipped': {
        prop: properties.dog.microchipped,
        type: String
      },
      'MicrochipNumber': {
        prop: properties.dog.microchipped,
        type: String
      }
    }
  },
  'ReferenceNumber': {
    prop: properties.referenceNumber,
    type: String
  },
  'ApplicationStatus': {
    prop: properties.applicationStatus,
    type: String
  },
  'RejectionReason': {
    prop: properties.rejectionReason,
    type: String
  }
}

module.exports = schema
