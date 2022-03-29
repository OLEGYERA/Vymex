import SenderScene from "./SenderScene/store";
import ToolsScene from "./ToolsScene/store";

export default {
  namespaced: true,
  state: {
    status: false,
    searchedContacts: [],
    currentContact: [],
    allContacts: []
  },
  getters: {
    status: (state) => state.status,
    getSearchedContacts: (state) => state.searchedContacts,
    getCurrentContact: (state) => state.currentContact,
    getAllContacts: (state) => state.allContacts
  },
  mutations: {
    show: (state) => state.status = true,
    close: (state) => state.status = false,
    setSearchedContacts: (state, payload) => state.searchedContacts = payload,
    setCurrentContact: (state, payload) => state.currentContact = payload,
  },

  modules: {
    SenderScene,
    ToolsScene
  }
}