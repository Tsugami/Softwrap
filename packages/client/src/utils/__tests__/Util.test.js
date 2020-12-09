
import {normalizeCpf} from '../Util'

it('should return true if o cpf is valid', () => {
  expect(normalizeCpf('77087650211')).toBe('770.876.502-11')
  expect(normalizeCpf('21831500175')).toBe('218.315.001-75')
})
