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
    },
    notificationsStatus: false,
    disableTime: 0,
  },
  getters: {
    getTabCollections: (state) => state.tab,
    getActiveTab: (state) => state.tab.list[state.tab.activeIdx],
    getRouterCollections: (state) => state.router,
    getNotificationsStatus: (state) => state.notificationsStatus,
    getDisableTime: (state) => state.disableTime,
  },
  mutations: {
    switchActiveTab: (state, activeIdx) => {
      if(state.tab.list[activeIdx]) state.tab.activeIdx = activeIdx;
    },
    routerNext: (state, routerData) => {
      console.log(routerData)
      let activeTab = state.tab.list[state.tab.activeIdx];
      console.log(activeTab.routers)
      if(activeTab.routers === null){
        console.log(activeTab.routers)
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
    },
    switchNotifications: (state) => {
      if (state.notificationsStatus === false) {
        state.tab.list[2].iconName = 'icon-volume-off';
      } else {
        state.disableTime = 0;
        state.tab.list[2].iconName = 'icon-volume';
      }
      state.notificationsStatus = !state.notificationsStatus;
    },
    changeTime: (state, newTime) => state.disableTime = newTime

  }
}