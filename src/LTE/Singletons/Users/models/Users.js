export default {
	namespaced: true,
	state: {
		status: false,
		activeUser: {id: null},
		shareRecipients: {},
		issuedShares: [],
		users: [],
		cofounders: [],
		search: [],

		loadingShares: false,
		loadingCofounders: false,
		loadingSearch: false
	},
	getters: {
		getStatus: (state) => state.status,
		getShareRecipients: state => state.shareRecipients,
		getIssuedShares: state => state.issuedShares,
		getCofounders: state => state.cofounders,
		getUsers: state => state.users,
		getActiveUser: state => state.activeUser,
		getSearch: state => state.search,
		getLoadingShares: state => state.loadingShares,
		getLoadingCofounders: state => state.loadingCofounders,
		getLoadingSearch: state => state.loadingSearch
	},
	mutations: {
		show: (state) => state.status = true,
		close: (state) => state.status = false,
		setActiveUser: (state, user) => {
			state.activeUser = user
		},
		clearActiveUser: state => {
			state.activeUser = {id: null}
		},
		setShareRecipients: (state, user) => {
			state.shareRecipients = user
		},
		deleteUser: state => {
			state.shareRecipients = {}
		},
		setIssuedShares: (state, users) => {
			state.issuedShares = users
		},
		setCofounders: (state, cofounders) => {
			state.cofounders = cofounders
		},
		setUsers: (state, users) => {
			state.users = users
		},
		setSearch: (state, users) => {
			state.search = users
		},
		setLoadingShares: (state, payload) => {
			state.loadingShares = payload
		},
		setLoadingCofounders: (state, payload) => {
			state.loadingCofounders = payload
		},
		setLoadingSearch: (state, payload) => {
			state.loadingSearch = payload
		}
	}
}
