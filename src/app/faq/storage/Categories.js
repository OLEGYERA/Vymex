import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    Categories: [],
  },
  getters: {
    getCategories: ({ Categories }) => Categories,
  },
  mutations: {
    setCategories: (state, payload) => {
      state.Categories = payload;
    },
  }
}