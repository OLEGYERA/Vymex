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
        fileIds:[],
        resourceFolders: [],
        newFolder: [],
        filesToUpload: [],
        workFiles: [],
        breadCrumbs: [],
        selectedFolder: [],
        unitsRes: {},
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
        getDisableStatusCount: (state) => state.disableStatusCount,
        getLevelsStructure: (state) => state.levelsStructure,
        getProcessModel: (state) => state.processModel,
        getSelectedProcess: (state) => state.selectedProcess,
        getCountProcesses: (state) => state.countProcesses,
        getFileIds: (state) => state.fileIds,
        getWorkFiles: (state) => state.workFiles,
        getBreadCrumbs: (state) => state.breadCrumbs,
        getSelectedFolder: (state) => state.selectedFolder,
        getUnitsRes: (state) => state.unitsRes,
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
        setClickedSelectedProcess: (state, payload) => state.selectedProcess = payload,
        setNumCountProcesses: (state, payload) => state.countProcesses = payload,
        setNewPeriods: (state, payload) => state.periods = payload,
        setNewFileIds: (state, payload) => state.fileIds = payload,
        setWorkerResourceFolders: (state, payload) => state.resourceFolders = payload,
        setWorkerNewFolder: (state, payload) => state.newFolder = payload,
        setWorkersWorkFiles: (state, payload) => state.workFiles = payload,
        setWhiteBreadCrumbs: (state, payload) => state.breadCrumbs = payload,
        setCurrentSelectedFolder: (state, payload) => state.selectedFolder = payload,
        setCurrentUnitsRes: (state, payload) => state.unitsRes = payload,
    },

}