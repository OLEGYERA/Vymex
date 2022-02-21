export default {
  state: {
    searchedContacts: [],
    currentContact: []
  },
  getters: {
    getSearchedContacts: (state) => state.searchedContacts,
    getCurrentContact: (state) => state.currentContact,
  },
  mutations: {
    setSearchedContacts: (state, payload) => state.searchedContacts = payload,
    setCurrentContact: (state, payload) => state.currentContact = payload,
  }
}