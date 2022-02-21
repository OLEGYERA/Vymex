import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    MsgContacts: {},
    MsgSearchContacts: {},
    MsgChooseDialog: {},
    MsgDlgs: {}
  },
  getters: {
    getMsgContacts: (state) => state.MsgContacts,
    getMsgSearchContacts: (state) => state.MsgSearchContacts,
    getMsgChooseDialog: (state) => state.MsgChooseDialog,
    getMsgDlg: (state, id) => state.MsgDlgs[id],
  },
  mutations: {
    setMsgContacts: (state, payload) => state.MsgContacts = payload,
    setMsgSearchContacts: (state, payload) => state.MsgSearchContacts = payload,
    setMsgChooseDialog: (state, payload) => state.MsgChooseDialog = payload,
    setMsgDlg: (state, payload) => state.MsgDlgs[payload.id] = payload,
  }
}