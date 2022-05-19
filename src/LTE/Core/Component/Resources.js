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
    // ecies25519,
    numberToArray,
    objectToArray
} from "@/LTE/Core/Helpers/utilites";

class Resources extends Binder{
    constructor() {
        super();
    }

    async createMaterial(){
        const CreatorData = this.$store.name('Resources').get('CreatorMaterialResource');

        const WorkerID = CreatorData.workerId ? numberToArray(CreatorData.workerId) : null;

        let data = serialize(
            utf8ToArray(String(CreatorData.name)),
            utf8ToArray(String(CreatorData.description || '')),
            utf8ToArray(String(CreatorData.identifier || '')),
            WorkerID, //нужно вытягивать по пользователю его текущий воркер компании
            objectToArray([]),
            utf8ToArray(CreatorData.currency),
            numberToArray(200),
            numberToArray(CreatorData.companyId),
            objectToArray([]),
        );

        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    createMaterialRes(resource){
        console.log(resource, 'ресурс создан')
        this.$notify({text: 'Ресурс успешно создан', type: 'success', duration: 3000, speed: 500})
    }

    async createIntangible(workerId) {
        const CreatorData = this.$store.name('Resources').get('CreatorIntangibleResource');

        let data = serialize(
            utf8ToArray(String(CreatorData.name)),
            utf8ToArray(String(CreatorData.url || '')),
            utf8ToArray(String(CreatorData.login)),
            utf8ToArray(String(CreatorData.password)),
            utf8ToArray(String(CreatorData.description || '')),
            numberToArray(workerId || null),
        );

        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    createIntangibleRes(response) {
        this.$notify({text: 'Ресурс успешно создан', type: 'success', duration: 3000, speed: 500})
        console.log(response, 'createIntangibleRes')
    }

    async editIntangible(workerId) {
        const resource = this.$store.name('Resources').get('ChosenIntangibleResource');

        let data = serialize(
            utf8ToArray(String(resource.name)),
            utf8ToArray(String(resource.url || '')),
            utf8ToArray(String(resource.login)),
            utf8ToArray(String(resource.password)),
            utf8ToArray(String(resource.description || '')),
            numberToArray(workerId),
            numberToArray(resource.id),
        );

        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    editIntangibleRes(res){
        console.log(res, 'editInt')
    }

    async editMaterial() {
        const resource = this.$store.name('Resources').get('ChosenMaterialResource');

        const WorkerID = resource.workerId ? numberToArray(resource.workerId) : null;

        let data = serialize(
            utf8ToArray(String(resource.name)),
            utf8ToArray(String(resource.description || '')),
            utf8ToArray(String(resource.identifier || '')),
            WorkerID, //нужно вытягивать по пользователю его текущий воркер компании
            objectToArray([]),
            utf8ToArray(resource.currency),
            numberToArray(200),
            numberToArray(resource.id),
            objectToArray([]),
        );
        console.log(data, 'data')
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    editMaterialRes(response){
        console.log(response, 'editMaterialRes')
    }

    async getMaterialResources(workerId) {
        console.log(1)
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(workerId)));
    }

    getMaterialResourcesRes(resources){
        // console.log(resources, 'resources')
        this.$store.name('Resources').set('MaterialResources', resources);
    }

    async getStructure(companyId, resourceId){
        console.log(2) ///исправить на массив параметры
        let data = serialize(
            numberToArray(companyId),
            numberToArray(resourceId || null)
        )
        console.log(data, 'data')
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    getStructureRes(structure){
        console.log(structure, 'structure')
        this.$store.name('Resources').set('Structure', structure);
    }

    async deleteMaterial(id) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(id)));
    }

    deleteMaterialRes(){
        console.log('delete')
    }

    async moveToWarehouse(resourceId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(resourceId)));
    }

    moveToWarehouseRes(response){
        console.log(response, 'wareHouse')
    }

    async getMaterial(resourceId) {
        console.log(3)
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(resourceId)));
    }

    getMaterialRes(resource) {
        this.$store.name('Resources').set('ChosenMaterialResource', resource);
        console.log('getMaterial', resource)
    }

    async getIntangible(resourceId) {
        console.log(4)
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(resourceId)));
    }

    getIntangibleRes(resource) {
        this.$store.name('Resources').set('ChosenIntangibleResource', resource);
        console.log('getIntangible', resource)
    }

    async getWorkerIntangible(workerId) {
        console.log(5)
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(workerId)));
    }

    getWorkerIntangibleRes(resources) {
        console.log(resources, 'resourcesInt')
        this.$store.name('Resources').set('IntangibleResources', resources);
    }

    async deleteIntangible(resourceId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(resourceId)));
    }

    deleteIntangibleRes(){
        console.log('delete')
    }

    async getWorkFolder(workerId) {
        console.log(6)
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(workerId)));
    }

    getWorkFolderRes(response) {
        console.log(response, 'folders')
        this.$store.name('Resources').set('WorkFolder', response);
    }

    async createFolder(newFolder) {
        console.log(newFolder, 'create')
        let data = serialize(
            utf8ToArray(String(newFolder.name)),
            numberToArray(newFolder.workerId),
            numberToArray(newFolder.parent)
        );
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    createFolderRes(folder){
        console.log(folder, 'res')
        this.$notify({text: 'Папка успешно создана', type: 'success', duration: 3000, speed: 500})
    }

    async moveToTrashFolder(folderId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(folderId)));
    }

    moveToTrashFolderRes(response){
        this.$notify({text: 'Папка удалена', type: 'success', duration: 3000, speed: 500})
        console.log(response, 'delete folder')
    }

    async getInfo(workerId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(workerId)));
    }

    getInfoRes(info) {
        this.$store.name('Resources').set('MainInfo', info);
    }

    async editFolder(renameFolder) {
        let data = serialize(
            utf8ToArray(String(renameFolder.name)),
            numberToArray(renameFolder.folderId),
        );
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    editFolderRes(){
        this.$notify({text: 'Папка переименована', type: 'success', duration: 3000, speed: 500})
    }

    async getFolderParticipants(folderId){
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(folderId)));
    }

    getFolderParticipantsRes(participants) {
        console.log(participants, 'participants')
        this.$store.name('Resources').set('FolderParticipants', participants);
    }

    async shareFolder(i){
        let data = serialize(
            objectToArray(i[0]),
            numberToArray(i[1]),
            numberToArray(i[2]),
        );
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    shareFolderRes(response){
        console.log(response, 'response')
    }

    async getTrash(id){
        console.log(9)
        let data = serialize(
            numberToArray(id[0]),
            numberToArray(id[1] || null),
        );
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    getTrashRes(trash){
        console.log(trash, 'trash')
        this.$store.name('Resources').set('Trash', trash);
    }

    async clearWorkerTrash(workerId){
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(workerId)));
    }

    clearWorkerTrashRes(res) {
        console.log('delete all')
    }

    async getFolder(folderId){
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(folderId)));
    }

    getFolderRes(folder) {
        this.$store.name('Resources').set('ChosenFolder', folder);
    }

    async getWarehouse(companyId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(companyId)));
    }

    getWarehouseRes(warehouse) {
        console.log(warehouse, 'warehouse')
        this.$store.name('WareHouse').set('Warehouse', warehouse);
    }
}

export default new Resources();