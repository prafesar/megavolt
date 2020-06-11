const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// https://us-central1-prafesar-labs.cloudfunctions.net/setCableList

exports.setCableList = functions.https.onRequest((request, response) => {

});

exports.setList = functions.https.onRequest((request, response) => {
  let answer;

  const docs = db.collection('cables').doc('01hCwz9QxEqjHF2uCxbi')
    .get()
    .then(res => answer = res.id)
    .catch(console.error);

  db.collection('lists')
    .add({ type: 'cableList', id: answer })
    .catch(console.error);
  
  return response.send("i made cable list");
});