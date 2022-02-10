export default {
    namespaced: true,
    state: {
        sidebarFilterStatus: false,
        sidebarAssignStatus: false,
    },
    getters: {
        sidebarFilterStatus: (state) => state.sidebarFilterStatus,
        sidebarAssignStatus: (state) => state.sidebarAssignStatus,
    },
    mutations: {
        showSidebar: (state) => state.sidebarFilterStatus = true,
        closeSidebar: (state) => state.sidebarFilterStatus = false,
        showSidebarAssign: (state) => state.sidebarAssignStatus = true,
        closeSidebarAssign: (state) => state.sidebarAssignStatus = false,
    },
}