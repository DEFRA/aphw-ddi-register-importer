const schema = {
  EmailRef: {
    prop: 'emailRef',
    type: Number
  },
  Person: {
    prop: 'person',
    type: {
      Title: {
        prop: 'title',
        type: String,
        required: true
      },
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
        type: String
      },
      PostCode: {
        prop: 'postcode',
        type: String,
        required: true
      },
      DateOfBirth: {
        prop: 'dateOfBirth',
        type: String,
        required: true
      },
      PhoneNumber: {
        prop: 'phoneNumber',
        type: Number,
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
        type: String,
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
        type: String,
        required: true
      },
      'Reference Number': {
        prop: 'referenceNumber',
        type: String
      },
      ApplicationStatus: {
        prop: 'applicationStatus',
        type: String
      },
      RejectionReason: {
        prop: 'rejectionReason',
        type: String
      }
    }
  }
}

module.exports = schema
