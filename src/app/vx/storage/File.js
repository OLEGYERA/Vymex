import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    uploadingFile: {}
  },
  getters: {
    getUploadingFile: (state) => state.uploadingFile,

  },
  mutations: {
    setUploadingFile: (state, payload) => state.uploadingFile[payload.hash] = payload,
  }
}