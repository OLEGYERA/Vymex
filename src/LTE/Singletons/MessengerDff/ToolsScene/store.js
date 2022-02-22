export default {
  namespaced: true,
  state: {
    tab: {
      activeIdx: 0,
      list: [
        {name: 'chats', iconName: 'icon-chat', routers: null},
        {name: 'contacts', iconName: 'icon-profile', routers: null},
        {name: 'volumes', iconName: 'icon-volume', routers: null},
      ],
      group: [0, 1, null, 2],
    },
    router: {
      directionNext: true
    }
  },
  getters: {
    getTabCollections: (state) => state.tab,
    getActiveTab: (state) => state.tab.list[state.tab.activeIdx],
    getRouterCollections: (state) => state.router,

  },
  mutations: {
    switchActiveTab: (state, activeIdx) => {
      if(state.tab.list[activeIdx]) state.tab.activeIdx = activeIdx;
    },
    routerNext: (state, routerData) => {
      let activeTab = state.tab.list[state.tab.activeIdx];
      if(activeTab.routers === null){
        activeTab.routers = [routerData]
      } else {
        activeTab.routers.push(routerData)
      }

      state.router.directionNext = true;
    },
    routerBack: (state) => {
      let activeTab = state.tab.list[state.tab.activeIdx];
      if(activeTab.routers.length === 1){
        activeTab.routers = null
      } else {
        activeTab.routers.pop();
      }

      state.router.directionNext = false;
    }
  }
}