import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
    state: {
        ticketType: ''
    },
    getters: {
        getTicketType: (state) => state.ticketType,
    },
    mutations: {
        setSelectedTicketType: (state, payload) => state.ticketType = payload,
    },
}