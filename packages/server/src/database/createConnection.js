const firebase = require('firebase-admin')

const createConnection = async () => {
  const serviceAccountKey = require('../../serviceAccountKey.json')

  const firebaseConfig = {
    default: 'DEFAULT',
    apiKey: process.env.FIREBASE_API_KEY,
    credential: firebase.credential.cert(serviceAccountKey),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  }

  await firebase.initializeApp(firebaseConfig)
}

module.exports = createConnection
