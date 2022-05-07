import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    Categories: [],
    Category: {},
    Article: {}
  },
  getters: {
    getCategories: ({ Categories }) => Categories,
    getCategory: ({ Category }) => Category,
    getArticle: ({ Article }) => Article,
  },
  mutations: {
    setCategories: (state, payload) => {
      state.Categories = payload;
    },
    setCategory: (state, payload) => {
      state.Category = payload;
    },
    setArticle: (state, payload) => {
      state.Article = payload;
    },
  }
}