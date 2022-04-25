export default {
  namespaced: true,
  state: {
    lastPageReload: null,
    basicSync: null,
    // messengerStatus: false,
  },
  getters: {
    getLastPageReload: (state) => state.lastPageReload,
    getBasicSync: (state) => state.basicSync,


    // messengerStatus: (state) => state.messengerStatus,
  },
  mutations: {
    setLastPageReload: (state, time) => state.lastPageReload = time,
    setBasicSync: (state, time) => state.basicSync = time,

    // openMessenger: (state) => state.messengerStatus = true,
    // closeMessenger: (state) => state.messengerStatus = false,
  }
}