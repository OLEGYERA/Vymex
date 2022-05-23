/*eslint-disable*/
import Binder from "@/LTE/Core/Helpers/Binder";
import {
    // concatArrays,
    encrypt,
    utf8ToArray,
    // ed25519,
    serialize,
    // hexToArray,
    // arrayToHex,
    ecies25519,
    numberToArray,
    objectToArray
} from "@/LTE/Core/Helpers/utilites";

class Tasks extends Binder{
    constructor() {
        super();
    }

    async create(ids){
        let data = serialize(
            numberToArray(ids[0]),
            numberToArray(ids[1]),
        );

        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    createRes(response){
        this.$store.name('Tasks').set('TaskId', response.taskId);
        console.log(response.taskId, 'createRes')
    }

    async edit() {
        const CreatorData = this.$store.name('Tasks').get('Task');
        const isTimeless = !!CreatorData.isTimeless ? 1 : 0
        const start = CreatorData.start ? CreatorData.start + ' 04:20:00' : ''
        const finish = CreatorData.finish ? CreatorData.finish + ' 04:20:00' : ''

        let data = serialize(
            utf8ToArray(String(CreatorData.title)),
            utf8ToArray(String(CreatorData.description || '')),
            numberToArray(CreatorData.assigneeId),
            numberToArray(isTimeless),
            utf8ToArray(String(start)),
            utf8ToArray(String(finish)),
            objectToArray(CreatorData.watchers),
            numberToArray(CreatorData.id),
            objectToArray(CreatorData.fileIds)
        );
        console.log(data, 'data')
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    editRes(response) {
        console.log(response, 'editRes')
        this.$core.execViaComponent('Tasks', 'getUserTasks', 50);
        this.$notify({text: 'Задача создана', type: 'success', duration: 3000, speed: 500})
    }

    async getStructure(companyId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(companyId)));
    }

    getStructureRes(structure) {
        console.log(structure, 'TasksStructure')
        this.$store.name('Tasks').set('Structure', structure);
    }

    async createChecklist(task) {
        let data = serialize(
            numberToArray(Number(task.id)),
            utf8ToArray(String(task.list.title)),
            objectToArray(task.list.items),

        );
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    createChecklistRes(response){
        console.log(response, 'createChecklistRes')
    }

    async getUserTasks(workerId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(workerId)));

    }

    getUserTasksRes(tasks) {
        console.log(tasks, 'tasks')
        this.$store.name('Tasks').set('Tasks', tasks);
    }

    async get(taskId){
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(taskId)));
    }

    getRes(task) {
        console.log(task, 'getRes')
        this.$store.name('Tasks').set('Task', task);
    }

    async delete(taskId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(taskId)));
    }

    deleteRes(res) {
        this.$notify({text: 'Задача удалена!', type: 'success', duration: 3000, speed: 500})
        console.log(res, 'deleteRes')
    }

    async changeStatus(task) {
        let data = serialize(
            numberToArray(Number(task.id)),
            utf8ToArray(String(task.status)),
        );
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    changeStatusRes(resp){
        this.$core.execViaComponent('Tasks', 'getUserTasks', 50);
        console.log(resp, 'changeStatusRes')
    }

    async updateChecklist(key){
        const checklist = this.$store.name('Tasks').get('Task').checklists[key];

        let data = serialize(
            numberToArray(Number(checklist.id)),
            utf8ToArray(String(checklist.title)),
            objectToArray(checklist.items),

        );
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    updateChecklistRes(){
        console.log('updateChecklistRes')
    }

    async deleteChecklist(checklistId){
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(checklistId)));
    }

    deleteChecklistRes(){
        console.log('deleteChecklistRes')
    }

    async getObservableTasksAssignees(workerId){
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(workerId)));
    }

    getObservableTasksAssigneesRes(){

    }

    async getObservableTasksByWorker(worker) {
        // const targetWorkerId = worker.targetWorkerId ? numberToArray(worker.targetWorkerId) : null

        let data = serialize(
            numberToArray(worker.workerId),
            numberToArray(worker.targetWorkerId),
        );
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    getObservableTasksByWorkerRes(tasks) {
        this.$store.name('Tasks').set('ObservableTasks', tasks);
        console.log(tasks, 'getObservableTasksByWorkerRes')
    }

    async addComment(comment) {
        let data = serialize(
            numberToArray(Number(comment.taskId)),
            numberToArray(Number(comment.workerId)),
            numberToArray(Number(comment.userId)),
            utf8ToArray(String(comment.content)),

        );
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    addCommentRes(comment) {
        this.$store.name('Tasks').set('Comment', comment);
        console.log(comment, 'addCommentRes')
    }
}

export default new Tasks();