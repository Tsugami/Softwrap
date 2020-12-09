const firebase = require('firebase-admin')

const createConnection = async () => {
  const firebaseConfig = {
    default: 'DEFAULT',
    apiKey: process.env.FIREBASE_API_KEY,
    databaseURL: process.env.FIREBASE_DATABASE_URL
  }

  await firebase.initializeApp(firebaseConfig)
}

module.exports = createConnection
