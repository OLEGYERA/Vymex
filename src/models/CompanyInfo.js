import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
    namespaced: true,
    state: {
        Structure: null,
        PlainStructure: null
    },
    getters: {
        getStructure: (state) => state.Structure,
        getPlainStructure: (state) => state.PlainStructure
    },
    mutations: {
        setStructure: (state, payload) => state.Structure = payload,
        setPlainStructure: (state, payload) => state.PlainStructure = payload,
    }
}