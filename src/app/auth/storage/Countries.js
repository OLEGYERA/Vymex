import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    Countries: []
  },
  getters: {
    getCountries: (state) => state.countries,
  },
  mutations: {
    setCountries: (state, payload) => state.Countries = payload,
  }
}