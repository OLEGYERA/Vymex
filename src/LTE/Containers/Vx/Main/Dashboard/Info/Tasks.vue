<template>
  <div class="container-dashboard-tasks">
    <div class="tasks-header">
      <img :src="icon"/>
      <span class="header-title">Задачи С.Е.</span>
      <img :src="context"/>
    </div>
    <div class="tasks-body"
         v-for="task in tasks"
         :key="task.id">
      <div class="body-task">
        <img :src="bell" class="task-bell"/>
        <span class="task-event">{{ task.event }}</span>
      </div>
      <span class="body-title">{{ task.title }}</span>
      <div class="body-panel">
        <div class="panel-date" :style="{
          color: task.textColor,
          background: task.background
        }">
          <img :src="task.calendarIcon"/>
          <span>{{ task.date }}</span>
        </div>
        <img :src="task.messageIcon" class="panel-alerts-icon"/>
        <div class="panel-alerts">{{ task.messages }}</div>
        <img :src="task.attach" class="panel-alerts-icon"/>
        <div class="panel-alerts">{{ task.files }}</div>
        <img :src="task.completedIcon" class="panel-alerts-icon"/>
        <div class="panel-alerts">{{ task.completed }}</div>
      </div>
      <div class="body-border"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tasks",
  data() {
    return {
      icon: require('@/assets/img/my/task.svg'),
      context: require('@/assets/img/icons/context.svg'),
      bell: require('@/assets/img/icons/bell.svg'),
      tasks: [
        {
          id: new Date(),
          event: "Срок задачи был пересен",
          title: "Разработка айдентики компании и кор...",
          date: "16 янв., 14:30",
          messages: 2,
          files: 1,
          completed: "3/5",
          background: "#FACD23",
          textColor: "#010203",
          calendarIcon: require('@/assets/img/icons/calendar-black.svg'),
          messageIcon: require('@/assets/img/icons/message.svg'),
          attach: require('@/assets/img/icons/attach.svg'),
          completedIcon: require('@/assets/img/icons/completed.svg'),
        },
        {
          id: new Date(),
          event: "Добавлен новый комментарий",
          title: "Обыкновенная плановая задача",
          date: "22 янв., 14:30",
          messages: 1,
          files: 1,
          completed: "3/5",
          background: "#1890FF",
          textColor: "#FFF",
          calendarIcon: require('@/assets/img/icons/calendar-white.svg'),
          messageIcon: require('@/assets/img/icons/message.svg'),
          attach: require('@/assets/img/icons/attach.svg'),
          completedIcon: require('@/assets/img/icons/completed.svg'),
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.container-dashboard-tasks {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 224px;

  .tasks-header {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 7%;

    .header-title {
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      color: #FFF;
      margin: 1% 55% 0% 2%;
    }
  }

  .tasks-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 3%;

    .body-task {
      display: flex;
      justify-content: flex-start;

      .task-bell {
        height: 11px;
        width: 10px;
        margin-top: 2px;
      }

      .task-event {
        display: flex;
        justify-content: flex-start;
        height: 16px;
        left: 16px;
        font-size: 12px;
        line-height: 16px;
        color: $grey-scale-200;
        margin-left: 2%;
      }
    }

    .body-title {
      height: auto;
      font-size: 15px;
      line-height: 20px;
      color: #FFF;
      margin: 2% 0px 2% 0%;
    }

    .body-panel {
      display: flex;
      justify-content: flex-start;
      font-size: 12px;
      line-height: 16px;
      color: $grey-scale-200;

      .panel-date {
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 12px;
        line-height: 16px;
        border-radius: 14px;
        padding: 0.5% 1.5%;
        width: 30%;
      }

      .panel-alerts {
        margin-left: 1%;
        margin-top: 1%;
      }

      .panel-alerts-icon {
        margin-left: 2%;
      }
    }

    .body-border {
      border-bottom: $grey-scale-400 solid 1px;
      margin-top: 3%;
    }
  }
}

</style>

