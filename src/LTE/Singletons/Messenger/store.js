import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    system: {
      status: false,
      SidebarViewData: {
        tabIndex: 0,
        tabList: {
          data: [
            {name: 'chats', iconName: 'icon-chat', routerName: null},
            {name: 'contacts', iconName: 'icon-profile', routerName: null},
            {name: 'volumes', iconName: 'icon-volume', routerName: null},
          ],
          group: [0, 1, null, 2]
        },
      }
    },
  },
  getters: {
    status: (state) => state.system.status,
    sidebarView: (state) => {
      const sidebarView = state.system.SidebarViewData;
      return {
        tabList: sidebarView.tabList,
        tabActive: sidebarView.tabList.data[sidebarView.tabIndex],
      }
    },
  },
  mutations: {
    show: (state) => state.system.status = true,
    close: (state) => state.system.status = false,

    switchTab: (state, newTabIndex) => {
      if(state.system.SidebarViewData.tabList.data[newTabIndex])
        state.system.SidebarViewData.tabIndex = newTabIndex;
    },
    setRouterName: (state, routerName) => {
      const sidebarView = state.system.SidebarViewData;
      sidebarView.tabList.data[sidebarView.tabIndex].routerName = routerName
    },
  }
}