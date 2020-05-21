

export const state = () => ({
  list: [],
  filtredList: [],
  search: '',
})

export const getters = {
  getAllCables: (state) => state.list,
  getCablesBySearch: (state) => state.filtredList,
}

export const actions = {
  setCables ({commit}, data) {
    commit('setCablesMutation', data)
  },
  setCablesBySearch ({commit}, data) {
    commit('setCablesBySearchMutation', data)
  },
}

export const mutations = {
  setCablesMutation (state, data) {
    state.list = data
  },
  setCablesBySearchMutation (state) {
    if (!state.search) {
      state.filtredList = [];
    }
    
    state.filtredList = state.list
    .filter(cable => {
      const cableWords = _.words(cable.title, cable.fider.number, cable.fider.station, cable.fider.team);
      const searchWords = _.words(state.search)
      const searchWordsCount = search.length;
      const intersection = _.intersection(cableWords, searchWords);
      return intersection.length === searchWordsCount;
    })
  }
}
