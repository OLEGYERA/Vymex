import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    Page: null,
    NavigationFull: true,
    OpenCompany: {id: null, status: null}
  },
  getters: {
    getPage: (state) => state.Page,
    getNavigationFull: (state) => state.NavigationFull,
    getOpenCompany: (state) => state.OpenCompany,
  },
  mutations: {
    setPage: (state, payload) => state.Page = payload,
    setNavigationFull: (state, payload) => state.NavigationFull = payload,
    setOpenCompany: (state, payload) => state.OpenCompany = payload,
  }
}