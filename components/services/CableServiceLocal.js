import axios from 'axios';

export default {

  getAllCables: async function() {
    try {
      const res = await axios
        .get('http://localhost:3000/cables');
      return res.data;
    }
    catch (error) {
      console.log('Cant load cables list' + error.response);
    }
  },

  getCableById: (id) => {
    axios
      .get('http://localhost:3000/cables')
      .then(cables => cables[id])
      .catch(error => {
        console.log('Cant load cable data by Id' + error.response);
        throw Error;
      })
  }
}