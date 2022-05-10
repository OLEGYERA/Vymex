import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
    state: {
        ticketType: '',
        sections: [
            {icon: require('@/assets/img/my/dashboard.svg'), title: 'Дашборд'},
            {icon: require('@/assets/img/my/process.svg'), title: 'Процессы'},
            {icon: require('@/assets/img/my/resource.svg'), title: 'Склад ресурсов'},
            {icon: require('@/assets/img/my/structure.svg'), title: 'Структура компании'},
            {icon: require('@/assets/img/my/share-management.svg'), title: 'Управление долей'},
            {icon: require('@/assets/img/my/team.svg'), title: 'Команда'},
            {icon: require('@/assets/img/my/task.svg'), title: 'Задачи'},
            {icon: require('@/assets/img/my/result.svg'), title: 'Результат компании'},
            {icon: require('@/assets/img/my/co-queues.svg'), title: 'Соучредители'},
            {icon: require('@/assets/img/my/control-center.svg'), title: 'Центр управления'},
            {icon: require('@/assets/img/my/calendar.svg'), title: 'Календарь'},
            {icon: require('@/assets/img/my/storage.svg'), title: 'Склад ресурсов'},
            {icon: require('@/assets/img/my/settings.svg'), title: 'Настройки'},
            {icon: require('@/assets/img/my/assumptions.svg'), title: 'Предположения'},
            {icon: require('@/assets/img/my/costs.svg'), title: 'Расходы С.Е.'},
            {icon: require('@/assets/img/my/result-c-e.svg'), title: 'Результаты С.Е.'},
        ]
    },
    getters: {
        getTicketType: (state) => state.ticketType,
        getSections: (state) => state.sections,
    },
    mutations: {
        setSelectedTicketType: (state, payload) => state.ticketType = payload,
    },
}