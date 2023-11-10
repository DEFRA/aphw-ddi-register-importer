const readXlsxFile = require('read-excel-file/node')
const registerSchema = require('./schema/register-schema')

const processRows = file => {
  const registerMap = new Map()

  file.rows.forEach(row => {
    const person = row.person
    const dog = row.dog

    if (dog.referenceNumber === undefined || dog.referenceNumber === '')
      return

    const key = `${person.lastName}^${person.postcode}^${person.dateOfBirth}`

    const value = registerMap.get(key) || { ...person, dogs: [] }

    value.dogs.push(dog)

    registerMap.set(key, value)
  })

  return {
    payload: [...registerMap.values()]
  }
}

const importRegister = async data => {
  const file = (await readXlsxFile(data, { schema: registerSchema }))

  const { payload } = processRows(file)

  console.dir(payload, { depth: null })
}

module.exports = {
  importRegister
}
