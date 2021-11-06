import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyD0PqQOGx4MeYFnkiihx-saoLTaX8rlIKY",
    authDomain: "planning-hub-8bfd8.firebaseapp.com",
    projectId: "planning-hub-8bfd8",
    storageBucket: "planning-hub-8bfd8.appspot.com",
    messagingSenderId: "865384890267",
    appId: "1:865384890267:web:cdecdd875c5a1fdef9eb3e",
    measurementId: "G-JVW4RQ4WLC"
  };
 
  const firebaseApp = firebase.initializeApp(firebaseConfig);
 const db =  firebaseApp.firestore();
const auth= firebase.auth()
export{db, auth}
export default firebase;