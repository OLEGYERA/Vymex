import Binder from "@/LTE/Core/Helpers/Binder";
import {numberToArray, encrypt, utf8ToArray, serialize, objectToArray} from '@/LTE/Core/Helpers/utilites';

class Processes extends Binder {
    constructor() {
        super();
    }
    async edit() {
        let data = serialize(
            utf8ToArray('Test title edited'),
            utf8ToArray('Test description edited'),
            numberToArray(31),
            numberToArray(1),
            numberToArray(31),
            numberToArray(31),
            numberToArray(31),
            utf8ToArray('2022-04-05 19:21:30'),
            numberToArray(1),
            numberToArray(2),
            objectToArray(numberToArray(7), numberToArray(8)),
            numberToArray(31),
        );
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    editRes(creator) {
        console.log('edit--res', creator)
    }

    async create() {
        let data = serialize(
            utf8ToArray('Test title'),
            utf8ToArray('Test description'),
            numberToArray(31),
            numberToArray(1),
            numberToArray(340),
            numberToArray(32),
            numberToArray(31),
            utf8ToArray('2022-04-05 18:37:30'),
            numberToArray(1),
            numberToArray(2),
            objectToArray(numberToArray(15)),
            numberToArray(31),
        );
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    createRes(creator) {
        console.log('create--res', creator)
    }

     async getUnits(unitId) {
         this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(unitId)));
     }

    getUnitsRes(units) {
       // this.$store.set('NewMessages', units);
        console.log('get--Units--Res', units)
    }

    async get(processId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(processId)));
    }

    getRes(process) {
        console.log(process, 'get--res')
        // this.$store.set('CurrentPerformers', processes);
    }

    async delete(processId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(processId)));
    }

    deleteRes(process) {
        console.log(process, 'delete--res')
        // this.$store.set('CurrentPerformers', processes);
    }

    async count() {
        let data = serialize(
            numberToArray(7),
            numberToArray(7),
            numberToArray(4),
            numberToArray(4),
        );
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    countRes(processes) {
        console.log(processes, 'count--res')
        // this.$store.set('CurrentPerformers', processes);
    }

    async getUnit() {
        let data = serialize(
            numberToArray(8),
            numberToArray(8),
        );
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    getUnitRes(unit) {
        console.log('get--Unit--Res', unit)
    }

    async getLevel() {
        let data = serialize(
            numberToArray(9),
            numberToArray(4),
            numberToArray(4),
        );
        this.$socket.emit('listener', await encrypt(...arguments[1], data));
    }

    getLevelRes(unit) {
        console.log('get--Level--Res', unit)
    }
}

export default new Processes();