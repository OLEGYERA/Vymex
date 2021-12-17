import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({encodingType: '', isCompression: false});
Vue.use(Vuex);

import Countries from '@/app/auth/storage/Countries'
import UserProfile from '@/app/auth/storage/UserProfile'
import Settings from '@/app/vhome/storage/Settings'
import Crypto from '@/core/SEKSproto/CryptoStorage'


export default new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  modules: {
    Countries,
    UserProfile,
    Settings,
    Crypto,
  },
  plugins: [
    createPersistedState({
      key: 'vymex_session',
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
