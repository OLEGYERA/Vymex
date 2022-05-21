import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
    state: {
         components: [
        //     {
        //         name: 'Structure',
        //         icon: require('@/assets/img/my/structure.svg'),
        //         title: 'Структура компании',
        //         data: [
        //             {level: 1, color: "#D5F1C5", numMens: 1},
        //             {level: 2, color: "#FEF0BD", numMens: 2},
        //             {level: 3, color: "#BAE7FF", numMens: 5},
        //             {level: 4, color: "#F2CBF8", numMens: 22},
        //         ],
        //     },
        //     {
        //         name: 'Resources',
        //         icon: require('@/assets/img/my/storage.svg'),
        //         title: 'Склад ресурсов',
        //         data: {coastSum: "8699", resourcesSum: "23", requests: "2"},
        //     },
        //     {
        //         name: 'Result',
        //         icon: require('@/assets/img/my/result.svg'),
        //         title: 'Результат компании',
        //         data: {
        //             allBill: "841 002",
        //             endOfMonth: "41 002",
        //             development: "4",
        //             dates: [
        //                 {color: "#1890FF", height: "20px"},
        //                 {color: "#1890FF", height: "34px"},
        //                 {color: "#1890FF", height: "17px"},
        //                 {color: "#1890FF", height: "48px"},
        //                 {color: "#1890FF", height: "39px"},
        //                 {color: "#1890FF", height: "16px"},
        //                 {color: "#1890FF", height: "7px"},
        //                 {color: "#1890FF", height: "65px"},
        //                 {color: "#1890FF", height: "45px"},
        //                 {color: "#1890FF", height: "9px"},
        //                 {color: "#1890FF", height: "25px"},
        //                 {color: "#FACD23", height: "2px"},
        //                 {color: "#92C0EE", height: "16px"},
        //                 {
        //                     color: {frontColor: "#4D3139", backColor: "#92C0EE"},
        //                     height: {frontHeight: "17px", backHeight: "34px"}
        //                 },
        //                 {
        //                     color: {frontColor: "#92C0EE", backColor: "#4D3139"},
        //                     height: {frontHeight: "6px", backHeight: "40px"}
        //                 },
        //                 {color: "#92C0EE", height: "17px"},
        //                 {color: "#92C0EE", height: "27px"},
        //             ]
        //         },
        //     },
        //     {
        //         name: 'Costs',
        //         icon: require('@/assets/img/my/costs.svg'),
        //         title: 'Расходы С.Е.',
        //         data: {
        //             salaryFund: {UAH: "134 002", dollar: "5200"},
        //             averageSalary: {UAH: "35 000", dollar: "1256"},
        //             remainderSalary: {UAH: "8 000", dollar: "322"},
        //         },
        //     },
        //     {
        //         name: 'ResourcesCE',
        //         icon: require('@/assets/img/my/resource.svg'),
        //         title: 'Ресурсы С.Е.',
        //         data: [
        //             {
        //                 file: "Новая папка(2)",
        //                 picture: require('@/assets/img/icons/folder.svg')
        //             },
        //             {
        //                 file: "document create element.zip",
        //                 picture: require('@/assets/img/icons/document.svg')
        //             },
        //             {
        //                 file: "Снимок экрана монитора 2021-10-2 ... .jpg",
        //                 picture: require('@/assets/img/icons/screen.svg')
        //             },
        //         ],
        //     },
        //     {
        //         name: 'Calendar',
        //         icon: require('@/assets/img/my/calendar.svg'),
        //         title: 'Календарь С.Е.',
        //         data: {
        //             events: [{title: "Встреча с инвестором", time: "09:00 - 10:00"}],
        //             otherEvents: "+4 события",
        //             calendar: [
        //                 {day: "Пн", date: 28, rectangles: ["#FF4D4F", "#73D13D"]},
        //                 {day: "Вт", date: 29, rectangles: []},
        //                 {day: "Ср", date: 30, rectangles: ["#FF4D4F", "#FACD23", "#73D13D", "#73D13D", "#FACD23"]},
        //                 {day: "Чт", date: 31, rectangles: ["#73D13D"]},
        //                 {day: "Пт", date: 1, rectangles: ["#FACD23", "#FACD23", "#73D13D"]},
        //                 {day: "Сб", date: 2, rectangles: []},
        //                 {day: "Вс", date: 3, rectangles: ["#73D13D"]},
        //             ]
        //         },
        //     },
        //     {
        //         name: 'Processes',
        //         icon: require('@/assets/img/my/process.svg'),
        //         title: 'Процессы С.Е.',
        //         data: [
        //             {
        //                 titleProcess: "Длинное название процесса, которое ...",
        //                 titleDate: "15 янв. 2021",
        //             },
        //             {
        //                 titleProcess: "Длинное название процесса, которое ...",
        //                 titleDate: "15 янв. 2021",
        //             },
        //         ],
        //     },
        //     {
        //         name: 'Tasks',
        //         icon: require('@/assets/img/my/task.svg'),
        //         title: 'Задачи С.Е.',
        //         data: [
        //             {
        //                 event: "Срок задачи был перенесен",
        //                 title: "Разработка айдентики компании и кор...",
        //                 date: "16 янв., 14:30",
        //                 messages: 2,
        //                 files: 1,
        //                 completed: "3/5",
        //                 background: "#FACD23",
        //                 textColor: "#010203",
        //                 calendarIcon: require('@/assets/img/icons/calendar-black.svg'),
        //
        //             },
        //             {
        //                 event: "Добавлен новый комментарий",
        //                 title: "Обыкновенная плановая задача",
        //                 date: "22 янв., 14:30",
        //                 messages: 1,
        //                 files: 1,
        //                 completed: "3/5",
        //                 background: "#1890FF",
        //                 textColor: "#FFF",
        //                 calendarIcon: require('@/assets/img/icons/calendar-white.svg'),
        //             },
        //         ],
        //     },
        //     {
        //         name: 'CoQueues',
        //         icon: require('@/assets/img/my/co-queues.svg'),
        //         title: 'Соучредители',
        //         data: {forSale: "54", activeVoting: "0", coQueues: "1"},
        //     },
        //     {
        //         name: 'Team',
        //         icon: require('@/assets/img/my/team.svg'),
        //         title: 'Команда',
        //         data: {
        //             humans: "1",
        //             vacancies: "3",
        //             people: [
        //                 {avatar: require('@/assets/img/icons/avatar.svg'), position: "СЕО"},
        //                 {avatar: require('@/assets/img/icons/avatar.svg'), position: "СМО"},
        //                 {avatar: require('@/assets/img/icons/avatar.svg'), position: "Исполнитель"},
        //                 {avatar: require('@/assets/img/icons/avatar.svg'), position: "Соучредит..."},
        //             ]
        //         },
        //     },
        //     {
        //         name: 'ControlCenter',
        //         icon: require('@/assets/img/my/control-center.svg'),
        //         title: "Центр управления",
        //         data: {
        //             structuralUnits: "23",
        //             files: "23",
        //             memoryReserved: "45 GB",
        //             memoryAll: "50 GB",
        //             items: ['#D5F1C5', '#FEF0BD', '#BAE7FF', '#F2CBF8'],
        //         }
        //     }
         ],
        componentsDefault: [],
        componentsName: '',
        modalData: {
            men: 'Graphic Designer',
            position: 'Все должности',
            level: 4,
            levelText: '4 уровень'
        },
        levels: [
            {
                level: 1, showContext: true, checkedLevel: false, showCheckbox: true, data: [
                    {
                        avatar: require('@/assets/img/icons/avatar.svg'),
                        name: "Александр Ким", position: "Должность",
                        checkedPosition: true
                    },
                ]
            },
            {
                level: 2, showContext: false, checkedLevel: false, showCheckbox: true, data: [
                    {
                        avatar: require('@/assets/img/icons/avatar.svg'),
                        name: "Александр Ким", position: "Должность",
                        checkedPosition: true
                    },
                ]
            },
            {
                level: 3, showContext: false, checkedLevel: false, showCheckbox: true, data: [
                    {
                        avatar: require('@/assets/img/icons/avatar.svg'),
                        name: "Александр Ким", position: "Должность",
                        checkedPosition: true
                    },
                ]
            },
            {
                level: 4, showContext: false, checkedLevel: false, showCheckbox: true, data: [
                    {
                        avatar: require('@/assets/img/icons/avatar.svg'),
                        name: "Александр Ким", position: "Должность",
                        checkedPosition: true
                    },
                    {
                        avatar: require('@/assets/img/icons/avatar.svg'),
                        name: "Александр Ким", position: "Должность",
                        checkedPosition: true
                    }, {
                        avatar: require('@/assets/img/icons/avatar.svg'),
                        name: "Александр Ким", position: "Должность",
                        checkedPosition: true
                    }, {
                        avatar: require('@/assets/img/icons/avatar.svg'),
                        name: "Александр Ким", position: "Должность",
                        checkedPosition: true
                    }, {
                        avatar: require('@/assets/img/icons/avatar.svg'),
                        name: "Александр Ким", position: "Должность",
                        checkedPosition: true
                    },
                ]
            },
        ],
        hideWidget: '',
        isShowOnboarding: false
    },
    getters: {
        getComponents: (state) => state.components,
        getComponentsDefault: (state) => state.componentsDefault,
        getComponentsName: (state) => state.componentsName,
        getModalData: (state) => state.modalData,
        getLevels: (state) => state.levels,
        getHideWidget: (state) => state.hideWidget,
        getIsShowOnboarding: (state) => state.isShowOnboarding,
    },
    mutations: {
        setWidgetComponents: (state, payload) => state.components = payload,
        setWidgetComponentsDefault: (state, payload) => state.componentsDefault = payload,
        setWidgetComponentsName: (state, payload) => state.componentsName = payload,
        setWidgetModalData: (state, payload) => state.modalData = payload,
        setWidgetLevels: (state, payload) => state.levels = payload,
        setWidgetHideWidget: (state, payload) => state.hideWidget = payload,
        setWidgetIsShowOnboarding: (state, payload) => state.isShowOnboarding = payload,
    },

}