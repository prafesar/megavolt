import app from 'firebase/app';
import firestore from 'firebase/firestore';

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

app.length || app.initializeApp(config);

const db = firestore(app);

export default db;