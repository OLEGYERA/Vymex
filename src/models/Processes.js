import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
    state: {
        messages: [],
        processFolders: [
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
                    folders: 0,
                    processes: null,
                },
                group: null,
                trash: null
            }
        ],
        files: [],
        performers: [],
        periods: [
            {id: 1, title: 'Каждый день', isActive: true},
            {id: 2, title: 'Каждую неделю', isActive: false},
            {id: 3, title: 'Каждый месяц', isActive: false},
            {id: 4, title: 'Каждый год', isActive: false},
        ],
        subdivisions: [],
        processModel: '',
        processIndex: 0,
        countProcesses: {},
        disableStatusCount: 0,
        performerCount: 0,
        currentWorkerId: {},
        fileIds:[],
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
            // {
            //     title : 'doc.vmx',
            //     content: {
            //         size: '2,1',
            //         date: '02.03.2020'
            //     },
            //     type: null,
            //     group: null,
            //     checked: false
            // },
            // {
            //     title : 'doc.zip',
            //     content: {
            //         size: '2,1',
            //         date: '02.03.2020'
            //     },
            //     type: 'zip',
            //     group: true,
            //     checked: false
            // },
        ],
        levelsProcess: [],
        levelsStructure: [
            { level: 1, showContext: true, data: [
                {position: "1 Уровень", checkedPosition: false, checkboxType: 1,
                    numberPeople: 0, actionListStatus: false},
                ] },
            { level: 2, showContext: true, data: [
                    {position: "2 Уровень", checkedPosition: false, checkboxType: 1,
                        numberPeople: 0, actionListStatus: false},
                ] },
            { level: 3, showContext: true, data: [
                    {position: "3 Уровень", checkedPosition: false, checkboxType: 1,
                        numberPeople: 0, actionListStatus: false},
                ] },
            { level: 4, showContext: true, data: [
                    {position: "4 Уровень", checkedPosition: false, checkboxType: 1,
                        numberPeople: 0, actionListStatus: false},
                ] },
        ],
        selectedProcess: {}
    },
    getters: {
        getMessages: (state) => state.messages,
        getFolders: (state) => state.processFolders,
        getFiles: (state) => state.files,
        getProcessIndex: (state) => state.processIndex,
        getPerformers: (state) => state.performers,
        getPeriods: (state) => state.periods,
        getSubdivisions: (state) => state.subdivisions,
        getResourceFolders: (state) => state.resourceFolders,
        getNewFolder: (state) => state.newFolder,
        getFilesToUpload: (state) => state.filesToUpload,
        getLevelsProcess: (state) => state.levelsProcess,
        getDisableStatusCount: (state) => state.disableStatusCount,
        getLevelsStructure: (state) => state.levelsStructure,
        getProcessModel: (state) => state.processModel,
        getPerformerCount: (state) => state.performerCount,
        getSelectedProcess: (state) => state.selectedProcess,
        getCountProcesses: (state) => state.countProcesses,
        getCurrentWorkerId: (state) => state.currentWorkerId,
        getFileIds: (state) => state.fileIds,
    },
    mutations: {
        setChooseProcessIndex: (state, payload) => state.processIndex = payload,
        setNewMessages: (state, payload) => state.messages = payload,
        setUpdateFolders: (state, payload) => state.processFolders = payload,
        setNewFilesToUpload: (state, payload) => state.filesToUpload = payload,
        setNewFiles: (state, payload) => state.files = payload,
        setCheckDisableStatusCount: (state, payload) => state.disableStatusCount = payload,
        setCurrentPerformers: (state, payload) => state.performers = payload,
        setChooseSubdivisions: (state, payload) => state.subdivisions = payload,
        setChangeProcessModel: (state, payload) => state.processModel = payload,
        setNewPerformerCount: (state, payload) => state.performerCount = payload,
        setClickedSelectedProcess: (state, payload) => state.selectedProcess = payload,
        setNumCountProcesses: (state, payload) => state.countProcesses = payload,
        setNumCurrentWorkerId: (state, payload) => state.currentWorkerId = payload,
        setNewPeriods: (state, payload) => state.periods = payload,
        setNewFileIds: (state, payload) => state.fileIds = payload,
    },

}