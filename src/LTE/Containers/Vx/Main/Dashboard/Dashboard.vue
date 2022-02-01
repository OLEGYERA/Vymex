<template>
  <div class="dashboard">
    <component v-for="component in components"
               :is="component.name"
               :items="items"
               :data="component.data"
               :id="component.id"
               :key="component.id"
               @hide-item="hideItem"
    ></component>
    <modal :status="showModal"
           @onClose="onClose"
           @onOk="onOk"
    >
      <template #title>Скрыть виджет?</template>
      <template #description>Вернуть виджет на дашборд можно в нвстройках С.Е.</template>
      <template #button-accept>Скрыть</template>
    </modal>
  </div>
</template>

<script>
import Structure from "@/LTE/Containers/Vx/Main/Dashboard/Info/Structure";
import Resources from "@/LTE/Containers/Vx/Main/Dashboard/Info/Resources";
import Result from "@/LTE/Containers/Vx/Main/Dashboard/Info/Result";
import Costs from "@/LTE/Containers/Vx/Main/Dashboard/Info/Costs";
import ResourcesCE from "@/LTE/Containers/Vx/Main/Dashboard/Info/ResourcesCE";
import Calendar from "@/LTE/Containers/Vx/Main/Dashboard/Info/Calendar";
import Processes from "@/LTE/Containers/Vx/Main/Dashboard/Info/Processes";
import Tasks from "@/LTE/Containers/Vx/Main/Dashboard/Info/Tasks";
import CoQueues from "@/LTE/Containers/Vx/Main/Dashboard/Info/CoQueues";
import Team from "@/LTE/Containers/Vx/Main/Dashboard/Info/Team";
import ControlCenter from "@/LTE/Containers/Vx/Main/Dashboard/Info/ControlCenter";
import Modal from "@/LTE/Facades/Modal/Base";

