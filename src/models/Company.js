import {CompanyCreate} from '@Singletons'
export default {
  namespaced: true,
  state: {
    all: [],

    //for career
    currentCompany: {
      base: null,
      workers: null,
    }
  },
  getters: {
    getAll: (state) => state.all,
    getCurrentCompany: (state) => state.currentCompany,
  },
  mutations: {
    setNew: (state, payload) => state.all.push(payload),
    setAll: (state, payload) => state.all = payload,
    setCurrentCompanyBase: (state, payload) => state.currentCompany.base = payload,
    setCurrentCompanyWorkers: (state, payload) => state.currentCompany.workers = payload,
  },
  modules: {
    CompanyCreate
  }
}