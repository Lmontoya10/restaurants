
import firebase from 'firebase/app';
import 'firebase/firestore'

 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyAJaMcvCn1wyyZn2YhUoS1n40612CwBtGc",
    authDomain: "restaurants-f8d5e.firebaseapp.com",
    projectId: "restaurants-f8d5e",
    storageBucket: "restaurants-f8d5e.appspot.com",
    messagingSenderId: "519734556605",
    appId: "1:519734556605:web:a455e61d92b932edb2c4d4"
  }

  // Initialize Firebase
 export const firebaseApp=firebase.initializeApp(firebaseConfig)