export default {
  name: "Dashboard",
  components: {
    Structure,
    Resources,
    Result,
    Costs,
    ResourcesCE,
    Calendar,
    Processes,
    Tasks,
    CoQueues,
    Team,
    ControlCenter,
    Modal
  },
  data() {
    return {
      components: [
        {
          id: 0, name: 'Structure', data: [
            {level: 1, color: "#D5F1C5", numMens: 1},
            {level: 2, color: "#FEF0BD", numMens: 2},
            {level: 3, color: "#BAE7FF", numMens: 5},
            {level: 4, color: "#F2CBF8", numMens: 22},
          ],
        },
        {
          id: 1, name: 'Resources', data: {coastSum: "8699", resourcesSum: "23", requests: "2"},
        },
        {
          id: 3, name: 'Result', data: {
            allBill: "841 002",
            endOfMonth: "41 002",
            development: "4",
            dates: [
              {color: "#1890FF", height: "20px"},
              {color: "#1890FF", height: "34px"},
              {color: "#1890FF", height: "17px"},
              {color: "#1890FF", height: "48px"},
              {color: "#1890FF", height: "39px"},
              {color: "#1890FF", height: "16px"},
              {color: "#1890FF", height: "7px"},
              {color: "#1890FF", height: "65px"},
              {color: "#1890FF", height: "45px"},
              {color: "#1890FF", height: "9px"},
              {color: "#1890FF", height: "25px"},
              {color: "#FACD23", height: "2px"},
              {color: "#92C0EE", height: "16px"},
              {
                color: {frontColor: "#4D3139", backColor: "#92C0EE"},
                height: {frontHeight: "17px", backHeight: "34px"}
              },
              {
                color: {frontColor: "#92C0EE", backColor: "#4D3139"},
                height: {frontHeight: "6px", backHeight: "40px"}
              },
              {color: "#92C0EE", height: "17px"},
              {color: "#92C0EE", height: "27px"},
            ]
          },
        },
        {
          id: 4, name: 'Costs', data: {
            salaryFund: {UAH: "134 002", dollar: "5200"},
            averageSalary: {UAH: "35 000", dollar: "1256"},
            remainderSalary: {UAH: "8 000", dollar: "322"},
          },
        },
        {
          id: 5, name: 'ResourcesCE', data: [
            {
              file: "Новая папка(2)",
              picture: require('@/assets/img/icons/folder.svg')
            },
            {
              file: "document create element.zip",
              picture: require('@/assets/img/icons/document.svg')
            },
            {
              file: "Снимок экрана монитора 2021-10-2 ... .jpg",
              picture: require('@/assets/img/icons/screen.svg')
            },
          ],
        },
        {
          id: 6, name: 'Calendar', data: {
            events: [{title: "Встреча с инвестором", time: "09:00 - 10:00"}],
            otherEvents: "+4 события",
            calendar: [
              {day: "Пн", date: 28, rectangles: ["#FF4D4F", "#73D13D"]},
              {day: "Вт", date: 29, rectangles: []},
              {day: "Ср", date: 30, rectangles: ["#FF4D4F", "#FACD23", "#73D13D", "#73D13D", "#FACD23"]},
              {day: "Чт", date: 31, rectangles: ["#73D13D"]},
              {day: "Пт", date: 1, rectangles: ["#FACD23", "#FACD23", "#73D13D"]},
              {day: "Сб", date: 2, rectangles: []},
              {day: "Вс", date: 3, rectangles: ["#73D13D"]},
            ]
          },
        },
        {
          id: 7, name: 'Processes', data: [
            {
              titleProcess: "Длинное название процесса, которое ...",
              titleDate: "15 янв. 2021",
            },
            {
              titleProcess: "Длинное название процесса, которое ...",
              titleDate: "15 янв. 2021",
            },
          ],
        },
        {
          id: 8, name: 'Tasks', data: [
            {
              event: "Срок задачи был перенесен",
              title: "Разработка айдентики компании и кор...",
              date: "16 янв., 14:30",
              messages: 2,
              files: 1,
              completed: "3/5",
              background: "#FACD23",
              textColor: "#010203",
              calendarIcon: require('@/assets/img/icons/calendar-black.svg'),

            },
            {
              event: "Добавлен новый комментарий",
              title: "Обыкновенная плановая задача",
              date: "22 янв., 14:30",
              messages: 1,
              files: 1,
              completed: "3/5",
              background: "#1890FF",
              textColor: "#FFF",
              calendarIcon: require('@/assets/img/icons/calendar-white.svg'),
            },
          ],
        },
        {
          id: 9, name: 'CoQueues', data: {forSale: "54", activeVoting: "0", coQueues: "1"},
        },
        {
          id: 10, name: 'Team', data: {
            humans: "1",
            vacancies: "3",
            people: [
              {avatar: require('@/assets/img/icons/avatar.svg'), position: "СЕО"},
              {avatar: require('@/assets/img/icons/avatar.svg'), position: "СМО"},
              {avatar: require('@/assets/img/icons/avatar.svg'), position: "Исполнитель"},
              {avatar: require('@/assets/img/icons/avatar.svg'), position: "Соучредит..."},
            ]
          },
        },
        {
          id: 11, name: 'ControlCenter', data: {
            structuralUnits: "23",
            files: "23",
            memoryReserved: "45 GB",
            memoryAll: "50 GB",
            items: ['#D5F1C5', '#BAE7FF', '#FEF0BD', '#F2CBF8'],
          }
        }
      ],
      items: ['Выдать доступ', 'Скрыть виджет'],
      showModal: false,
      widgetId: null,
      actionListStatus: false,
    }
  },
  methods: {
    hideItem(id) {
      this.widgetId = id
      this.showModal = true
    },
    onClose() {
      this.showModal = false
    },
    onOk() {
      this.showModal = false
      this.components = this.components.filter(el => el.id !== this.widgetId)
    }
  }
}
</script>

<style lang="scss" scoped>

.dashboard {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin: 12px auto;
  grid-gap: 24px;
  display: grid;
}
.facade-modal-base {
  &::v-deep {
    .modal-base-body {
      width: 632px;
      height: 244px;
      justify-content: space-between;
    }
    .modal-base-content {
      display: none;
    }
  }
}
</style>