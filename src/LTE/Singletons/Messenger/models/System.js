export default {
  state: {
    status: false,
    sidebarData: {
      tabIndex: 0,
      tabList: {
        data: [
          {name: 'chats', iconName: 'icon-chat', routerName: null},
          {name: 'contacts', iconName: 'icon-profile', routerName: null},
          {name: 'volumes', iconName: 'icon-volume', routerName: null},
          // {name: 'volumes', iconName: 'icon-volume-off', routerName: null},
        ],
        group: [0, 1, null, 2]
      },
    },
    disableNotifications: false,
    disableTime: 0,
  },
  getters: {
    status: (state) => state.status,
    sidebarView: (state) => {
      const sidebarView = state.sidebarData;
      return {
        tabList: sidebarView.tabList,
        tabActive: sidebarView.tabList.data[sidebarView.tabIndex],
      }
    },
    disableNotifications: (state) => state.disableNotifications,
    disableTime: (state) => state.disableTime
  },
  mutations: {
    show: (state) => state.status = true,
    close: (state) => state.status = false,

    switchTab: (state, newTabIndex) => {
      if(state.sidebarData.tabList.data[newTabIndex])
        state.sidebarData.tabIndex = newTabIndex;
    },
    setRouterName: (state, routerName) => {
      const sidebarView = state.sidebarData;
      sidebarView.tabList.data[sidebarView.tabIndex].routerName = routerName
    },
    switchNotifications: (state) => {
      if (state.disableNotifications === false) {
        state.sidebarData.tabList.data[2].iconName = 'icon-volume-off';
      } else {
        state.disableTime = 0;
        state.sidebarData.tabList.data[2].iconName = 'icon-volume';
      }
      state.disableNotifications = !state.disableNotifications;
    },
    changeTime: (state, newTime) => state.disableTime = newTime,
  }
}