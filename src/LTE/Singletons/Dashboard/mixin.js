import {mapGetters, mapMutations} from "vuex";

export default {
    computed: {
        ...mapGetters({
            components: 'getComponents',
        })
    },
    methods: {
        ...mapMutations({
            setComponents: 'setWidgetComponents'
        }),
        createElipsis(title) {
            let ArrayCounter = title.split('')
            if (ArrayCounter.length > 35) {
                let ArrayCountSlice = ArrayCounter.slice(0, 35)
                let finalString = ''
                for (let i = 0; i < ArrayCountSlice.length; i++) {
                    finalString += ArrayCountSlice[i]
                }
                finalString += '...'
                return finalString
            } else {
                return title
            }
        }
    },
    watch: {
        components(data) {
            let observer = data.filter(el => el.title)
            if (!observer.length) {
                let newData = data.map(el => el)
                for (let i = 0; i < data.length; i++) {
                    if (newData[i].name === 'structure') {
                        newData[i] = {
                            ...newData[i],
                            title: 'Структура компании',
                            icon: require('@/assets/img/my/structure.svg')
                        }
                    }
                    // if (newData[i].name === 'calendar') {
                    //     newData[i] = {
                    //         ...newData[i],
                    //         title: 'Календарь С.Е.',
                    //         icon: require('@/assets/img/my/calendar.svg'),
                    //     }
                    // }
                    // if (newData[i].name === 'companyResults') {
                    //     newData[i] = {
                    //         ...newData[i],
                    //         title: 'Результат компании',
                    //         icon: require('@/assets/img/my/result.svg')
                    //     }
                    // }
                    // if (newData[i].name === 'expenses') {
                    //     newData[i] = {
                    //         ...newData[i],
                    //         title: 'Расходы С.Е.',
                    //         icon: require('@/assets/img/my/costs.svg')
                    //     }
                    // }
                    if (newData[i].name === 'processes') {
                        newData[i] = {
                            ...newData[i],
                            title: 'Процессы С.Е.',
                            icon: require('@/assets/img/my/process.svg')
                        }
                    }
                    if (newData[i].name === 'resources') {
                        newData[i] = {
                            ...newData[i],
                            title: 'Ресурсы С.Е.',
                            icon: require('@/assets/img/my/resource.svg')
                        }
                    }
                    if (newData[i].name === 'tasks') {
                        newData[i] = {
                            ...newData[i],
                            title: 'Задачи С.Е.',
                            icon: require('@/assets/img/my/task.svg')
                        }
                    }
                    // if (newData[i].name === 'team') {
                    //     newData[i] = {
                    //         ...newData[i],
                    //         title: 'Команда',
                    //         icon: require('@/assets/img/my/team.svg')
                    //     }
                    // }
                    if (newData[i].name === 'warehouse') {
                        newData[i] = {
                            ...newData[i],
                            title: 'Склад ресурсов',
                            icon: require('@/assets/img/my/storage.svg')
                        }
                    }
                    // if (newData[i].name === 'cofounders') {
                    //     newData[i] = {
                    //         ...newData[i],
                    //         title: 'Соучредители',
                    //         icon: require('@/assets/img/my/co-queues.svg')
                    //     }
                    // }
                }
                this.setComponents(newData.filter(el => el.title))
            }
        }
    }
}