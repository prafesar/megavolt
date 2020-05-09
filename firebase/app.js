import Firebase from 'firebase/app';
// import credentials from './credentials';

// if (!Firebase.length) {

// }

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

export default !Firebase.length ? Firebase.initializeApp(config) : Firebase;
