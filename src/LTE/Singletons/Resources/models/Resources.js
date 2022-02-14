export default {
    namespaced: true,
    state: {
        sidebarFilterStatus: false,
        sidebarAssignStatus: false,
        sidebarFolderAccessStatus: false,
    },
    getters: {
        sidebarFilterStatus: (state) => state.sidebarFilterStatus,
        sidebarAssignStatus: (state) => state.sidebarAssignStatus,
        sidebarFolderAccessStatus: (state) => state.sidebarFolderAccessStatus,
    },
    mutations: {
        showSidebar: (state) => state.sidebarFilterStatus = true,
        closeSidebar: (state) => state.sidebarFilterStatus = false,
        showSidebarAssign: (state) => state.sidebarAssignStatus = true,
        closeSidebarAssign: (state) => state.sidebarAssignStatus = false,
        showSidebarFolderAccess: (state) => state.sidebarFolderAccessStatus = true,
        closeSidebarFolderAccess: (state) => state.sidebarFolderAccessStatus = false,
    },
}