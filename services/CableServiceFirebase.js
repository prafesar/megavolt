import db from '~/firebase/db';

const collCableRef = db.collectionGroup('cables');

function printArrayOfItems(promise) {
  return promise
    .then(items => item.map(
      item => `${JSON.stringify(curr)},`
    ))
    .then(res => console.log(
      `[\n${res.join('\n')}\n]`
    ))
}

export default {
  getCableList: function () {
    // call http function https://us-central1-prafesar-labs.cloudfunctions.net/setCableList
  },
  getCableListBySearch: function (search) {
    // call with params 
    // https://us-central1-prafesar-labs.cloudfunctions.net/getCableListBySearch?search="Ф102"
  },
  getCableById: function (cableId) {
    return collCableRef.doc(cableId)
      .get()
      .then(snapDoc => ({ ref: snapDoc.ref, id: snapDoc.id, ...snapDoc.data() }))
  },
  createCable: function () {
    
  },
  updateCableById: function (cableId) {
    
  },
  removeCableById: function (cableId) {

  },
  getEventListByCableId: function (cableId) {

  },
  createEventByCableId: function (cableId) {

  },
  updateEventById: function (eventId) {

  },
  removeEventById: function (eventId) {
    
  }
}