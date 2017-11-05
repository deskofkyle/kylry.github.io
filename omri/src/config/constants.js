import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBwkmMRGcYB_03owPKF5o6CKhmELmEm9X0",
  authDomain: "moments-be375.firebaseapp.com",
  databaseURL: "https://moments-be375.firebaseio.com",
  storageBucket: "gs://moments-be375.appspot.com"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
export const storageRef = firebase.storage().ref()
