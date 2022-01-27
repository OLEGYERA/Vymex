<template>
  <div class="dashboard">
    <structure v-bind:mens="mens"/>
    <resources/>
    <result v-bind:dates="dates"/>
    <costs/>
    <resources-c-e v-bind:files="files"/>
    <calendar v-bind:calendar="calendar"/>
    <processes v-bind:processes="processes"/>
    <tasks v-bind:tasks="tasks"/>
    <co-queues/>
    <team v-bind:people="people"/>
    <control-center/>
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
  },
  data() {
    return {
      calendar: [
        {id: new Date(), day: "Пн", date: 28, rectangles: ["#FF4D4F", "#73D13D"]},
        {id: new Date(), day: "Вт", date: 29, rectangles: []},
        {id: new Date(), day: "Ср", date: 30, rectangles: ["#FF4D4F", "#FACD23", "#73D13D", "#73D13D", "#FACD23"]},
        {id: new Date(), day: "Чт", date: 31, rectangles: ["#73D13D"]},
        {id: new Date(), day: "Пт", date: 1, rectangles: ["#FACD23", "#FACD23", "#73D13D"]},
        {id: new Date(), day: "Сб", date: 2, rectangles: []},
        {id: new Date(), day: "Вс", date: 3, rectangles: ["#73D13D"]},
      ],
      processes: [
        {
          titleProcess: "Длинное название процесса, которое ...",
          titleDate: "15 янв. 2021",
        },
        {
          titleProcess: "Длинное название процесса, которое ...",
          titleDate: "15 янв. 2021",
        },
      ],
      files: [
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
      ],
      mens: [
        {level: 1, color: "#D5F1C5", numMens: 1},
        {level: 2, color: "#FEF0BD", numMens: 2},
        {level: 3, color: "#BAE7FF", numMens: 5},
        {level: 4, color: "#F2CBF8", numMens: 22},
      ],
      tasks: [
        {
          event: "Срок задачи был пересен",
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
      people: [
        {position: "СЕО"},
        {position: "СМО"},
        {position: "Исполнитель"},
        {position: "Соучредит..."},
      ],
    }
  },

}
</script>

<style lang="scss" scoped>

.dashboard {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin: 12px auto;
  grid-gap: 24px;
  display: grid;
}
</style>