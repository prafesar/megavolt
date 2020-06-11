import db from '~/firebase/db';

const collCableRef = db.collectionGroup('cables');
const cableCashRef = db.doc('cash/cable-list');


export default {
  getDataFromCableColl: async function (collRef = collCableRef) {
    const collSnap = await collRef.get();
    
      return collSnap.docs.map(doc => {
      if (doc.exists) {
        return ({ ref: doc.ref, id: doc.id, ...doc.data() });
      }
    });
  },
  
  createCableCollCash: function () {
    return getDataFromCableColl()
      .then(result => cableCashRef.set({ cash: result }))
  },

  getCableCollCash: async function () {
    const res = await cableCashRef.get();
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