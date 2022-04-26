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
        this.$store.set('ClickedSelectedProcess', editor);
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
        this.$store.set('ClickedSelectedProcess', creator);
    }

    async getUnits(unitId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(unitId)));
    }

    getUnitsRes(units) {
        let currentProcessStatus = this.$store.name('Company').get('SelectedCompany');
        let currentProcessModel = this.$store.get('ProcessModel');
        let currentLevel = currentProcessStatus.unitLevel
        let arrayLevels = Object.values(units)
        if (currentProcessModel === 'official-processes') {
            let ceo = {}
            let currentUnits = []
            if (currentLevel === 1) {
                ceo = {
                    level: 1, showContext: true, data: [{
                        avatar: units.self.avatar,
                        numberPeople: 1,
                        id: units.self.id,
                        name: units.self.unitName,
                        checkedPosition: false,
                        checkboxType: 2,
                        actionListStatus: false
                    }]
                }
                arrayLevels = arrayLevels.slice(1, 4)
                currentUnits = arrayLevels.map((level, index) => ({
                    level: index + 2, showContext: level.length && true, data: level.map(el => ({
                        numberPeople: el.workersCount,
                        id: el.id,
                        position: el.unitName,
                        checkedPosition: false,
                        checkboxType: 2,
                        actionListStatus: false
                    }))
                }))
                currentUnits.unshift(ceo)
            } else {
                currentUnits = arrayLevels.map((lvl, i) => currentLevel < i + 1 ? ({
                    level: i + 1, showContext: lvl.length && true, data: lvl.map(el => ({
                        numberPeople: el.workersCount,
                        id: el.id,
                        position: el.unitName,
                        checkedPosition: false,
                        checkboxType: 2,
                        actionListStatus: false
                    }))
                }) : lvl = {level: i + 1, data: []})
            }
            this.$store.set('WidgetLevels', currentUnits);
        } else {
            if (currentLevel === 1 || currentLevel === 2) {
                let levels = this.$store.get('LevelsStructure');
                let curLevels = levels.map((el, i) => ({
                    ...el, data: [{
                        ...el.data[0],
                        numberPeople: arrayLevels[i].length && currentLevel < i + 1
                            ? arrayLevels[i].length
                            : 0
                    }]
                }))
                this.$store.set('WidgetLevels', curLevels);
            } else {
                this.$store.set('WidgetLevels', []);
            }
        }
    }

    async get(processId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(processId)));
    }

    getRes(process) {
        this.$store.set('ClickedSelectedProcess', process);
        let currentProcessModel = this.$store.get('ProcessModel');
        let levels = this.$store.get('Levels')
        if (currentProcessModel === 'company-processes') {
            let lvlCount = Object.values(process.structureLevels)
            let curLevels = levels.map((el, i) => ({
                ...el,
                id: i,
                numberPeople: lvlCount[i],
                position: el.data[0].position
            }))
            let filteredLevels = curLevels.filter(el => el.numberPeople > 0)
            this.$store.set('CurrentPerformers', filteredLevels);
            this.$store.set('ChooseSubdivisions', filteredLevels);
        } else {
            let structureUnit = process.structureUnit
            let newPerformer = [{
                avatar: structureUnit.avatar,
                position: structureUnit.name,
                level: structureUnit.levelId,
                id: structureUnit.id,
                actionListStatus: false,
                numberPeople: structureUnit.workerCount,
            }]
            this.$store.set('CurrentPerformers', newPerformer);
            this.$store.set('ChooseSubdivisions', newPerformer);
        }
        let currentFiles = process.files.map(el => ({
            label: el.label.split('.')[0],
            extension: el.extension,
            size: (el.size / 1000000).toFixed(3),
            date: el.updatedAt.split(' ')[0]
        }))
        this.$store.set('NewFiles', currentFiles);
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
        let folders = this.$store.get('Folders');
        let updatedFolders = folders.map(el => el.id === 1
            ? ({...el, content: {folders: 1, processes: count.unit}})
            : ({...el, content: {folders: 1, processes: count.company}}))
        this.$store.set('UpdateFolders', updatedFolders);
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