jest.mock('../../../app/api/ddi-index-api/base')
const { post: mockIndexApiPost } = require('../../../app/api/ddi-index-api/base')

jest.mock('../../../app/schema/ddi-index-api/robot-import')
const { validate: mockValidateImportPayload } = require('../../../app/schema/ddi-index-api/robot-import')

const { importRegistrations } = require('../../../app/api/ddi-index-api')
const mockImportData = require('../../mocks/ddi-index-api/mock-import-data')

describe('DDI API', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockValidateImportPayload.mockReturnValue({ error: null })
  })

  test('should call post with the correct payload', async () => {
    await importRegistrations(mockImportData)

    expect(mockIndexApiPost).toHaveBeenCalledTimes(1)
    expect(mockIndexApiPost).toHaveBeenCalledWith('robot-import', {
      data: [{
        people: [
          {
            type: 'owner',
            firstName: 'Bill',
            lastName: 'Test',
            address: {
              addressLine1: '319 test street',
              addressLine2: undefined,
              townOrCity: 'Swansea',
              postcode: 'AA1 1AA',
              country: 'Wales'
            },
            contacts: [
              {
                type: 'Phone',
                contact: '3333333333'
              },
              {
                type: 'Email',
                contact: 'test@example.com'
              }
            ]
          }
        ],
        dogs: [
          {
            indexNumber: 1234,
            name: 'Pepper',
            dateOfBirth: new Date(2022, 10, 23),
            colour: 'White',
            sex: 'Male',
            neutered: 'Yes',
            microchipNumber: '2134567891'
          }
        ]
      }]
    })
  })
})
