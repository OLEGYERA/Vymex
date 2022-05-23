
export default {
    namespaced: true,
    state: {
        sidebarAppointStatus: false,
        sidebarAddStatus: false,
        structure: {},
        task: {
            title: '',
            description: '',
            assigneeId: null,
            isTimeless: false,
            start: '',
            finish: '',
            watchers: [],
            id: null,
            fileIds: []
        },
        selectedUser: {},
        checkList: [],
        selectedWatchers: [],
        tasks: {},
        observableTasks: {}
    },
    getters: {
        sidebarAppointStatus: (state) => state.sidebarAppointStatus,
        sidebarAddStatus: (state) => state.sidebarAddStatus,
        getStructure: (state) => state.structure,
        getSelectedUser: (state) => state.selectedUser,
        getChecklist: (state) => state.checkList,
        selectedWatchers: (state) => state.selectedWatchers,
        getTasks: (state) => state.tasks,
        getTask: (state) => state.task,
        getObservableTasks: (state) => state.observableTasks
    },
    mutations: {
        showAppointSidebar: (state) => state.sidebarAppointStatus = true,
        closeAppointSidebar: (state) => state.sidebarAppointStatus = false,
        showAddSidebar: (state) => state.sidebarAddStatus = true,
        closeAddSidebar: (state) => state.sidebarAddStatus = false,

        setStructure: (state, payload) => state.structure = payload,
        setTaskId: (state, payload) => state.task.id = payload,
        setTaskInfo: (state, payload) => state.task[payload[0]] = payload[1],
        setTasks: (state, tasks) => state.tasks = tasks,
        setTask: (state, task) => state.task = task,
        setObservableTasks: (state, tasks) => state.observableTasks = tasks,
        setComment: (state, comment) => state.task.comments.push(comment),

        // editTask: (state, payload) => state.task[payload[0]] = payload[1],
        findExecutor: (state) => {
            for (const level in state.structure) {
                if (state.structure[level].some(unit => unit.id === state.task.assigneeId)){
                    state.selectedUser = state.structure[level].find(unit => unit.id === state.task.assigneeId)
                }
            }
        },
        findWatchers: (state) => {
            state.selectedWatchers = []
            for (const level in state.structure) {
                state.structure[level].map(unit => {
                   state.task.watchers.map(id => {
                       if(id === unit.id) {
                           state.selectedWatchers.push(unit)
                       }
                   })
                })
            }
        },
        cleanTask: (state) => {
            state.task = {
                title: '',
                description: '',
                assigneeId: null,
                isTimeless: false,
                start: '',
                finish: '',
                watchers: [],
                id: null,
                fileIds: []
            }
            state.selectedWatchers = []
            state.checkList = []
            state.selectedUser = {}
        },
        addTaskChecklist: (state, payload) => state.checkList.push(payload),
        changeStatus: (state, payload) => state.checkList[payload[0]].items[payload[1]].status = !state.checkList[payload[0]].items[payload[1]].status,
        editChecklistStatus: (state, payload) => state.task.checklists[payload[0]].items[payload[1]].status = !state.task.checklists[payload[0]].items[payload[1]].status,
        checkAllLevel: (state, key) => {
            state.structure[`level${key}`].map(unit => {
                if (!state.task.watchers.includes(unit.id)) {
                    state.task.watchers.push(unit.id)
                }
            })
        },
        changeTaskStatus: (state, status) => state.task.status = status,
        addFile: (state, id) => state.task.fileIds.push(id),
        addObservers: (state, id) => {
            if (!state.task.watchers.includes(id)) {
                state.task.watchers.push(id)
            } else {
                state.task.watchers.splice(state.task.watchers.indexOf(id), 1)
            }
            console.log(state.task.watchers, 'state.task.watchers')
        },
        deleteAllLevel: (state, key) => {
            state.structure[`level${key}`].map(unit => {
                state.task.watchers.splice(this.task.watchers.indexOf(unit.id), 1)
            })
        },
    },
}