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
            this.$notify({
                text: 'Вы записаны в очередь! Мы обязательно уведомим вас об открытой регистрации',
                type: 'success',
                duration: 3000,
                speed: 500
            })
        }
    }

    async getUserDraftCompanies(userId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(userId)));
    }

    getUserDraftCompaniesRes(res) {
        let isCheckedLimits = this.$store.get('IsCheckedLimits');
        if (isCheckedLimits) {
            if (res.length < 3) {
                this.$router.push({name: 'vx.co.registration.limits'})
            } else {
                this.$notify({
                    text: 'Поставить в очередь на регистрацию можно не более 3-х компаний',
                    type: 'error',
                    duration: 3000,
                    speed: 500
                })
            }
        }
        this.$store.set('CurrentUserDraftRes', res);
        this.$store.set('CurrentIsCheckedLimits', false);
    }
}

export default new CompanyDraft();