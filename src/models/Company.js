import {CompanyCreate} from '@Singletons'
export default {
  namespaced: true,
  state: {
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
    getAll: (state) => state.all,
    getCurrentCompany: (state) => state.currentCompany,
    getSections: (state) => state.sections,
  },
  mutations: {
    setNew: (state, payload) => state.all.push(payload),
    setAll: (state, payload) => state.all = payload,
    setCurrentCompanyBase: (state, payload) => state.currentCompany.base = payload,
    setCurrentCompanyWorkers: (state, payload) => state.currentCompany.workers = payload,
    changeStatus: (state, i) => {
      state.sections.map(el => el.isActive = false)
      state.sections[i].isActive = !state.sections[i].isActive
    },
  },
  modules: {
    CompanyCreate
  }
}