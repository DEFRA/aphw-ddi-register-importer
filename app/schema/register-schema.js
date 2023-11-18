const schema = {
  Person: {
    prop: 'person',
    type: {
      FirstName: {
        prop: 'firstName',
        type: String,
        required: true
      },
      LastName: {
        prop: 'lastName',
        type: String,
        required: true
      },
      AddressLine1: {
        prop: 'addressLine1',
        type: String,
        required: true
      },
      AddressLine2: {
        prop: 'addressLine2',
        type: String
      },
      TownOrCity: {
        prop: 'townOrCity',
        type: String,
        required: true
      },
      County: {
        prop: 'county',
        type: String,
        required: false
      },
      Country: {
        prop: 'country',
        type: String,
        required: true
      },
      PostCode: {
        prop: 'postcode',
        type: String,
        required: true
      },
      DateOfBirth: {
        prop: 'dateOfBirth',
        type: Date,
        required: true
      },
      PhoneNumber: {
        prop: 'phoneNumber',
        required: true
      },
      EmailAddress: {
        prop: 'email',
        type: String,
        required: true
      }
    }
  },
  Dog: {
    prop: 'dog',
    type: {
      DogsName: {
        prop: 'name',
        type: String,
        required: true
      },
      DogDOB: {
        prop: 'dateOfBirth',
        type: Date,
        required: true
      },
      DogColour: {
        prop: 'colour',
        type: String,
        required: true
      },
      DogGender: {
        prop: 'gender',
        type: String,
        required: true
      },
      'Insurance Start Date': {
        prop: 'insuranceStartDate',
        type: Date,
        required: true
      },
      Neutered: {
        prop: 'neutered',
        type: String,
        required: true
      },
      Microchipped: {
        prop: 'microchipped',
        type: String,
        required: true
      },
      MicrochipNumber: {
        prop: 'microchipNumber',
        required: true
      },
      'Reference Number': {
        prop: 'referenceNumber',
        type: String,
        required: true
      },
      ApplicationStatus: {
        prop: 'applicationStatus',
        type: String
      }
    }
  }
}

module.exports = schema
