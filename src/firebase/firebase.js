// import * as firebase from "firebase";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";
// import "firebase/firestore";

// Your web app's Firebase configuration

let database, storage;

const isClient = typeof window !== "undefined";

if (!isClient) {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_id,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };

  if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // firebase.analytics();
    // firebase.analytics().logEvent("notification_received");
    database = firebase.database();
    storage = firebase.storage();
    console.log("database", database);
  }
}

// try {
//   const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_id,
//     appId: process.env.FIREBASE_APP_ID,
//     measurementId: process.env.FIREBASE_MEASUREMENT_ID,
//   };

//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   // firebase.analytics();
//   // firebase.analytics().logEvent("notification_received");
//   database = firebase.database();
//   storage = firebase.storage();
// } catch (error) {
//   console.log("FIREBASE_API_KEY", process.env.FIREBASE_API_KEY);
// }

export default firebase;
// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// database.ref("posts").set({
//   title: "First Post",
//   content: "Hello !",
//   createdAt:
//     new Date().getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
// });

// database
//   .ref("expenses")
//   .once("value")
//   .then(snapshot => {
//     const expenses = [];

//     snapshot.forEach(childSnapshot => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });
//   });

// const addData = () => {
//   try {
//     database.ref().set({
//       name: "Will",
//       age: 25,
//       isSingle: false,
//       location: { town: "Burgess Hill", country: "UK" }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const add = async () => {
//   await addData();
// };

// add();
