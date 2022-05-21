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
      {isActive: true, icon: require('@/assets/img/my/dashboard.svg'), title: 'Дашборд'},
      {isActive: false, icon: require('@/assets/img/my/process.svg'), title: 'Процессы'},
      {isActive: false, icon: require('@/assets/img/my/resource.svg'), title: 'Склад ресурсов'},
      {isActive: false, icon: require('@/assets/img/my/share-management.svg'), title: 'Управление долей'},
      {isActive: false, icon: require('@/assets/img/my/team.svg'), title: 'Команда'},
      {isActive: false, icon: require('@/assets/img/my/task.svg'), title: 'Задачи'},
      {isActive: false, icon: require('@/assets/img/my/structure.svg'), title: 'Структура компании'},
      {isActive: false, icon: require('@/assets/img/my/result.svg'), title: 'Результат компании'},
      {isActive: false, icon: require('@/assets/img/my/co-queues.svg'), title: 'Соучредители'},
      {isActive: false, icon: require('@/assets/img/my/control-center.svg'), title: 'Центр управления'},
      {isActive: false, icon: require('@/assets/img/my/calendar.svg'), title: 'Календарь'},
      {isActive: false, icon: require('@/assets/img/my/storage.svg'), title: 'Склад ресурсов'},
      {isActive: false, icon: require('@/assets/img/my/settings.svg'), title: 'Настройки'},
      {isActive: false, icon: require('@/assets/img/my/assumptions.svg'), title: 'Предположения'},
      {isActive: false, icon: require('@/assets/img/my/costs.svg'), title: 'Расходы С.Е.'},
      {isActive: false, icon: require('@/assets/img/my/result-c-e.svg'), title: 'Результаты С.Е.'},
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