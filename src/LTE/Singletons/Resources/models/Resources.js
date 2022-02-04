export default {
    namespaced: true,
    state: {
        statusNotifications: false,
        sidebarData: {
            tabIndex: null,
            tabList: {
                data: [
                    {name: 'volumes', iconName: 'icon-volume'},
                    {name: 'settings', iconName: 'icon-setting'},
                ],
                group: [0, 1]
            },
            animation: null
        },
        disableNotifications: false,
        disableTime: 0,
    },
    getters: {
        statusNotifications: (state) => state.statusNotifications,
        sidebarView: (state) => {
            const sidebarView = state.sidebarData;
            return {
                tabList: sidebarView.tabList,
                tabActive: sidebarView.tabIndex !== null ? sidebarView.tabList.data[sidebarView.tabIndex] : null,
                animation: sidebarView.animation
            }
        },
        tabIndex: (state) => state.sidebarData.tabIndex,
        disableNotifications: (state) => state.disableNotifications,
        disableTime: (state) => state.disableTime,
    },
    mutations: {
        showNotifications: (state) => {
            state.statusNotifications = true
            state.sidebarData.tabIndex = null
        },
        closeNotifications: (state) => state.statusNotifications = false,

        switchTab: (state, newTabIndex) => {
            if (newTabIndex !== state.sidebarData.tabIndex) {
                state.sidebarData.tabIndex = newTabIndex;
            } else {
                state.sidebarData.tabIndex = null;
            }
        },
    },
}