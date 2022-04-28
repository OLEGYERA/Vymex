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
		loadingSearch: false,

		passcode: {
			code: '',
			active: false
		},
		activeAutoLock: 3600000,
		blockModal: false,
		finishTime: null
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
		getLoadingSearch: state => state.loadingSearch,
		getPasscode: state => state.passcode.code,
		getPasscodeActive: state => state.passcode.active,
		getActiveAutoLock: state => state.activeAutoLock,
		getBlockModal: state => state.blockModal
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
		},
		setPasscode: (state, payload) => {
			state.passcode.code = payload
		},
		setPasscodeActive: (state, payload) => {
			state.passcode.active = payload
		},
		setActiveAutoLock: (state, payload) => {
			state.activeAutoLock = payload
		},
		setBlockModal: (state, change) => {
			if (!state.finishTime || change) {
				state.finishTime = new Date().getTime() + state.activeAutoLock
			}

			if (state.passcode.active) {
				let idInt = setInterval(() => {
					if (new Date().getTime() > state.finishTime) {
						state.blockModal = true
						clearInterval(idInt);
						state.finishTime = null
					}
				}, 1000)
			}
		},
		setCloseBlockModal: state => {
			state.blockModal = false
		}
	}
}
