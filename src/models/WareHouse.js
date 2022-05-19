
export default {
    namespaced: true,
    state: {
        warehouse: [],
        creatorResource: {
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
    },
    getters: {
        getWarehouse: (state) => state.warehouse,
        getCreatorResource: (state) => state.creatorResource,

    },
    mutations: {
        setWarehouse: (state, payload) => state.warehouse = payload,
        setCreatorResource: (state, payload) => {
            console.log(payload[0], payload[1])
            state.creatorResource[payload[0]] = payload[1];
        },
        clear: (state) => {
            state.creatorResource = {
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
    },
}