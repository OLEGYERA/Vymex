import Vue from 'vue';
import Vuex from 'vuex';
import Router from '@/router'

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    overlapBeforeRoute: null
  },
  getters: {
    getOverlapBeforeRoute: (state) => state.overlapBeforeRoute,
  },
  mutations: {
    pushOverlapRoute: (state, payload) => {
      state.overlapBeforeRoute = {
        name: Router.currentRoute.name
      }
      Router.push(payload)
    },
    returnOverlapRoute: (state) => {
      if(state.overlapBeforeRoute){
        Router.push({name: state.overlapBeforeRoute.name})
        state.overlapBeforeRoute = null;
      } else {
        Router.push({name: 'vx'})
      }
    },
    clearOverlapRoute: (state) => state.overlapBeforeRoute = null,
  },
}