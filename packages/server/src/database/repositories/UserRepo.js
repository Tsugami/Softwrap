const firebase = require('firebase-admin')
const { removeNullValue } = require('../../util/Util')

class UserRepo {
  static ref () {
    return firebase.database().ref('users')
  }

  static parseEntity (entity = {}) {
    const {
      name,
      age,
      civilState,
      cpf,
      stateUf,
      city
    } = entity

    return {
      name,
      age,
      civil_state: civilState?.toUpperCase(),
      cpf,
      state_uf: stateUf?.toUpperCase(),
      city
    }
  }

  static async create (entity) {
    const newUserRef = UserRepo.ref().push()
    await newUserRef.set(UserRepo.parseEntity(entity))
    return newUserRef.key
  }

  static async findOne (username) {
    return UserRepo.ref().child(username)
      .once('value')
      .then(snapshot => snapshot.val())
  }

  static exists (userId) {
    return UserRepo.ref(userId).child().exists()
  }

  static async update (userId, entity) {
    return UserRepo.ref().child(userId)
      .update(removeNullValue(UserRepo.parseEntity(entity)))
  }

  static remove (userId) {
    return UserRepo.ref().child(userId).remove()
  }

  static async find (filter = {}, limit = 10) {
    const {
      minAge,
      maxAge,
      city,
      civilState,
      name,
      stateUf
    } = filter

    let query = UserRepo.ref()

    if (minAge && maxAge) {
      query = query.orderByChild('age').startAt(minAge).endAt(maxAge)
    } else if (minAge) {
      query = query.orderByChild('age').startAt(minAge)
    } else if (maxAge) {
      query = query.orderByChild('age').endAt(maxAge)
    }

    if (city) query = query.orderByChild('city').equalTo(city)
    if (civilState) query = query.orderByChild('civil_state').equalTo(civilState)
    if (stateUf) query = query.orderByChild('state_uf').equalTo(stateUf)
    if (name) query = query.orderByChild('name').startAt(name).endAt(name + '\uf8ff')


    const result = await query
      .limitToFirst(limit)
      .once('value')
      .then(snapshot => snapshot.val())

    if (!result) return []

    return Object.entries(result)
      .reduce((r, [userId, data]) => [...r, { ...data, userId }], [])
  }

  /**
   *  Essa função será usada apenas para tests
   */
  static deleteAll () {
    return UserRepo.ref().set({})
  }
}

module.exports = UserRepo
