
export default {
    namespaced: true,
    state: {
        warehouse: []
    },
    getters: {
        getWarehouse: (state) => state.warehouse
    },
    mutations: {
        setWarehouse: (state, payload) => state.warehouse = payload
    },
}