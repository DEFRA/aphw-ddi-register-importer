jest.mock('read-excel-file/node')
const mockReadXlsxFile = require('read-excel-file/node')
const mockRegister = require('../mocks/register/register-xlsx')

const { importRegister } = require('../../app/register-import')

describe('register import', () => {
  beforeEach(() => {
    mockReadXlsxFile.mockReturnValue(mockRegister)
  })

  test('should return register rows from xlsx', async () => {
    const { add } = await importRegister([])

    expect(mockReadXlsxFile).toHaveBeenCalledTimes(2)
    expect(add).toHaveLength(6)
  })

  test('should group approved dogs under owner', async () => {
    const { add } = await importRegister([])

    const person = add.find(p => p.lastName === 'Poppins' &&
      p.dateOfBirth.getDate() === new Date(2000, 0, 1).getDate() &&
      p.postcode === 'SW1A 2AA')

    expect(person.dogs).toHaveLength(3)

    expect(person.dogs[0].name).toEqual('Fred')
    expect(person.dogs[0].colour).toEqual('Brown')

    expect(person.dogs[1].name).toEqual('Max')
    expect(person.dogs[1].colour).toEqual('grey')
  })
})
