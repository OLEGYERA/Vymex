<template>
  <div class="container-dashboard-tasks">
    <div class="tasks-header">
      <span class="header-title">Задачи С.Е.</span>
    </div>
    <div class="tasks-body"
         v-for="task in tasks"
         :key="task.id">
      <div class="body-task">
        <span class="task-event">{{ task.event }}</span>
      </div>
      <span class="body-title">{{ task.title }}</span>
      <div class="body-panel">
        <div class="panel-date" :style="{
          color: task.textColor,
          background: task.background
        }">{{ task.date }}
        </div>
        <div class="panel-alerts">{{ task.messages }}</div>
        <div class="panel-alerts">{{ task.files }}</div>
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
          textColor: "#010203"
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
          textColor: "#FFF"

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

  .tasks-header {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 8%;

    .header-title {
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      color: #FFF;
    }
  }

  .tasks-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 4%;

    .body-task {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .task-event {
        display: flex;
        justify-content: flex-start;
        height: 16px;
        left: 16px;
        font-size: 12px;
        line-height: 16px;
        color: $grey-scale-200;
      }
    }

    .body-title {
      height: auto;
      font-size: 15px;
      line-height: 20px;
      color: #FFF;
      margin: 2% 0px 2% 0px;
    }

    .body-panel {
      display: flex;
      justify-content: flex-start;
      font-size: 12px;
      line-height: 16px;
      color: $grey-scale-200;

      .panel-date {
        font-size: 12px;
        line-height: 16px;
        border-radius: 14px;
        padding: 1% 2%;
      }

      .panel-alerts {
        margin-left: 2%;
        margin-top: 1%;
      }
    }

    .body-border {
      border-bottom: $grey-scale-400 solid 1px;
      margin-top: 3%;
    }
  }
}

</style>

