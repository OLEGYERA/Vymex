import Vue from 'vue';
import Vuex from 'vuex';
import System from "./models/System";

Vue.use(Vuex);

export default {
  namespaced: true,
  modules: {
    System
  }
}