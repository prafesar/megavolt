const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

const collCableRef = db.collectionGroup('cables');
const cableCashRef = db.doc('cash/cable-list');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// https://us-central1-prafesar-labs.cloudfunctions.net/setCableList

const cableService = {
  getDataFromCableColl: async function (collRef = collCableRef) {
    const collSnap = await collRef.get();
    
      return collSnap.docs.map(doc => {
      if (doc.exists) {
        return ({ ref: doc.ref, id: doc.id, ...doc.data() });
      }
    });
  },
  createCableCollCash: function () { // read all cables and create db-cash <promise>
    return getDataFromCableColl()
      .then(result => cableCashRef.set({ cash: result }))
  },
  getCableCollCash: async function (docRef = cableCashRef) { // read from db-cash
    const res = await docRef.get();
    return res.data().cash;
  },
  setTagsForEachCable: async function () {
    const cables = await this.getDataFromCableColl();
    
    return cables
      .forEach(({ ref, title, fider }) => {
        const titleTags = _.words(title.toUpperCase());
        const fiderTags = fider.toUpperCase().split(' → ')
          .map(item => item.trim().replace("'", ""));
        const tags = titleTags.concat(fiderTags).filter(item => item !== '→');
        ref.set({ tags }, { merge: true });
      })
  },
}

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