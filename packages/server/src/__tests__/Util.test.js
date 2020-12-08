const Util = require('../util/Util')

it('should return an obj without null fields', () => {
  const obj = { a: 1, b: 2, c: null }
  const expected = Util.removeNullFields(obj)
  expect(expected).toEqual({ a: 1, b: 2 })
})

it('should return true if o cpf is valid', () => {
  expect(Util.validateCPF('61268089087')).toBe(true)
  expect(Util.validateCPF('832.922.170-91')).toBe(true)
  expect(Util.validateCPF('510.83993089')).toBe(true)
  expect(Util.validateCPF('awhdwodhd')).toBe(false)
  expect(Util.validateCPF('4951')).toBe(false)
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
