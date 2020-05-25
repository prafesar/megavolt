
import { CableService } from '~/services';

export const state = () => ({
  cables: [],
  list: [],
})

export const getters = {
  getCableList: (state) => state.list
}

export const actions = {
  fetchCableList({commit}) {
    return CableService.getCableList()
      .then(res => commit('SET_CABLE_LIST', res))
      .catch((error) => console.log('vuex: cannot commit --> ' + error));
  },
}

export const mutations = {
  SET_CABLE_LIST(state, data) {
    return state.list = data;
  }
}
