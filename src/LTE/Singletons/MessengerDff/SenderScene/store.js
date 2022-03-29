export default {
    state: {
        messengerStatus: false,
    },
    getters: {
        messengerStatus: (state) => state.messengerStatus,
    },
    mutations: {
        openMessenger: (state) => state.messengerStatus = true,
        closeMessenger: (state) => state.messengerStatus = false,
    }
}