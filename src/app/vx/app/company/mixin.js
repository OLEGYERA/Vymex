import {mapGetters} from "vuex";

export default {
    computed: {
        ...mapGetters({
            registrationLimitsRes: 'getRegistrationLimitsRes',
            selectedCompany: 'Company/getSelectedCompany',
            userDraftRes: 'getUserDraftRes'
        }),
    },
    methods: {
        registrationLimits() {
            this.$core.execViaComponent('CompanyDraft', 'getRegistrationLimits');
            this.$core.execViaComponent('CompanyDraft', 'getUserDraftCompanies', this.selectedCompany.workerId);
        }
    },
    watch: {
        registrationLimitsRes(data) {
            if (!data.errors) {
                if (data.isLimitReached) {
                    if (this.userDraftRes.length <= 3) {
                        this.$root.pushOverlapRoute({name: 'vx.co.registration.limits'})
                    } else {
                        this.$notify({
                            text: 'Поставить в очередь на регистрацию можно не более 3-х компаний',
                            type: 'error',
                            duration: 3000,
                            speed: 500
                        })
                    }
                } else {
                    this.$root.pushOverlapRoute({name: 'vx.co.create'})
                }
            }
        }
    }
}