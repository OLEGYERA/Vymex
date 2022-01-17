import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    PhoneLthNumber: {
      withMask: '',
      withoutMask: ''
    },
    Telephone: null,
    ID: null,
    IsJumpReg: 0,
    Alias: {
      data: null,
      error: null,
    },
    Name: null,
    Lastname: null,
    About: null,
    Birthday: null,
    Email: null,
    Avatar: null,
    IsNewDevice: true,
    ShowEmail: false,
    ShowPhone: true,
    Password: null,
  },
  getters: {
    getPhoneLthNumber: (state) => state.PhoneLthNumber,
    getUserID: (state) => state.ID,
    getUserAvatar: (state) => {
      if(!state.Avatar){
        return state.Name.substr(0, 1) + state.Lastname.substr(0, 1)
      } else {
        return state.Avatar
      }
    },
    getUserAvatarColor: (state) => String(state.ID).substr(state.ID.length - 1, 1),
    getUserName: (state) => state.Name,
    getUserLastname: (state) => state.Lastname,
    getUserAlias: (state) => state.Alias.data,
    getUserAliasError: (state) => state.Alias.error,
    getUserPassword: (state) => state.Password,
    getUserIsJumpReg: (state) => state.IsJumpReg,
    getUserBirthday: (state) => state.Birthday,
  },
  mutations: {
    setPhoneLthNumber: (state, payload) => state.PhoneLthNumber = payload,
    setUserName: (state, payload) => state.Name = payload,
    setUserLastname: (state, payload) => state.Lastname = payload,
    setUserAlias: (state, payload) => state.Alias.data = payload,
    setUserAliasError: (state, payload) => state.Alias.error = payload,
    setUserPassword: (state, payload) => state.Password = payload,
    setUserJumpReg: (state, payload) => state.IsJumpReg = payload,
    setUserProfileData: (state, payload) => {
      state.Telephone = payload.telephone
      state.ID = payload.id
      state.IsJumpReg = payload.isJumpReg
      state.Alias = {
        data: payload.alias,
        error: null,
      }
      state.Name = payload.name
      state.Lastname = payload.lastname
      state.About = payload.about
      state.Birthday = payload.birthday
      state.Email = payload.email
      state.Avatar = payload.avatar
      state.IsNewDevice = payload.isNewDevice
      state.ShowEmail = payload.showEmail
      state.ShowPhone = payload.showPhone
    },
    setUserAvatar: (state, payload) => state.Avatar = payload,
    setUserBirthday: (state, payload) => state.Birthday = payload,
  }
}