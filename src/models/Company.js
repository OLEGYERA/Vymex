import {CompanyCreate} from '@Singletons'
export default {
  namespaced: true,
  state: {
    all: [],

    //for career
    currentCompanyInfo: null
  },
  getters: {
    getAll: (state) => state.all,
    getCurrentCompanyInfo: (state) => state.currentCompanyInfo,
  },
  mutations: {
    setNew: (state, payload) => state.all.push(payload),
    setAll: (state, payload) => state.all = payload,
    setCurrentCompanyInfo: (state, payload) => state.currentCompanyInfo = payload,
  },
  modules: {
    CompanyCreate
  }
}