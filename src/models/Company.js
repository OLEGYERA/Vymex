import {CompanyCreate} from '@Singletons'
export default {
  namespaced: true,
  state: {
    /**
     * loader: [C] - Company {M} - getUserCompanies
     *
     * @returns Array[Objects] - list of User's companies
     */
    UserCompanies: [],

    /**
     * changer: [A] - Plate.Account
     *
     * @returns Object - states of the selected company
     */
    SelectedCompany: {
      companyId: null,
      workerId: null,
      unitId: null,
      unitLevel: null
    },

    all: [],
    sections: [
      {isActive: true, icon: require('@/assets/img/my/dashboard.svg')},
      {isActive: false, icon: require('@/assets/img/my/process.svg')},
      {isActive: false, icon: require('@/assets/img/my/resource.svg')},
      {isActive: false, icon: require('@/assets/img/my/share-management.svg')},
      {isActive: false, icon: require('@/assets/img/my/team.svg')},
      {isActive: false, icon: require('@/assets/img/my/task.svg')},
      {isActive: false, icon: require('@/assets/img/my/structure.svg')},
      {isActive: false, icon: require('@/assets/img/my/result.svg')},
      {isActive: false, icon: require('@/assets/img/my/co-queues.svg')},
      {isActive: false, icon: require('@/assets/img/my/control-center.svg')},
      {isActive: false, icon: require('@/assets/img/my/calendar.svg')},
      {isActive: false, icon: require('@/assets/img/my/storage.svg')},
      {isActive: false, icon: require('@/assets/img/my/settings.svg')},
      {isActive: false, icon: require('@/assets/img/my/assumptions.svg')},
      {isActive: false, icon: require('@/assets/img/my/costs.svg')},
      {isActive: false, icon: require('@/assets/img/my/result-c-e.svg')},
    ],

    //for career
    currentCompany: {
      base: null,
      workers: null,
    }
  },
  getters: {
    getUserCompanies: (state) => state.UserCompanies,
    getSelectedCompany: (state) => state.SelectedCompany,


    getAll: (state) => state.all,
    getCurrentCompany: (state) => state.currentCompany,
    getActiveCompany: state => state.activeCompany,
    getShare: state => state.activeCompany.cofounder && state.activeCompany.cofounder.length
      ? state.activeCompany.cofounder[0].share : 0,
    getSections: (state) => state.sections,
  },
  mutations: {
    setUserCompanies: (state, companies) => state.UserCompanies = companies,
    setSelectedCompany: (state, companyData) => state.SelectedCompany = companyData,


    setNew: (state, payload) => state.all.push(payload),
    setAll: (state, payload) => state.all = payload,
    setCurrentCompanyBase: (state, payload) => state.currentCompany.base = payload,
    setCurrentCompanyWorkers: (state, payload) => state.currentCompany.workers = payload,
    setActiveCompany: (state, id) => {
      state.activeCompany = state.all.filter(comp => comp.id === id)[0]
    },
    changeStatus: (state, i) => {
      state.sections.map(el => el.isActive = false)
      state.sections[i].isActive = !state.sections[i].isActive
    },
  },
  modules: {
    CompanyCreate
  }
}