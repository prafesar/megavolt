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
    // call http function createCableCollCash
  },
  getCableById: function (cableId) {

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