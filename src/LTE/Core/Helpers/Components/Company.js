import {
    encrypt,
    numberToArray
} from "@/core/SEKSproto/utilites";
import Router from '@/router'


export default class CompanyInfo {
    constructor(storagePad, SocketClient) {
        this.router = Router
        this.storage = storagePad;
        this.SClient = SocketClient;
    }

    async getPlainStructure(companyId) {
        const fullPack = await encrypt({
            AES256Key: this.storage.get('AesKey'),
            MAC256Key: this.storage.get('MacKey')
        }, 'Company', 'getPlainStructure', numberToArray(companyId));

        this.SClient.Emit('listener', fullPack)
    }

    async getPlainStructureRes(data){
        this.countChildren(data);
        this.storage.set('PlainStructure', data);
    }

    async getStructure(companyId) {
        const fullPack = await encrypt({
            AES256Key: this.storage.get('AesKey'),
            MAC256Key: this.storage.get('MacKey')
        }, 'Company', 'getStructure', numberToArray(companyId));

        this.SClient.Emit('listener', fullPack)
    }

    async getStructureRes(data){
        this.storage.set('Structure', data);
    }

    countChildren(data){
        console.log(data);

    }
}