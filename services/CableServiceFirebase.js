import db from '~/firebase/db';

export default {

  getCableList: async () => {
    try {
      const snap = await db.collection('cables')
        .get();
      
        const docs = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      
        return (
          docs
            .map(({ id, title, fider: { number, team } }) => (
              { id, title: `${team} ${number}: ${title}` }
            ))
        )
    }
    
    catch (e) {
      console.log('error to get data from db ' + e);
    }
  },

  getAllCables: async () => {
    try {
      const snap = await db.collection('cables')
        .get();
      
      return snap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }
    
    catch (e) {
      console.log('error to get data from db ' + e);
    }
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