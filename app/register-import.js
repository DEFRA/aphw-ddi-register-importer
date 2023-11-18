const readXlsxFile = require('read-excel-file/node')
const registerSchema = require('./schema/register-schema')

const processRows = async (register, sheet, schema) => {
  const xlsx = await readXlsxFile(register, { sheet, schema })

  const registerMap = new Map()

  xlsx.rows.forEach(row => {
    const person = row.person
    const dog = row.dog

    if (dog.referenceNumber !== undefined || dog.referenceNumber !== '') {
      const key = `${person.lastName}^${person.postcode}^${person.dateOfBirth}`

      const value = registerMap.get(key) || { ...person, dogs: [] }

      value.dogs.push(dog)

      registerMap.set(key, value)
    }
  })

  return {
    payload: [...registerMap.values()]
  }
}

const importRegister = async register => {
  return processRows(register, 'Passed', registerSchema)
}

module.exports = {
  importRegister
}
