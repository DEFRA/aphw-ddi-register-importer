const schema = {
  Person: {
    person: {
      FirstName: 'firstName',
      LastName: 'lastName',
      AddressLine1: 'addressLine1',
      AddressLine2: 'addressLine2',
      TownOrCity: 'townOrCity',
      County: 'county',
      Country: 'country',
      PostCode: 'postcode',
      DateOfBirth: 'dateOfBirth',
      PhoneNumber: 'phoneNumber',
      EmailAddress: 'email'
    }
  },
  Dog: {
    dog: {
      DogsName: 'name',
      DogDOB: 'dateOfBirth',
      DogColour: 'colour',
      DogGender: 'gender',
      'Insurance Start Date': 'insuranceStartDate',
      Neutered: 'neutered',
      Microchipped: 'microchipped',
      MicrochipNumber: 'microchipNumber',
      'Index Number': 'indexNumber'
    }
  }
}

module.exports = schema
