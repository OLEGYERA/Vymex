export default {
	namespaced: true,
	state: {
		status: false,
		title: '',
		alias: '',
		avatar: '',
		id: null,
		shareRecipients: {},
		issuedShares: []
	},
	getters: {
		status: (state) => state.status,
		getUserAvatarData: (state) => {
			let logo = '';
			if (!state.avatar){
				for (const char of state.title) {
					if (char === char.toUpperCase() && char !== ' ') {
						logo += char
					}
				}
			} else {
				logo = state.avatar;
			}
			return {logo: logo.slice(0, 2), colorCode: String(state.activeUser.id).substr(state.activeUser.id.length - 1, 1)}
		},
		getFullName: state => state.title,
		getAlias: state => state.alias,
		getId: state => state.id,
		shareRecipients: state => state.shareRecipients,
		issuedShares: state => state.issuedShares
	},
	mutations: {
		show: (state) => state.status = true,
		close: (state) => state.status = false,
		setActiveUser: (state, user) => {
			state.title = user.title,
			state.alias = user.alias,
			state.avatar = user.avatar,
			state.id = user.id
		},
		clearActiveUser: state => {
			state.title = '',
			state.alias = '',
			state.avatar = '',
			state.id = null
		},
		setShareRecipients: (state, user) => {
			state.shareRecipients = user
		},
		deleteUser: state => {
			state.shareRecipients = {}
		},
		setIssuedShares: (state, user) => {
			state.issuedShares.push(user)
		}
	}
}
