export const CPF_REGEX = /([0-9]{3})\.?([0-9]{3})\.?([0-9]{3})-?([0-9]{2})/

export function normalizeCpf (cpf) {
  return cpf.replace(CPF_REGEX, (_cpf, n1, n2, n3, n4) => `${n1}.${n2}.${n3}-${n4}`)
}
