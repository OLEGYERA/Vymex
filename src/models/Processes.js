import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
    state: {
        messages: [
            {
                text: 'Длинное название процесса которое занимает 2, а то и все 3 строки. Больше - троеточие, но здесь его нет.',
                calendarIcon: true, date: '15 янв. 2021', panel: true, sortIcon: true},
            {text: 'Длинное название процесса которое занимает 2, а то и все 3 строки. Больше - троеточие, но здесь его нет.', panel: true, sortIcon: true},
            {text: 'Длинное название процесса которое занимает 2, а то и все 3 строки.', panel: false},
            {text: 'Длинное название процесса которое занимает 2, а то и все 3 строки. Больше - троеточие, но здесь его нет.',
                calendarIcon: true, date: '15 янв. 2021', panel: true, sortIcon: true},
        ],
        processIndex: 0,
        folders: [
            {
                id: 1,
                title: 'Процессы должностного лица',
                content: {
                    folders: 0,
                    processes: null
                },
                group: null,
                trash: null
            },
            {
                id: 2,
                title: 'Процессы компании',
                content: {
                    folders: 1,
                    processes: 12,
                },
                group: null,
                trash: null
            }
        ],
        files: [
            {
                title : 'Документы.jpg',
                content: {
                    size: '2,1',
                    date: '02.03.2020'
                },
                type: null,
                group: true,
            },
        ],
        performers: [
            {avatar: require('@/assets/img/icons/avatar.svg'), position: 'Должность', level: 2},
            {avatar: require('@/assets/img/icons/avatar.svg'), position: 'Должность', level: 3},
            {avatar: require('@/assets/img/icons/avatar-eight.svg'), position: 'Должность', level: 4},
        ]
    },
    getters: {
        getMessages: (state) => state.messages,
        getFolders: (state) => state.folders,
        getFiles: (state) => state.files,
        getProcessIndex: (state) => state.processIndex,
        getPerformers: (state) => state.performers,
    },
     mutations: {
         setChooseProcessIndex: (state, payload) => state.processIndex = payload,
     },

}