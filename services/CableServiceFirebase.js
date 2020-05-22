import db from '~/firebase/db';

export default {

  getCableList: async (fider) => {
    const snap = await db.collection('cables')
      .limit(50)
      .get()
    
    console.log('firebase got request for cables')
    
    return snap.docs
      .map((doc) => ({
        ...doc.data(), id: doc.id
      }))
      .map(({ id, title, fider: { number, team }}) => (
        { id, title: `${team} ${number}: ${title}`}
      ));     
  },

  getCablesByFiderNumber: async (fider) => {
    const snap = await db.collection('cables')
      .where('fider.number', '==', fider)
      .get()
    
    return snap.docs.map((doc) => ({
      ...doc.data(), id: doc.id
    }));     
  },

  getCablebyId: async (id) => {
    const doc = await db.collection('cables')
      .doc(id)
      .get()
      
      return ({ ...doc.data(), id: doc.id });
  }

}