import {CompanyCreate} from '@Singletons'
export default {
  namespaced: true,
  state: {
    all: [],
    activeCompany: {},

    //for career
    currentCompany: {
      base: null,
      workers: null,
    },
    companyTeam: [],
    structure: [],
    units: null,
    userInfo: null
  },
  getters: {
    getAll: (state) => state.all,
    getCurrentCompany: (state) => state.currentCompany,
    getActiveCompany: state => state.activeCompany,
    getShare: state => state.activeCompany.cofounder && state.activeCompany.cofounder.length
      ? state.activeCompany.cofounder[0].share
      : 0,
    getCompanyTeam: state => state.companyTeam,
    getStructure: state => state.structure,
    getUnits :state => state.units,
    getUserInfo :state => state.userInfo
  },
  mutations: {
    setNew: (state, payload) => state.all.push(payload),
    setAll: (state, payload) => state.all = payload,
    setCurrentCompanyBase: (state, payload) => state.currentCompany.base = payload,
    setCurrentCompanyWorkers: (state, payload) => state.currentCompany.workers = payload,
    setActiveCompany: (state, id) => {
      state.activeCompany = state.all.filter(comp => comp.id === id)[0]
    },
    setCompanyTeam: (state, team) => state.companyTeam = team,
    setStructure: (state, str) => state.structure = str,
    setUnits: (state, payload) => state.units = payload,
    setUserInfo: (state, info) => state.userInfo = info,
    clearUserInfo: state => state.userInfo = null
  },
  modules: {
    CompanyCreate
  }
}