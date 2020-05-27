import Firebase from 'firebase/app';

// const config = {
//   apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
//   authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
//   // projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
//   projectId:  'prafesar-labs',
//   storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.VUE_APP_FIREBASE_APP_ID,
//   measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
// };

const config = {
  apiKey: "AIzaSyDKlaYNqMPxCFplgnHpOJo1IGsUrlf5VWM",
  authDomain: "prafesar-labs.firebaseapp.com",
  databaseURL: "https://prafesar-labs.firebaseio.com",
  projectId: "prafesar-labs",
  storageBucket: "prafesar-labs.appspot.com",
  messagingSenderId: "661955644479",
  appId: "1:661955644479:web:b162b4500a12d2e24e3c8a",
  measurementId: "G-NNTN0KPFP9"
};

export default !Firebase.apps.length ? Firebase.initializeApp(config) : Firebase.app();
