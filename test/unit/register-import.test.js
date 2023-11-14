jest.mock('read-excel-file/node')
const mockReadXlsxFile = require('read-excel-file/node')
const mockRegister = require('../mocks/register/register-xlsx')

const { importRegister } = require('../../app/register-import')

describe('register import', () => {
  beforeAll(() => {
    mockReadXlsxFile.mockReturnValue(mockRegister)
  })

  test('should return register rows from xlsx', async () => {
    const { payload } = await importRegister([])

    expect(mockReadXlsxFile).toHaveBeenCalledTimes(1)
    expect(payload).toHaveLength(3)
  })

  test('should group dogs under owner', async () => {
    const { payload } = await importRegister([])

    const person = payload.find(p => p.lastName === 'Poppins' &&
      p.dateOfBirth === '01/01/2000' &&
      p.postcode === 'SW1A 2AA')

    expect(person.dogs).toHaveLength(2)

    expect(person.dogs[0].name).toEqual('Fred')
    expect(person.dogs[0].colour).toEqual('Brown')

    expect(person.dogs[1].name).toEqual('Max')
    expect(person.dogs[1].colour).toEqual('grey')
  })

  test('should ignore dogs without reference number', async () => {
    const { payload } = await importRegister([])

    const person = payload.find(p => p.lastName === 'Poppins' &&
      p.dateOfBirth === '01/01/2000' &&
      p.postcode === 'SW1A 2AA')

    const dog = person.dogs.find(d => d.name === 'Sam' &&
      d.dateOfBirth === '01/01/2021')

    expect(person.dogs).toHaveLength(2)
    expect(dog).toBeUndefined()
  })
})
