import {mapGetters, mapMutations} from "vuex";

export default {
    computed: {
        ...mapGetters({
            registrationLimitsRes: 'getRegistrationLimitsRes',
            user: 'getUser'
        })
    },
    methods: {
        ...mapMutations({
            setIsCheckedLimits: 'setCurrentIsCheckedLimits'
        }),
        registrationLimits() {
            this.$core.execViaComponent('CompanyDraft', 'getRegistrationLimits');
            this.$core.execViaComponent('CompanyDraft', 'getUserDraftCompanies', this.user.id);
            this.setIsCheckedLimits(true)
        }
    },
    watch: {
        registrationLimitsRes(data) {
                if (!data.isLimitReached) this.$root.pushOverlapRoute({name: 'vx.co.create'})
            }
        }
    }