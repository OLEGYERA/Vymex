import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
    state: {
        registrationLimitsRes: {},
        queueId: 0,
        userDraftRes: [],
        month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        isCheckedLimits: false
},
    getters: {
        getRegistrationLimitsRes: (state) => state.registrationLimitsRes,
        getQueueId: (state) => state.queueId,
        getUserDraftRes: (state) => state.userDraftRes,
        getMonth: (state) => state.month,
        getIsCheckedLimits: (state) => state.isCheckedLimits
    },
    mutations: {
        setCurrentRegistrationLimitsRes: (state, payload) => state.registrationLimitsRes = payload,
        setCurrentQueueId: (state, payload) => state.queueId = payload,
        setCurrentUserDraftRes: (state, payload) => state.userDraftRes = payload,
        setCurrentIsCheckedLimits: (state, payload) => state.isCheckedLimits = payload
    },
}