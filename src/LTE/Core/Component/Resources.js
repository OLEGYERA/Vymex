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
        console.log(CreatorData)
        let data = serialize(
            utf8ToArray(CreatorData.name),
            // utf8ToArray(CreatorData.description),
            // utf8ToArray(CreatorData.identifier),
            // numberToArray(CreatorData.workerId),
            // utf8ToArray(CreatorData.currency),
            // numberToArray(CreatorData.companyId),
            // utf8ToArray(CreatorData.cost),
            // objectToArray(CreatorData.fileIds),
            // objectToArray(CreatorData.imageIds),
        );
        console.log(...arguments[1], data)
        this.$socket.emit('listener', await encrypt(...arguments[1], utf8ToArray(CreatorData.name)));
    }

    createMaterialRes(){
        console.log('why not, blyat?')
    }

    async getMaterialResources(workerId) {
        console.log(workerId)
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(workerId)));
    }

    getMaterialResourcesRes(resources){
        console.log(resources, 'resources')
        this.$store.name('Resources').set('MaterialResources', resources);
    }

    async getStructure(companyId, resourceId){
        console.log(companyId,'companyId')
        let data = serialize(
            numberToArray(companyId)
        )
        console.log(data, 'data')
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    getStructureRes(structure){
        console.log(structure, 'structure')
        this.$store.name('Resources').set('Structure', structure);
    }
}

export default new Resources();