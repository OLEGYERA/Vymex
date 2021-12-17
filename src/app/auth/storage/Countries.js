import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    Countries: [],
    ChooseCountry: {}
  },
  getters: {
    getCountries: (state) => state.Countries,
    getChooseCountry: (state) => state.ChooseCountry,
  },
  mutations: {
    setCountries: (state, payload) => {
      state.Countries = payload;
      state.ChooseCountry = payload[0];
    },
    setChooseCountry: (state, payload) => state.ChooseCountry = payload,
  }
}