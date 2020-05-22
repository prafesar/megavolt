import _ from 'lodash';
import { CableService } from '~/services';

export const state = () => ({
  cables: [],
  list: [
    { id: 'asdfhl', title: 'title of cable'},
    { id: 'addfhl', title: 'title of cable2'},
    { id: 'asdhhl', title: 'title of cable3'},
  ],
  listBySearch: [],
  search: '',
})

export const getters = {
  getCableList: (state) => state.list,
  getCableListBySearch: (state) => state.listBySearch,
}

export const actions = {
  fetchCableList({commit}) {
    return CableService.getCableList()
      .then(res => commit('SET_CABLE_LIST', res))
      .catch((error) => console.log('cannot read data from server'));
  },
}

export const mutations = {
  SET_CABLE_LIST(state, data) {
    return state.list = data;
  },
  // setCablesBySearchMutation (state) {
  //   if (!state.search) {
  //     state.filtredList = [];
  //   }
    
  //   state.searchResult = state.list
  //   .filter(cable => {
  //     const cableWords = _.words(cable.title, cable.fider.number, cable.fider.station, cable.fider.team);
  //     const searchWords = _.words(state.search)
  //     const searchWordsCount = search.length;
  //     const intersection = _.intersection(cableWords, searchWords);
  //     return intersection.length === searchWordsCount;
  //   })
  // }
}
