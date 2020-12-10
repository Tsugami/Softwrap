const firebase = require('firebase')
const { removeNullFields } = require('../../util/Util')

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
      civil_state: civilState ? civilState.toUpperCase() : civilState,
      cpf,
      state_uf: stateUf ? stateUf.toUpperCase() : stateUf,
      city
    }
  }

  static async create (entity) {
    const newUserRef = UserRepo.ref().push()
    await newUserRef.set(UserRepo.parseEntity(entity))
    return newUserRef.key
  }

  static async findOne (userId) {
    return UserRepo.ref().child(userId)
      .once('value')
      .then(snapshot => snapshot.val())
  }

  static async update (userId, entity) {
    return UserRepo.ref().child(userId)
      .update(removeNullFields(UserRepo.parseEntity(entity)))
  }

  static remove (userId) {
    return UserRepo.ref().child(userId).remove()
  }

  static async find (filter = {}, limit = 10, skip = 1) {
    const {
      minAge,
      maxAge,
      city,
      civilState,
      name,
      stateUf
    } = filter

    const query = UserRepo.ref()

    /**
     * FIREBASE NÃO ACEITA MUILTIPLAS QUERIES
     * https://firebase.google.com/docs/database/web/lists-of-data#sort_data
     */

    // if (minAge && maxAge) {
    //   query = query.orderByChild('age').startAt(minAge).endAt(maxAge)
    // }
    // if (minAge) {
    //   query = query.orderByChild('age').startAt(minAge)
    // } else if (maxAge) {
    //   query = query.orderByChild('age').endAt(maxAge)
    // } else if (city) {
    //   query = query.orderByChild('city').equalTo(city)
    // }
    // if (civilState) {
    //   query = query.orderByChild('civil_state').equalTo(civilState)
    // }
    // if (stateUf) {
    //   query = query.orderByChild('state_uf').equalTo(stateUf)
    // }
    // if (name) {
    //   query = query.orderByChild('name').startAt(name).endAt(name + '\uf8ff')
    // }

    const users = await query
      // .limitToFirst(limit)
      .once('value')
      .then(snapshot => snapshot.val())

    if (!users) return []

    const usersParsed = Object.entries(users)
      .reduce((r, [userId, data]) => [...r, { ...data, userId }], [])

    const filteredUsers = usersParsed
      .filter(user => {
        if (minAge && user.age < minAge) {
          return false
        }
        if (maxAge && user.age > maxAge) {
          return false
        }
        if (city && user.city !== city) {
          return false
        }
        if (stateUf && user.state_uf !== stateUf) {
          return false
        }
        if (civilState && user.civil_state !== civilState) {
          return false
        }
        if (name && !user.name.toUpperCase().includes(name.toUpperCase())) {
          return false
        }
        return true
      })

    return filteredUsers.slice((skip - 1) * limit, skip * limit)
  }

  /**
   *  Essa função será usada apenas para tests
   */
  static deleteAll () {
    return UserRepo.ref().set({})
  }
}

module.exports = UserRepo
