const data = [{
  firstName: 'Bill',
  lastName: 'Test',
  addressLine1: '319 test street',
  townOrCity: 'Swansea',
  country: 'Wales',
  postcode: 'AA1 1AA',
  dateOfBirth: new Date(1970, 3, 28),
  phoneNumber: 3333333333,
  email: 'test@example.com',
  dogs: [
    {
      name: 'Pepper',
      dateOfBirth: new Date(2022, 10, 23),
      colour: 'White',
      gender: 'Male',
      insuranceStartDate: new Date(2023, 10, 11),
      neutered: 'Yes',
      microchipped: 'Yes',
      microchipNumber: '2134567891',
      indexNumber: 1234
    }
  ]
}]

module.exports = data
