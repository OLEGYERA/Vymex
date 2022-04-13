
export default {
    namespaced: true,
    state: {
        sidebarFilterStatus: false,
        sidebarAssignStatus: false,
        sidebarFolderAccessStatus: false,
        materialResources: [],
        creatorMaterialResource: {
            name: '',
            description: '',
            identifier: '',
            workerId: null,
            cost: '',
            currency: 'UAH',
            companyId: null,
            fileIds: [],
            imageIds: []
        },
        creatorIntangibleResource : {
            name: '',
            url: '',
            login: '',
            password: '',
            description: '',
        },
        structure: {},
        chosenUser: {},
        chosenMaterialResource: {},
        chosenIntangibleResource: {},
        intangibleResources: [],
        workFolder: {},
        mainInfo: {},
        folderParticipants: [],
        trash: {},
        chosenFolder: {}
    },
    getters: {
        sidebarFilterStatus: (state) => state.sidebarFilterStatus,
        sidebarAssignStatus: (state) => state.sidebarAssignStatus,
        sidebarFolderAccessStatus: (state) => state.sidebarFolderAccessStatus,
        getMaterialResources: (state) => state.materialResources,
        chosenUser: (state) => state.chosenUser,

        getCreatorMaterialResource: (state) => state.creatorMaterialResource,
        getCreatorIntangibleResource: (state) => state.creatorIntangibleResource,
        getStructure: (state) => state.structure,
        getChosenMaterialResource: (state) => state.chosenMaterialResource,
        getChosenIntangibleResource: (state) => state.chosenIntangibleResource,
        getIntangibleResources: (state) => state.intangibleResources,

        getWorkFolder: (state) => state.workFolder,
        getMainInfo: (state) => state.mainInfo,
        getFolderParticipants: (state) => state.folderParticipants,
        getTrash: (state) => state.trash,
        getChosenFolder: (state) => state.chosenFolder
    },
    mutations: {
        showSidebar: (state) => state.sidebarFilterStatus = true,
        closeSidebar: (state) => state.sidebarFilterStatus = false,
        showSidebarAssign: (state) => state.sidebarAssignStatus = true,
        closeSidebarAssign: (state) => state.sidebarAssignStatus = false,
        showSidebarFolderAccess: (state) => state.sidebarFolderAccessStatus = true,
        closeSidebarFolderAccess: (state) => state.sidebarFolderAccessStatus = false,
        getConfirmedUser: (state, payload) => state.chosenUser = payload,
        // setCreatorMaterialResource: (state, payload) => state.creatorMaterialResource[payload[0]] = payload[1],
        setCreatorMaterialResource: (state, payload) => {
            console.log(payload[0], payload[1])
            state.creatorMaterialResource[payload[0]] = payload[1];
        },
        setCreatorIntangibleResource: (state, payload) => {
            console.log(payload[0], payload[1])
            state.creatorIntangibleResource[payload[0]] = payload[1];
        },
        editResource: (state, payload) => {
            console.log(payload[0], payload[1])
            state.chosenMaterialResource[payload[0]] = payload[1];
        },
        editIntangibleResource: (state, payload) => {
            console.log(payload[0], payload[1])
            state.chosenIntangibleResource[payload[0]] = payload[1];
        },
        setMaterialResources: (state, payload) => state.materialResources = payload,
        setIntangibleResources: (state, payload) => state.intangibleResources = payload,
        setChosenMaterialResource: (state, payload) => state.chosenMaterialResource = payload,
        setChosenIntangibleResource: (state, payload) => state.chosenIntangibleResource = payload,
        setStructure: (state, payload) => state.structure = payload,
        clear: (state) => {
            state.creatorMaterialResource = {
                name: '',
                description: '',
                identifier: '',
                workerId: null,
                cost: '',
                currency: 'UAH',
                companyId: null,
                fileIds: [],
                imageIds: []
            }
        },
        clearIntangible: (state) => {
           state.creatorIntangibleResource = {
                name: '',
                url: '',
                login: '',
                password: '',
                description: '',
            }
        },

        setWorkFolder: (state, payload) => state.workFolder = payload,
        setMainInfo: (state, payload) => state.mainInfo = payload,
        setFolderParticipants: (state, payload) => state.folderParticipants = payload,
        setTrash: (state, payload) => state.trash = payload,
        setChosenFolder: (state, payload) => state.chosenFolder = payload,
        clearChosenFolder: (state) => state.chosenFolder = {},
        clearChosenMaterialResource: (state) => state.chosenMaterialResource = {},
        clearChosenIntangibleResource: (state) => state.chosenIntangibleResource = {},
    },
}
