import {mapGetters, mapMutations} from "vuex";

export default {
    computed: {
        ...mapGetters({
            files: 'getFiles',
            processModel: 'getProcessModel',
            levels: 'getLevels',
        })
    },
    methods: {
        ...mapMutations({
            setPerformers: 'setCurrentPerformers',
            setSubdivisions: 'setChooseSubdivisions',
            setFiles: 'setNewFiles',
        })
    },
    watch: {
        selectedProcess(data) {
                if (this.processModel === 'company-processes') {
                    let lvlCount = Object.values(data.structureLevels)
                    let curLevels = this.levels.map((el, i) => ({
                        ...el,
                        id: i,
                        actionListStatus: false,
                        numberPeople: lvlCount[i],
                        position: el.data[0].position
                    }))
                    let filteredLevels = curLevels.filter(el => el.numberPeople > 0)
                    this.setPerformers(filteredLevels);
                    this.setSubdivisions(filteredLevels);
                } else {
                    let structureUnit = data.structureUnit
                    let newPerformer = [{
                        avatar: structureUnit.avatar,
                        position: structureUnit.name,
                        level: structureUnit.levelId,
                        id: structureUnit.id,
                        actionListStatus: false,
                        numberPeople: structureUnit.workerCount,
                    }]
                    this.setPerformers(newPerformer);
                    this.setSubdivisions(newPerformer);
                }
                let currentFiles = data.files.map(el => ({
                    label: el.label.split('.')[0],
                    extension: el.extension,
                    size: (el.size / 1000000).toFixed(3),
                    date: el.updatedAt.split(' ')[0]
                }))
                this.setFiles(currentFiles);
            }
        }
}