const functions = require('firebase-functions');
const admin = require('firebase-admin');
const _ = require('lodash');

admin.initializeApp();
const db = admin.firestore();

const cableCollectionRef = db.collectionGroup('cables');
const cableListRef = db.doc('cash/cable-list');

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
  updateCableList: function () { // read all cables and create db-cash <promise>
    return getAllCables()
      .then(result => cableListRef.set({ cash: result }))
  },
  getCableList: async function () { // read from db-cash
    const res = await cableListRef.get();
    return res.data().cash;
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
  setCableList: functions.https.onRequest((request, response) => {
    // create cashe cable list
    return cableUtilits.updateCableList()
      .then(() => response.send({ result: true }))
      .catch(() => response.send({ result: false }))
  }),

  getCableListBySearch: functions.https.onRequest((request, response) => {
    const cables = cableUtilits.getCableList();
    const searchTags = req.body.search
      .toUpperCase()
      .split(' ')
      .trim();
    // 3. search cables by tags
    const result = cables.filter(({ tags }) => _.intersection(tags, searchTags).length !== 0)
    // 4. return search result
    return response.send(result);
  }),
};
