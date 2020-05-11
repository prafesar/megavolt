import db from '~/firebase/db';

export default {

  getCables: async ({ fider, limit }) => {
    console.log('get arguments ' + fider + '   limit ' + limit)
    const snap = await db.collection('cables')
      .where('fider.number', '==', fider)
      .limit(limit)
      .get();
    
    return snap.docs.map((doc) => ({
      ...doc.data(), id: doc.id
    }));
      
  },

}