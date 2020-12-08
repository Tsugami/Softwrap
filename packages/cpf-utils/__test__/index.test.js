
const CPFUtil = require('../index')

it('should return true if o cpf is valid', () => {
  expect(CPFUtil.validate('61268089087')).toBe(true)
  expect(CPFUtil.validate('832.922.170-91')).toBe(true)
  expect(CPFUtil.validate('510.83993089')).toBe(true)
  expect(CPFUtil.validate('awhdwodhd')).toBe(false)
  expect(CPFUtil.validate('4951')).toBe(false)
})

it('should return true if o cpf is valid', () => {
  expect(CPFUtil.parse('77087650211')).toBe('770.876.502-11')
  expect(CPFUtil.parse('21831500175')).toBe('218.315.001-75')
})
