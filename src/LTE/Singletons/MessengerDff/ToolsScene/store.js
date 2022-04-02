
export default {
  namespaced: true,
  state: {
    tab: {
      activeIdx: 0,
      list: [
        {name: 'chats', iconName: 'icon-chat', routers: null},
        {name: 'contacts', iconName: 'icon-profile', routers: null},
        {name: 'volumes', iconName: 'icon-volume', routers: null},
      ],
      group: [0, 1, null, 2],
    },
    router: {
      directionNext: true
    },
    notificationsStatus: false,
    disableTime: 0,
    chosenContacts: [],
    contactsAll: [
      {
        "id": 1,
        "alias": "penisdominator",
        "name": "Андрей",
        "lastname": "Вашуленко",
        "pk": "3f7947e3d2cd027321c439f33c72cc8375cda133b3db142a7e410e6c0c220609",
        "avatar": null,
        "details": {
          checked: false,
        }
      },
      {
        "id": 2,
        "alias": "user_12",
        "name": "Testfd",
        "lastname": "sdfsd",
        "pk": "1bf0869e3e4258abbc286c0af61131d0e357db413804b85c2744b4cdb672ba28",
        "avatar": null,
        "details": {
          checked: false,
        }
      },
      {
        "id": 3,
        "alias": "penisdominator",
        "name": "Андрей",
        "lastname": "Вашуленко",
        "pk": "3f7947e3d2cd027321c439f33c72cc8375cda133b3db142a7e410e6c0c220609",
        "avatar": null,
        "details": {
          checked: false,
        }
      },
      {
        "id": 4,
        "alias": "user_12",
        "name": "Testfd",
        "lastname": "sdfsd",
        "pk": "1bf0869e3e4258abbc286c0af61131d0e357db413804b85c2744b4cdb672ba28",
        "avatar": null,
        "details": {
          checked: false,
        },
      },
      {
        "id": 5,
        "alias": "user_12",
        "name": "Testfd",
        "lastname": "sdfsd",
        "pk": "1bf0869e3e4258abbc286c0af61131d0e357db413804b85c2744b4cdb672ba28",
        "avatar": null,
        "details": {
          checked: false,
        }
      },
      {
        "id": 6,
        "alias": "penisdominator",
        "name": "Андрей",
        "lastname": "Вашуленко",
        "pk": "3f7947e3d2cd027321c439f33c72cc8375cda133b3db142a7e410e6c0c220609",
        "avatar": null,
        "details": {
          checked: false,
        }
      },
      {
        "id": 7,
        "alias": "user_12",
        "name": "Testfd",
        "lastname": "sdfsd",
        "pk": "1bf0869e3e4258abbc286c0af61131d0e357db413804b85c2744b4cdb672ba28",
        "avatar": null,
        "details": {
          checked: false,
        },
      }
    ],
    newGroupChat: {
      title: '',
      description: '',
      avatar: '',
      users: []
    }
  },
  getters: {
    getTabCollections: (state) => state.tab,
    getActiveTab: (state) => state.tab.list[state.tab.activeIdx],
    getRouterCollections: (state) => state.router,
    getNotificationsStatus: (state) => state.notificationsStatus,
    getDisableTime: (state) => state.disableTime,
    chosenContacts: (state) => state.chosenContacts,
    contactsAll: (state) => state.contactsAll,
    newGroupChat: (state) => state.newGroupChat
  },
  mutations: {
    switchActiveTab: (state, activeIdx) => {
      if(state.tab.list[activeIdx]) state.tab.activeIdx = activeIdx;
    },
    routerNext: (state, routerData) => {
      console.log(routerData)
      let activeTab = state.tab.list[state.tab.activeIdx];
      console.log(activeTab.routers)
      if(activeTab.routers === null){
        console.log(activeTab.routers)
        activeTab.routers = [routerData]
      } else {
        activeTab.routers.push(routerData)
      }

      state.router.directionNext = true;
    },
    routerBack: (state) => {
      let activeTab = state.tab.list[state.tab.activeIdx];
      if(activeTab.routers.length === 1){
        activeTab.routers = null
      } else {
        activeTab.routers.pop();
      }

      state.router.directionNext = false;
    },
    switchNotifications: (state) => {
      if (state.notificationsStatus === false) {
        state.tab.list[2].iconName = 'icon-volume-off';
      } else {
        state.disableTime = 0;
        state.tab.list[2].iconName = 'icon-volume';
      }
      state.notificationsStatus = !state.notificationsStatus;
    },
    changeTime: (state, newTime) => state.disableTime = newTime,
    chooseUser: (state, key) => {
      state.contactsAll[key].details.checked = !state.contactsAll[key].details.checked
      console.log(key, 'key', state.contactsAll[key].details.checked)
    },
    selectContacts: (state) => state.chosenContacts = [...state.contactsAll.filter(contact => contact.details.checked === true)],

    deleteSelectedContact: (state, id) => {
      state.contactsAll.find(contact => contact.id === id).details.checked = false
      state.chosenContacts = [...state.contactsAll.filter(contact => contact.details.checked === true)]
    },
    clearNewGroupChat: (state) => state.newGroupChat = { title: '', description: '', avatar: '', users: []}
  }
}