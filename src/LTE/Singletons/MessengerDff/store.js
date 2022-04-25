import SenderScene from "./SenderScene/store";
import ToolsScene from "./ToolsScene/store";

export default {
  namespaced: true,
  state: {
    status: false,
    searchedContacts: [],
    currentContact: {},
    allContacts: [],
    activeChat: {},
    contactsAll: [
      {
        "id": 1,
        "alias": "penisdominator",
        "name": "Андрей",
        "lastname": "Вашуленко",
        "pk": "9",
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
        "pk": "9",
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
        "pk": "9",
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
        "pk": "9",
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
        "pk": "9",
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
        "pk": "9",
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
        "pk": "9",
        "avatar": null,
        "details": {
          checked: false,
        },
      }
    ],
    chosenContacts: [],
    newGroupChat: {
      title: '',
      description: '',
      avatar: null,
      users: []
    },
    chats: [
      {
        id: 1,
        title: 'Корпоративный Движ',
        type: 'group',
        name: 'Виталина',
        message: 'Ок, но ничего не понятно!',
        description: '',
        time: '04:20',
        avatar: null,
        unread: 2,
        owner: {
          "id": 6,
          "alias": "penisdominator",
          "name": "Андрей",
          "lastname": "Вашуленко",
          "pk": "9",
          "avatar": null,
          "details": null
        },
        users: [
          {
            "id": 1,
            "alias": "penisdominator",
            "name": "Андрей",
            "lastname": "Вашуленко",
            "pk": "9",
            "avatar": null,
            "details": {
              checked: false,
            }
          },
          {
            "id": 1,
            "alias": "penisdominator",
            "name": "Андрей",
            "lastname": "Вашуленко",
            "pk": "9",
            "avatar": null,
            "details": {
              checked: false,
            }
          },
          {
            "id": 1,
            "alias": "penisdominator",
            "name": "Андрей",
            "lastname": "Вашуленко",
            "pk": "9",
            "avatar": null,
            "details": {
              checked: false,
            }
          },]
      },
      {
        id: 2,
        title: 'Поездка в Чернобыль',
        type: 'group',
        name: 'Вы',
        message: 'Ребята, общий сбор в 9:30',
        description: 'olololololol',
        time: '04:20',
        avatar: null,
        unread: 3,
        owner: {
          "id": 6,
          "alias": "penisdominator",
          "name": "Андрей",
          "lastname": "Вашуленко",
          "pk": "9",
          "avatar": null,
          "details": null
        },
        users: [
          {
            "id": 1,
            "alias": "penisdominator",
            "name": "Андрей",
            "lastname": "Вашуленко",
            "pk": "9",
            "avatar": null,
            "details": {
              checked: false,
            }
          },]
      },
      {
        id: 3,
        title: 'Татьяна Булатова',
        type: 'dialog',
        message: 'Офигеть, здесь можно переписыват...',
        time: '04:20',
        avatar: null,
        status: 'sent'
      },
      {
        id: 4,
        title: 'Анастасия Куликова',
        type: 'dialog',
        message: 'Рада что все круто)',
        time: '04:20',
        avatar: null,
      },
      {
        id: 5,
        title: 'Андрей Вашуленко',
        type: 'dialog',
        message: 'Погнали пилить апку, че его просто...',
        time: '04:20',
        avatar: null,
        status: 'delivered'
      },
      {
        id: 6,
        title: 'Дмитрий Погодин',
        type: 'dialog',
        message: 'Погнали пилить апку, че его просто...',
        time: '04:20',
        avatar: null,
        status: 'sent'
      },
      {
        id: 7,
        title: 'Нина Меркулова',
        type: 'dialog',
        message: 'Норм, а что по задачам?',
        time: '04:20',
        avatar: null,
        unread: 5,
      },
      {
        id: 8,
        title: 'Дария Шевченко',
        type: 'dialog',
        message: 'Офигеть, здесь можно переписыват...',
        time: '04:20',
        avatar: null,
        status: 'sent'
      },
      {
        id: 9,
        title: 'Поездка в Чернобыль',
        type: 'group',
        name: 'Вы',
        message: 'Ребята, общий сбор в 9:30',
        description: 'oops',
        time: '04:20',
        avatar: null,
        owner: {
          "id": 6,
          "alias": "penisdominator",
          "name": "Андрей",
          "lastname": "Вашуленко",
          "pk": "9",
          "avatar": null,
          "details": null
        },
        users: [
          {
            "id": 1,
            "alias": "penisdominator",
            "name": "Андрей",
            "lastname": "Вашуленко",
            "pk": "9",
            "avatar": null,
            "details": {
              checked: false,
            }
          },
          {
            "id": 1,
            "alias": "penisdominator",
            "name": "Андрей",
            "lastname": "Вашуленко",
            "pk": "9",
            "avatar": null,
            "details": {
              checked: false,
            }
          },
          {
            "id": 1,
            "alias": "penisdominator",
            "name": "Андрей",
            "lastname": "Вашуленко",
            "pk": "9",
            "avatar": null,
            "details": {
              checked: false,
            }
          }],
        status: 'delivered'
      },
      {
        id: 10,
        title: 'Андрей Вашуленко',
        type: 'dialog',
        message: 'Погнали пилить апку, че его просто...',
        time: '04:20',
        avatar: null,
        status: 'sent'
      },
      {
        id: 11,
        title: 'Анастасия Куликова',
        type: 'dialog',
        message: 'Рада что все круто)',
        time: '04:20',
        avatar: null,
      },
      {
        id: 12,
        title: 'Андрей Вашуленко',
        type: 'dialog',
        message: 'Погнали пилить апку, че его просто...',
        time: '04:20',
        avatar: null,
        status: 'delivered'
      },
      {
        id: 13,
        title: 'Дмитрий Погодин',
        type: 'dialog',
        message: 'Погнали пилить апку, че его просто...',
        time: '04:20',
        avatar: null,
        status: 'sent'
      },
      {
        id: 14,
        title: 'Нина Меркулова',
        type: 'dialog',
        message: 'Норм, а что по задачам?',
        time: '04:20',
        avatar: null,
        unread: 5,
      },
      {
        id: 15,
        title: 'Дария Шевченко',
        type: 'dialog',
        message: 'Офигеть, здесь можно переписыват...',
        time: '04:20',
        avatar: null,
        status: 'sent'
      },
      {
        id: 16,
        title: 'Поездка в Чернобыль',
        type: 'group',
        name: 'Вы',
        message: 'Ребята, общий сбор в 9:30',
        description: '',
        time: '04:20',
        avatar: null,
        status: 'delivered',
        owner: {
          "id": 6,
          "alias": "penisdominator",
          "name": "Андрей",
          "lastname": "Вашуленко",
          "pk": "9",
          "avatar": null,
          "details": null
        },
        users: [
          {
            "id": 1,
            "alias": "penisdominator",
            "name": "Андрей",
            "lastname": "Вашуленко",
            "pk": "9",
            "avatar": null,
            "details": {
              checked: false,
            }
          },
          {
            "id": 1,
            "alias": "penisdominator",
            "name": "Андрей",
            "lastname": "Вашуленко",
            "pk": "9",
            "avatar": null,
            "details": {
              checked: false,
            }
          },
          {
            "id": 1,
            "alias": "penisdominator",
            "name": "Андрей",
            "lastname": "Вашуленко",
            "pk": "9",
            "avatar": null,
            "details": {
              checked: false,
            }
          },
          {
            "id": 1,
            "alias": "penisdominator",
            "name": "Андрей",
            "lastname": "Вашуленко",
            "pk": "9",
            "avatar": null,
            "details": {
              checked: false,
            }
          },
          {
            "id": 1,
            "alias": "penisdominator",
            "name": "Андрей",
            "lastname": "Вашуленко",
            "pk": "9",
            "avatar": null,
            "details": {
              checked: false,
            }
          }]
      },
      {
        id: 17,
        title: 'Андрей Вашуленко',
        type: 'dialog',
        message: 'Погнали пилить апку, че его просто...',
        time: '04:20',
        avatar: null,
        status: 'sent'
      },
    ],
  },
  getters: {
    status: (state) => state.status,
    getSearchedContacts: (state) => state.searchedContacts,
    getCurrentContact: (state) => state.currentContact,
    getAllContacts: (state) => state.allContacts,
    newGroupChat: (state) => state.newGroupChat,
    chats: (state) => state.chats,
    activeChat: (state) => state.activeChat,
    chosenContacts: (state) => state.chosenContacts,
    contactsAll: (state) => state.contactsAll,
  },
  mutations: {
    show: (state) => state.status = true,
    close: (state) => state.status = false,
    setSearchedContacts: (state, payload) => state.searchedContacts = payload,
    setCurrentContact: (state, payload) => state.currentContact = payload,
    setActiveChat: (state, payload) => {
      state.activeChat = state[payload[0]].find(chat => chat.id === payload[1])
    },
    chooseUser: (state, key) => {
      state.contactsAll[key].details.checked = !state.contactsAll[key].details.checked
      console.log(key, 'key', state.contactsAll[key].details.checked)
    },
    selectContacts: (state) => state.chosenContacts = state.contactsAll.filter(contact => contact.details.checked === true),

    deleteSelectedContact: (state, id) => {
      state.contactsAll.find(contact => contact.id === id).details.checked = false

      state.chosenContacts = state.contactsAll.filter(contact => contact.details.checked === true)
    },
    clearNewGroupChat: (state) => {
      state.newGroupChat = {title: '', description: '', avatar: null, users: []}
      state.contactsAll.map(contact => contact.details.checked = false)
      state.chosenContacts = []
    },
    addNewChat: (state, owner) => {
      const chat = {
        ...state.newGroupChat,
        time: new Date().toLocaleTimeString().slice(0,-3),
        users: state.chosenContacts,
        owner,
        name: 'Чат создан',
        type: 'group',
        status: 'sent'
      }
      state.chats.unshift(chat)
    },
  },
  actions: {
    create({commit, state}, owner) {
      commit('addNewChat', owner)
      commit('setActiveChat', ['chats', state.chats[0].id])
      commit('clearNewGroupChat')
    }
  },

  modules: {
    SenderScene,
    ToolsScene
  }
}