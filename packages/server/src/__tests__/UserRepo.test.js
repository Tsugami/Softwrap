const UserRepo = require('../database/repositories/UserRepo')
const createConnection = require('../database/createConnection')

describe('User Repository Tests', () => {
  beforeAll(async () => {
    await createConnection()
    await UserRepo.deleteAll()
  })

  it('should create an user', async () => {
    const data = {
      name: 'Pedro Henrique',
      age: 20,
      civilState: 'SINGLE',
      city: 'São Paulo',
      stateUf: 'SP',
      cpf: 42389402394823
    }

    const userId = await UserRepo.create(data)
    const user = await UserRepo.findOne(userId)

    expect(user.name).toEqual(data.name)
  })

  it('should update the name of the first user found', async () => {
    const [firstUser] = await UserRepo.find({}, 1)

    await UserRepo.update(firstUser.userId, { name: 'Alves' })

    const user = await UserRepo.findOne(firstUser.userId)
    expect(user.name).toEqual('Alves')
  })

  it('should delete the first user found', async () => {
    const [firstUser] = await UserRepo.find({}, 1)

    await UserRepo.remove(firstUser.userId)
    expect(await UserRepo.findOne(firstUser.userId)).toBeNull()
  })

  describe('Finding Queries Test', () => {
    beforeAll(async () => {
      await UserRepo.deleteAll()
      const queries = testsUsers.map(user => UserRepo.create(user))
      await Promise.all(queries)
    })

    it('should return only users of Manaus city', async () => {
      const users = await UserRepo.find({ city: 'Manaus' })
      const expected = users.every(user => user.city === 'Manaus')
      expect(users.length && expected).toBe(true)
    })

    it('should return married users only', async () => {
      const users = await UserRepo.find({ civilState: 'MARRIED' })
      const expected = users.every(user => user.civil_state === 'MARRIED')
      expect(users.length && expected).toBe(true)
    })

    it('should return users aged 18 max', async () => {
      const users = await UserRepo.find({ maxAge: 24 })
      const expected = users.every(user => user.age <= 24)
      expect(users.length && expected).toBe(true)
    })

    it('should return users between 30 to 50 years old', async () => {
      const users = await UserRepo.find({ minAge: 30, maxAge: 50 })
      const expected = users.every(user => user.age >= 30 && user.age <= 50)
      expect(users.length && expected).toBe(true)
    })

    it('should return users of Bahia', async () => {
      const users = await UserRepo.find({ stateUf: 'BA' })
      const expected = users.every(user => user.state_uf === 'BA')
      expect(users.length && expected).toBe(true)
    })

    it('should return users start with M in the name', async () => {
      const users = await UserRepo.find({ name: 'M' })

      const expected = users.every(user => user.name.startsWith('M'))
      expect(users.length && expected).toBe(true)
    })

    it('should return users with name "Danuta Hailey"', async () => {
      const users = await UserRepo.find({ name: 'Danuta Hailey' })

      const expected = users.every(user => user.name === 'Danuta Hailey')
      expect(users.length && expected).toBe(true)
    })
  })
})

const testsUsers = [
  {
    name: 'Danuta Hailey',
    age: 23,
    civilState: 'MARRIED',
    city: 'Manaus',
    stateUf: 'AC',
    cpf: '77087650211'
  },
  {
    name: 'Alina Graff',
    age: 42,
    civilState: 'MARRIED',
    city: 'Maceió',
    stateUf: 'BA',
    cpf: '21831500175'
  },
  {
    name: 'Hank Talley',
    age: 18,
    civilState: 'WIDOWED',
    city: 'Salvador',
    stateUf: 'AM',
    cpf: '51582806306'
  },
  {
    name: 'Melvin Curtis',
    age: 48,
    civilState: 'DIVORCED',
    city: 'Manaus',
    stateUf: 'AC',
    cpf: '51468383728'
  },
  {
    name: 'Leonor Curtis',
    age: 44,
    civilState: 'MARRIED',
    city: 'Maceió',
    stateUf: 'AM',
    cpf: '29866868346'
  },
  {
    name: 'Stacy Hudson',
    age: 54,
    civilState: 'MARRIED',
    city: 'Macapá',
    stateUf: 'AL',
    cpf: '56138643658'
  },
  {
    name: 'Cheryl Olson',
    age: 38,
    civilState: 'MARRIED',
    city: 'Manaus',
    stateUf: 'AC',
    cpf: '63412062324'
  },
  {
    name: 'Michael King',
    age: 33,
    civilState: 'MARRIED',
    city: 'Maceió',
    stateUf: 'BA',
    cpf: '38875309183'
  },
  {
    name: 'Norine Burden',
    age: 47,
    civilState: 'MARRIED',
    city: 'Maceió',
    stateUf: 'AL',
    cpf: '81325195073'
  },
  {
    name: 'Shaniqua Rush',
    age: 24,
    civilState: 'SINGLE',
    city: 'Rio Branco',
    stateUf: 'AP',
    cpf: '73450189387'
  }
]
