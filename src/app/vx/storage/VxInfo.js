import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    Page: null,
    NavigationFull: true,
  },
  getters: {
    getPage: (state) => state.Page,
    getNavigationFull: (state) => state.NavigationFull,
  },
  mutations: {
    setPage: (state, payload) => state.Page = payload,
    setNavigationFull: (state, payload) => state.NavigationFull = payload,
  }
}