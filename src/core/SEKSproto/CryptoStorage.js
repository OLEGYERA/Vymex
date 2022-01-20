import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    FP: '454asdf54sd5f6456sd4fsd540f5sd87f4',
    AT: '',
    TempAT: '',
    UT: '',
    Salt: '',
    EsClPbKey: null,
    // ES_Server_Public_Key: null,
    // ES_Shared_key: null,
    DASH_Server: null,
    DASH_Client: null,
    DASK: null,
    // AES256Key: null,
    // MAC256Key: null,
    // FGDcipher: null,
    // FGDmac: null,
    ClientBlocking: null
  },
  getters: {
    getFP: (state) => state.FP,
    getAT: (state) => state.AT,
    getTempAT: (state) => state.TempAT,
    getUT: (state) => state.UT,
    getSalt: (state) => state.Salt,
    getEsClPbKey: (state) => state.EsClPbKey,
    getDashServer: (state) => state.DASH_Server,
    getDashClient: (state) => state.DASH_Client,
    getDask: (state) => state.DASK,
    // getESSharedKey: (state) => state.ES_Shared_key,
    // getAesKey: (state) => state.AES256Key,
    // getMacKey: (state) => state.MAC256Key,
    // getFGDcipher: (state) => state.FGDcipher,
    // getFGDmac: (state) => state.FGDmac,
    getIsEqualDash: (state) => {
      if(state.DASH_Server === null || state.DASH_Client === null) return null
      return state.DASH_Server === state.DASH_Client
    },
    getClientBlocking: (state) => state.ClientBlocking,
  },
  mutations: {
    setFP: (state, payload) => state.FP = payload,
    setAT: (state, payload) => state.AT = payload,
    setTempAT: (state, payload) => state.TempAT = payload,
    setSwapAT: (state) => {
      state.AT = state.TempAT;
      state.TempAT = ''
    },
    setUT: (state, payload) => state.UT = payload,
    setSalt: (state, payload) => state.Salt = payload,
    setEsClPbKey: (state, payload) => state.EsClPbKey = payload,
    setDashServer: (state, payload) => state.DASH_Server = payload,
    setDashClient: (state, payload) => state.DASH_Client = payload,
    setDask: (state, payload) => state.DASK = payload,
    setClearDaskDash: (state) => {
      state.DASH_Client = null;
      state.DASK = null;
    },
    setClientBlocking: (state, payload) => state.ClientBlocking = payload,

  },
  actions: {

  }
}