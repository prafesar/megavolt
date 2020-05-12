import db from '~/firebase/db';

export default {

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