import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
    state: {
        messages: [
            {
                text: 'Длинное название процесса которое занимает 2, а то и все 3 строки. Больше - троеточие, но здесь его нет.',
                calendarIcon: true, date: '15 янв. 2021', panel: true, sortIcon: true
            },
            {
                text: 'Длинное название процесса которое занимает 2, а то и все 3 строки. Больше - троеточие, но здесь его нет.',
                panel: true,
                sortIcon: true
            },
            {text: 'Длинное название процесса которое занимает 2, а то и все 3 строки.', panel: false},
            {
                text: 'Длинное название процесса которое занимает 2, а то и все 3 строки. Больше - троеточие, но здесь его нет.',
                calendarIcon: true, date: '15 янв. 2021', panel: true, sortIcon: true
            },
        ],
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
                title: 'Документы.jpg',
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
            {numberPeople: 8, position: 'Должность', level: 4},
        ],
        periods: [
            {title: 'Каждый день', isActive: true},
            {title: 'Каждый месяц', isActive: false},
            {title: 'Каждую неделю', isActive: false},
            {title: 'Каждый год', isActive: false},
        ],
        subdivisions: [
            {numberPeople: 4, position: 'Рекрутеры', level: 4}
        ],
        processIndex: 0,
        editMode: false,
        resourceFolders: [
            {
                id: 1,
                title: 'Ресурсы C.Е.',
                content: {
                    folders: 2,
                    files: null
                },
                group: null,
                trash: null
            },
            {
                id: 2,
                title: 'Рабочие файлы',
                content: {
                    folders: 2,
                    files: 12,
                },
                group: null,
                trash: null
            },
            {
                id: 3,
                title: 'Доступные мне',
                content: {
                    folders: 12,
                    files: 2
                },
                group: true,
                trash: null,
            }
        ],
        newFolder: [
            {
                id: 1,
                title: 'Новая папка',
                content: {
                    folders: 3,
                    files: 2
                },
                group: null,
                trash: null
            }
        ],
        filesToUpload: [
            {
                title : 'doc.vmx',
                content: {
                    size: '2,1',
                    date: '02.03.2020'
                },
                type: null,
                group: true,
                checked: false
            },
            {
                title : 'doc.vmx',
                content: {
                    size: '2,1',
                    date: '02.03.2020'
                },
                type: null,
                group: true,
                checked: true
            },
            {
                title : 'doc.vmx',
                content: {
                    size: '2,1',
                    date: '02.03.2020'
                },
                type: null,
                group: null,
                checked: true
            },
            {
                title : 'doc.zip',
                content: {
                    size: '2,1',
                    date: '02.03.2020'
                },
                type: 'zip',
                group: true,
                checked: false
            },
            {
                title : 'doc.vmx',
                content: {
                    size: '2,1',
                    date: '02.03.2020'
                },
                type: null,
                group: null,
                checked: false
            },
            {
                title : 'doc.zip',
                content: {
                    size: '2,1',
                    date: '02.03.2020'
                },
                type: 'zip',
                group: true,
                checked: false
            },
        ],

    },
    getters: {
        getMessages: (state) => state.messages,
        getFolders: (state) => state.folders,
        getFiles: (state) => state.files,
        getProcessIndex: (state) => state.processIndex,
        getPerformers: (state) => state.performers,
        getPeriods: (state) => state.periods,
        getSubdivisions: (state) => state.subdivisions,
        getEditMode: (state) => state.editMode,
        getResourceFolders: (state) => state.resourceFolders,
        getNewFolder: (state) => state.newFolder,
        getFilesToUpload: (state) => state.filesToUpload
    },
    mutations: {
        setChooseProcessIndex: (state, payload) => state.processIndex = payload,
        setNewMessages: (state, payload) => state.messages = payload,
        setIsEditMode: (state, payload) => state.editMode = payload,
        setNewFilesToUpload: (state, payload) => state.filesToUpload = payload,
        setNewFiles: (state, payload) => state.files = payload,
    },

}