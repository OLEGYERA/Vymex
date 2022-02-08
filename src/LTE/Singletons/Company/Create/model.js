export default {
  state: {
    activities: [],
    creatorStage: 0,
    creator: {
      checkedActivities: [],
      name: '', link: '', country: {},
      phone: {withMask: '', withoutMask: ''}, city: '',
      street: '', house: '', apartment: '', office: '', about: ''
    },
  },
  getters: {
    getActivities: (state) => state.activities,
    getCheckedActivities: (state) => state.creator.checkedActivities,
    getCreatorStage: (state) => state.creatorStage,
    getCreator: (state) => state.creator,
    getCreatorLogo: (state) => state.creator.name.substr(0, 1) +  state.creator.name.substr(state.creator.name.length - 1, 1),
  },
  mutations: {
    setActivities: (state, payload) => state.activities = payload,
    switchCheckedActivities: (state, payload) => {
      if(payload[0]){
        state.creator.checkedActivities.push(payload[1])
      } else {
        state.creator.checkedActivities = state.creator.checkedActivities.filter(aID => aID !== payload[1])
      }
    },
    setCreatorStage: (state, payload) => state.creatorStage = payload,
    setCreator: (state, payload) => state.creator[payload[0]] = payload[1],
    clear: (state) => {
      state.creatorStage = 0;
      state.creator = {
        checkedActivities: [],
        name: '', link: '', country: {},
        phone: {withMask: '', withoutMask: ''}, city: '',
        street: '', house: '', apartment: '', office: '', about: ''
      }
    },
  },
}