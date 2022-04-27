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

class Resources extends Binder {
    constructor() {
        super();
    }

    async createMaterial() {
        const CreatorData = this.$store.name('Resources').get('CreatorMaterialResource');

        // const WorkerID = CreatorData.workerId ? numberToArray(CreatorData.workerId) : null;

        let data = serialize(
            utf8ToArray(String(CreatorData.name)),
            utf8ToArray(String(CreatorData.description || '')),
            utf8ToArray(String(CreatorData.identifier)),
            numberToArray(CreatorData.workerId), //нужно вытягивать по пользователю его текущий воркер компании
            objectToArray([]),
            utf8ToArray(CreatorData.currency),
            numberToArray(200),
            numberToArray(CreatorData.companyId),
            objectToArray([]),
        );

        //
        // this.$socket.emit('listener', await encrypt(...arguments[1], utf8ToArray('daf')));
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    createMaterialRes() {
        console.log('why not, blyat?')
    }

    async getMaterialResources(workerId) {
        console.log(workerId)
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(workerId)));
    }

    getMaterialResourcesRes(resources) {
        console.log(resources, 'resources')
        this.$store.name('Resources').set('MaterialResources', resources);
    }

    async getStructure(companyId, resourceId) {
        console.log(companyId, 'companyId')
        let data = serialize(
            numberToArray(companyId)
        )
        console.log(data, 'data')
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    getStructureRes(structure) {
        console.log(structure, 'structure')
        this.$store.name('Resources').set('Structure', structure);
    }

    async getWorkFolder(workerId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(workerId)));
    }

    getWorkFolderRes(workFiles) {
        let resourceFolders = [
            {
                id: 0,
                title: 'Рабочие файлы',
                content: {
                    folders: workFiles.folders.length,
                    files: workFiles.files.length,
                },
                group: null,
                trash: null
            }
        ]
        this.$store.set('WorkerResourceFolders', resourceFolders);
        this.$store.set('WorkersWorkFiles', workFiles);
    }

    async getFolder(folderId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(folderId)));
    }

    getFolderRes(folder) {
        let breadCrumbs = this.$store.get('BreadCrumbs')
        breadCrumbs.push(folder.name)
        this.$store.set('WhiteBreadCrumbs', breadCrumbs);
        let workersFolders = folder.childFolders && folder.childFolders.map(el => ({
            id: el.id,
            title: el.name,
            content: {
                folders: el.childFolders ? el.childFolders.length : el.childFoldersCount,
                files: el.files ? el.files.length : el.filesCount
            },
            group: el.isShared,
            trash: null
        }))
        this.$store.set('InsideWorkerResourceFolders', workersFolders);
        let workersFiles = folder.files && folder.files.map(el => ({
            id: el.id,
            fileId: el.fileId,
            label: el.label,
            extension: el.extension,
            content: {
                size: el.size,
                date: el.createdAt.split(' ')[0]
            },
            group: el.isShared,
            checked: false
        }))
        this.$store.set('NewFilesToUpload', workersFiles);
    }
}

export default new Resources();