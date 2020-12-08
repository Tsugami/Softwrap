const Util = require('../util/Util')

it('should return an obj without null fields', () => {
  const obj = { a: 1, b: 2, c: null }
  const expected = Util.removeNullFields(obj)
  expect(expected).toEqual({ a: 1, b: 2 })
})

describe('checkFields Function tests', () => {
  it('should return void if have the required fields', () => {
    const obj = { a: 1, b: 'aa' }
    const requiredFields = { a: 'number', b: 'string' }
    expect(Util.checkFields(requiredFields, obj)).toBeUndefined()
  })

  it('should return the required field not exists', () => {
    const obj = { a: 1 }
    const requiredFields = { a: 'number', b: 'string' }
    expect(Util.checkFields(requiredFields, obj))
      .toEqual(expect.objectContaining({ name: 'b', type: 'string' }))
  })
})
