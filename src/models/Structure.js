import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
	state: {
		createLevel: null
	},
	getters: {
		getCreateLevel: state => state.createLevel,
	},
	mutations: {
		setCreateLevel: (state, level) => state.createLevel = level,
	},

}