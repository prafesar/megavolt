const functions = require('firebase-functions');
const admin = require('firebase-admin');
const _ = require('lodash');

admin.initializeApp();
const db = admin.firestore();

const cableCollectionRef = db.collectionGroup('cables');
const cableListRef = db.collection('cash').doc('cable-list');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const cableUtilits = {
  getAllCables: async function () {
    const collSnap = await cableCollectionRef
      .get();
    return collSnap.docs
      .filter(doc => doc.exists)
      .map(doc => ({ ref: doc.ref, id: doc.id, ...doc.data() }))
  },
  updateCableList: async function () { // read all cables and create db-cash <promise>
    const result = await this.getAllCables();
    return await cableListRef.set({ cash: result });
  },
  getCableList: async function () { // read from db-cash
    const result = await cableListRef.get()
      .then(docSnap => docSnap.data())
      .then(({ cash }) => cash);
    return result;
  },
  setTagsForEachCable: async function () {
    const cables = await this.getAllCables();
    return cables
      .forEach(({ ref, title, fider }) => {
        const tags = getCableTags(title, fider);
        ref.set({ tags }, { merge: true });
      })
  },
  getCableTags: function(title, fider) {
    const titleTags = _.words(title.toUpperCase());
    const fiderTags = fider.toUpperCase().split(' → ')
      .map(item => item.trim().replace("'", ""));
    return titleTags.concat(fiderTags).filter(item => item !== '→');
  }
}


module.exports = {
  // https://us-central1-prafesar-labs.cloudfunctions.net/setCableList
  setCableList: functions.https.onRequest(async (request, response) => {
    // create cashe cable list
    try {
      await cableUtilits.updateCableList();
      response.send({ result: true })
    } catch (error) {
      response.send({ result: false, message: error.message })
    }
    
  }),
  // https://us-central1-prafesar-labs.cloudfunctions.net/getCableListBySearch?search="838"
  getCableListBySearch: functions.https.onRequest(async (request, response) => {
    const search = request.query.search;
    const searchTags = _.words(search.toUpperCase());
    const countSearchTags = searchTags.length;
    
    try {
      const cables = await cableUtilits.getCableList();
      const result = cables.filter(({ tags }) => {
        const diff = _.intersection(tags, searchTags);
        return (diff.length === countSearchTags);
      });
        
      response.send({ result });
    } catch (error) {
      response.send({ result: false, message: error.message, status: 'error' });
    }
    
  }),
};
