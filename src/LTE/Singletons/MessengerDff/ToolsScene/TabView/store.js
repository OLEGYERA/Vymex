export default {
  namespaced: true,
  state: {
    activeIdx: 0,
    list: [
      {name: 'chats', iconName: 'icon-chat', routerName: null},
      {name: 'contacts', iconName: 'icon-profile', routerName: null},
      {name: 'volumes', iconName: 'icon-volume', routerName: null},
    ],
    group: [0, 1, null, 2],
  },
  getters: {
    getCollections: (state) => state,
    getActiveTab: (state) => state.list[state.activeIdx],
  },
  mutations: {
    switchActiveTab: (state, activeIdx) => {
      if(state.list[activeIdx]) state.activeIdx = activeIdx;
    },
  }

}