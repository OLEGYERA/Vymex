
export default {
    namespaced: true,
    state: {
        sidebarAppointStatus: false,
        sidebarAddStatus: false,
        structure: {},
        newTask: {
            title: '',
            description: '',
            assigneeId: null,
            isTimeless: false,
            start: '',
            finish: '',
            watchers: [],
            taskId: null,
            fileIds: []
        },
        selectedUser: {},
        checkList: [],
        selectedWatchers: [],
        tasks: {},
        task: {},
        observableTasks: {}
    },
    getters: {
        sidebarAppointStatus: (state) => state.sidebarAppointStatus,
        sidebarAddStatus: (state) => state.sidebarAddStatus,
        getStructure: (state) => state.structure,
        getNewTask: (state) => state.newTask,
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
        setTaskId: (state, payload) => state.newTask.taskId = payload,
        setNewTask: (state, payload) => state.newTask[payload[0]] = payload[1],
        setTasks: (state, tasks) => state.tasks = tasks,
        setTask: (state, task) => state.task = task,
        setObservableTasks: (state, tasks) => state.observableTasks = tasks,
        setComment: (state, comment) => state.task.comments.push(comment),

        editTask: (state, payload) => state.task[payload[0]] = payload[1],

        findExecutor: (state) => {
            for (const level in state.structure) {
                if (state.structure[level].some(unit => unit.id === state.newTask.assigneeId)){
                    state.selectedUser = state.structure[level].find(unit => unit.id === state.newTask.assigneeId)
                }
            }
        },
        findWatchers: (state) => {
            state.selectedWatchers = []
            for (const level in state.structure) {
                state.structure[level].map(unit => {
                   state.newTask.watchers.map(id => {
                       if(id === unit.id) {
                           state.selectedWatchers.push(unit)
                       }
                   })
                })
            }
        },
        cleanNewTask: (state) => {
            state.newTask = {
                title: '',
                description: '',
                assigneeId: null,
                isTimeless: false,
                start: '',
                finish: '',
                watchers: [],
                taskId: null,
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
                if (!state.newTask.watchers.includes(unit.id)) {
                    state.newTask.watchers.push(unit.id)
                }
            })
        },
        changeTaskStatus: (state, status) => state.task.status = status,
        addFile: (state, id) => state.newTask.fileIds.push(id),
        addObservers: (state, id) => {
            if (!state.newTask.watchers.includes(id)) {
                state.newTask.watchers.push(id)
            } else {
                state.newTask.watchers.splice(state.newTask.watchers.indexOf(id), 1)
            }
            console.log(state.newTask.watchers, 'state.newTask.watchers')
        },
        deleteAllLevel: (state, key) => {
            state.structure[`level${key}`].map(unit => {
                state.newTask.watchers.splice(this.newTask.watchers.indexOf(unit.id), 1)
            })
        },
    },
}