import Binder from "@/LTE/Core/Helpers/Binder";
import {encrypt, serialize, numberToArray, utf8ToArray} from "@/LTE/Core/Helpers/utilites";

class Cofounders extends Binder {
	constructor() {
		super();
	}

	async getCofounders(companyId) {
		this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(companyId)));
	}

	getCofoundersRes(cofounder) {
		this.$store.name('Users').set('LoadingCofounders', false)
		this.$store.name('Users').set('Cofounders', cofounder)
	}

	async giveShare(share) {
		let user = this.$store.name('Users').get('ShareRecipients')
		let activeCompany = this.$store.name('Company').get('ActiveCompany')
		
		let data = serialize(
			numberToArray(activeCompany.id),
			numberToArray(user.id),
			share
		)
		this.$socket.emit('listener', await encrypt(...arguments[1], data));
	}

	giveShareRes() {
		this.$core.execViaComponent('Company', 'getUserCompanies');
		this.$notify({text: 'Доля успешно выдана', type: 'success', duration: 3000, speed: 500})
	}

	async getShareHistory(companyId) {
		this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(companyId)));
	}

	getShareHistoryRes(history) {
		this.$store.name('Users').set('LoadingShares', false)
		this.$store.name('Users').set('IssuedShares', history)
	}

	async search(params) {
		let data = serialize(
			numberToArray(params[0]),
			utf8ToArray(params[1])
		)
		this.$socket.emit('listener', await encrypt(...arguments[1], data));
	}

	searchRes(response) {
		this.$store.name('Users').set('LoadingSearch', false)
		this.$store.name('Users').set('Search', response)
	}
}

export default new Cofounders();