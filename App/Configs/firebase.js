// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app'
// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/database'
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdk_Muy3Thj98Y3D3YhXzGaBI6zdUa8FA",
  authDomain: "initialtest-eb9f6.firebaseapp.com",
  databaseURL: "https://initialtest-eb9f6-default-rtdb.firebaseio.com",
  projectId: "initialtest-eb9f6",
  storageBucket: "initialtest-eb9f6.appspot.com",
  messagingSenderId: "422329749939",
  appId: "1:422329749939:web:ae9656c2a125cb9a827bc6",
  measurementId: "G-Z1CXDPPK7V"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
var database = firebase.database()

export {
  database
}
