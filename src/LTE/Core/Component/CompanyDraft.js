import Binder from "@/LTE/Core/Helpers/Binder";
import {encrypt, numberToArray, serialize, utf8ToArray} from "@Core/Helpers/utilites";

class CompanyDraft extends Binder {
    constructor() {
        super();
    }

    async getRegistrationLimits() {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(null)));
    }

    getRegistrationLimitsRes(res) {
        this.$store.set('CurrentRegistrationLimitsRes', res);
    }

    async createRegistrationLimits(data) {
        let dataCreator = serialize(
            utf8ToArray(data.startAt),
            utf8ToArray(data.endAt),
            numberToArray(data.limit),
        );
        this.$socket.emit('listener', await encrypt(...arguments[1], dataCreator));
    }

    createRegistrationLimitsRes(res) {
        this.$store.set('CurrentQueueId', res.queueId);
    }

    async createDraftCompany(data) {
        let dataCreator = serialize(
            utf8ToArray(data.name),
            utf8ToArray(data.employeesCount),
            numberToArray(data.queueId),
        );
        this.$socket.emit('listener', await encrypt(...arguments[1], dataCreator));
    }

    createDraftCompanyRes(res) {
        if (!res.error) {
            this.$router.push({name: 'vx'})
        }
    }

    async getUserDraftCompanies(unitId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(unitId)));
    }

    getUserDraftCompaniesRes(res) {
        this.$store.set('CurrentUserDraftRes', res);
    }
}

export default new CompanyDraft();