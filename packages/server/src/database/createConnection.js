const firebase = require('firebase-admin')

const createConnection = async () => {
  const firebaseConfig = {
    default: 'DEFAULT',
    apiKey: process.env.FIREBASE_API_KEY,
    // credential: firebase.credential.cert({
    //   type: process.env.type,
    //   project_id: process.env.project_id,
    //   private_key_id: process.env.private_key_id,
    //   private_key: process.env.private_key,
    //   client_email: process.env.client_email,
    //   client_id: process.env.client_id,
    //   auth_uri: process.env.auth_uri,
    //   token_uri: process.env.token_uri,
    //   auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    //   client_x509_cert_url: process.env.client_x509_cert_url
    // }),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  }

  await firebase.initializeApp(firebaseConfig)
}

module.exports = createConnection
