import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    Errors: []
    // Countries: [],
    // ChooseCountry: null
  },
  getters: {
    getActiveError: (state) => state.Errors.filter(error => error.status === 'active'),
    // getChooseCountry: (state) => state.ChooseCountry,
  },
  mutations: {
    setError: (state, payload) => state.Errors.push(payload),
    // setChooseCountry: (state, payload) => state.ChooseCountry = payload,
  }
}