import {
    encrypt,
    numberToArray
} from "@/core/SEKSproto/utilites";
import Router from '@/router'


export default class Tasks {
    constructor(storagePad, SocketClient) {
        this.router = Router
        this.storage = storagePad;
        this.SClient = SocketClient;
    }

    async getStructure(companyId) {
        const fullPack = await encrypt({
            AES256Key: this.storage.get('AesKey'),
            MAC256Key: this.storage.get('MacKey')
        }, 'Tasks', 'getStructure', numberToArray(companyId));

        this.SClient.Emit('listener', fullPack)
    }

    getStructureRes(data){
        this.storage.set('Structure', data);
    }
}