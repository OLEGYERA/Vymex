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
    ES_Client_Keys: null,
    ES_Server_Public_Key: null,
    ES_Shared_key: null,
    DASH_Server: null,
    DASH_Client: null,
    DASK: null,
    AES256Key: null,
    MAC256Key: null,
    FGDcipher: null,
    FGDmac: null,
    ClientBlocking: null
  },
  getters: {
    getFP: (state) => state.FP,
    getAT: (state) => state.AT,
    getTempAT: (state) => state.TempAT,
    getUT: (state) => state.UT,
    getSalt: (state) => state.Salt,
    getESClientPublicKey: (state) => state.ES_Client_Keys.public,
    getESClientPrivateKey: (state) => state.ES_Client_Keys.private,
    getESSharedKey: (state) => state.ES_Shared_key,
    getDashServer: (state) => state.DASH_Server,
    getDashClient: (state) => state.DASH_Client,
    getDask: (state) => state.DASK,
    getAesKey: (state) => state.AES256Key,
    getMacKey: (state) => state.MAC256Key,
    getFGDcipher: (state) => state.FGDcipher,
    getFGDmac: (state) => state.FGDmac,
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
    setESClientKeys: (state, payload) => state.ES_Client_Keys = payload,
    setESServerPublicKey: (state, payload) => state.ES_Server_Public_Key = payload,
    setESShareKey: (state, payload) => state.ES_Shared_key = payload,
    setDashServer: (state, payload) => state.DASH_Server = payload,
    setDashClient: (state, payload) => state.DASH_Client = payload,
    setDask: (state, payload) => state.DASK = payload,
    setAesMacKeys: (state, payload) => {
      state.AES256Key = payload[0];
      state.MAC256Key = payload[1];
    },
    setFGDcipher: (state, payload) => state.FGDcipher = payload,
    setFGDmac: (state, payload) => state.FGDmac = payload,
    setClearDaskDash: (state) => {
      state.DASH_Client = null;
      state.DASK = null;
    },
    setClientBlocking: (state, payload) => state.ClientBlocking = payload,

  },
  actions: {

  }
}