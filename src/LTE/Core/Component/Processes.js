import Binder from "@/LTE/Core/Helpers/Binder";
import {numberToArray, encrypt, utf8ToArray, serialize, objectToArray} from '@/LTE/Core/Helpers/utilites';

class Processes extends Binder {
    constructor() {
        super();
    }

    async edit(data) {
        let dataCreator = serialize(
            utf8ToArray(data.title),
            utf8ToArray(data.description),
            numberToArray(data.isRegular),
            numberToArray(data.isExecutor),
            numberToArray(data.creatorId),
            numberToArray(data.unitId),
            objectToArray(data.level),
            utf8ToArray(data.repeatDate),
            numberToArray(data.alertWorker),
            numberToArray(data.repeatInterval),
            objectToArray(data.fileIds),
            numberToArray(data.id),
        );
        this.$socket.emit('listener', await encrypt(...arguments[1], dataCreator));
    }

    editRes(editor) {
       if (!editor.errors) {
            this.$store.set('ClickedSelectedProcess', editor);
            this.$notify({text: 'Изменения сохранены!', type: 'success', duration: 3000, speed: 500})
            this.$router.push({name: 'vx.process.selected.process'})
       }
    }

    async create(data) {
        let dataCreator = serialize(
            utf8ToArray(data.title),
            utf8ToArray(data.description),
            numberToArray(data.isRegular),
            numberToArray(data.isExecutor),
            numberToArray(data.creatorId),
            numberToArray(data.unitId),
            objectToArray(data.level),
            utf8ToArray(data.repeatDate),
            numberToArray(data.alertWorker),
            numberToArray(data.repeatInterval),
            objectToArray(data.fileIds),
            numberToArray(data.companyId),
        );
        this.$socket.emit('listener', await encrypt(...arguments[1], dataCreator));
    }

    createRes(creator) {
        if (!creator.errors) {
            this.$store.set('ClickedSelectedProcess', creator);
            this.$notify({text: 'Процесс успешно создан!', type: 'success', duration: 3000, speed: 500})
            this.$router.push({name: 'vx.process.selected.process'})
        }
    }

    async getUnits(unitId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(unitId)));
    }

    getUnitsRes(units) {
        this.$store.set('CurrentUnitsRes', units);
    }

    async get(processId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(processId)));
    }

    getRes(process) {
        this.$store.set('ClickedSelectedProcess', process);
    }

    async delete(processId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(processId)));
    }

    deleteRes(process) {
        console.log(process, 'delete--res')
    }

    async count(data) {
        let dataCreator = serialize(
            numberToArray(data.creatorId),
            numberToArray(data.unitId),
            numberToArray(data.levelId),
            numberToArray(data.companyId)
        );
        this.$socket.emit('listener', await encrypt(...arguments[1], dataCreator));
    }

    countRes(count) {
        this.$store.set('NumCountProcesses', count);
    }

    async getUnit(data) {
        let dataCreator = serialize(
            numberToArray(data.creatorId),
            numberToArray(data.unitId),
            numberToArray(data.search),
        );
        this.$socket.emit('listener', await encrypt(...arguments[1], dataCreator));
    }

    getUnitRes(unit) {
        this.$store.set('NewMessages', unit);
    }

    async getLevel(data) {
        let dataCreator = serialize(
            numberToArray(data.creatorId),
            numberToArray(data.levelId),
            numberToArray(data.companyId),
        );
        this.$socket.emit('listener', await encrypt(...arguments[1], dataCreator));
    }

    getLevelRes(level) {
        this.$store.set('NewMessages', level);
    }
}

export default new Processes();