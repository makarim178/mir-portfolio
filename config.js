'use string';
const dotenv = require('dotenv');
// const assert = require('assert');

dotenv.config();

const {
  // PORT,
  // HOST,
  // HOST_URL,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  CLIENT_ID,
  CLIENT_SECRET,
  ACCESS_TOKEN,
  MAILJET_API_KEY,
  MAILJET_SECRET_KEY
} = process.env;

// assert(PORT, 'PORT is required');
// assert(HOST, 'HOST is required');


module.exports = {
  // port: PORT,
  // host: HOST,
  // url: HOST_URL,
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
  },
  nylasConfig: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    accessToken: ACCESS_TOKEN,
  }, 
  mailjetConfig : {
    apiKey: MAILJET_API_KEY,
    secretKey: MAILJET_SECRET_KEY,
  }
}