import {CompanyCreate} from '@Singletons'
export default {
  namespaced: true,
  state: {
    all: [],
  },
  getters: {
    getAll: (state) => state.all
  },
  mutations: {
    setNew: (state, payload) => state.all.push(payload),
    setAll: (state, payload) => state.all = payload,
  },
  modules: {
    CompanyCreate
  }
}