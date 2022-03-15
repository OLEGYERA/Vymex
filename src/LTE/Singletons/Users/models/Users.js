export default {
	namespaced: true,
	state: {
		status: false
	},
	getters: {
		status: (state) => state.status,
	},
	mutations: {
		show: (state) => state.status = true,
		close: (state) => state.status = false,
	}
}
