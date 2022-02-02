<template>
  <div class="container-dashboard-tasks">
    <widgets-header @hide-item="hideItem"
                    :title="data.title"
                    :icon="data.icon"/>
    <div class="tasks-body"
         v-for="(task, i) in data.data"
         :key="i">
      <div class="body-task">
        <img :src="require('@/assets/img/icons/bell.svg')" class="task-bell"/>
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
        <img :src="require('@/assets/img/icons/message.svg')" class="panel-alerts-icon"/>
        <div class="panel-alerts">{{ task.messages }}</div>
        <img :src="require('@/assets/img/icons/attach.svg')" class="panel-alerts-icon"/>
        <div class="panel-alerts">{{ task.files }}</div>
        <img :src="require('@/assets/img/icons/completed.svg')" class="panel-alerts-icon"/>
        <div class="panel-alerts">{{ task.completed }}</div>
      </div>
      <div class="body-border"></div>
    </div>
  </div>
</template>

<script>
import WidgetsHeader from "@Container/Vx/Main/Dashboard/facades/WidgetsHeader";

export default {
  name: "Tasks",
  methods: {
    hideItem() {
      this.$emit('hide-item', this.data.name)
    },
  },
  components: {
    WidgetsHeader
  },
  props: {
    data: Object,
  }
}
</script>

<style lang="scss" scoped>
.container-dashboard-tasks {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;

  .tasks-body {
    display: inherit;
    flex-direction: column;

    .body-task {
      display: inherit;

      .task-bell {
        height: 11px;
        width: 10px;
        margin-top: 2px;
      }

      .task-event {
        display: inherit;
        height: 16px;
        left: 16px;
        font-size: rem(12);
        line-height: rem(16);
        color: $grey-scale-200;
        margin-left: 2%;
      }
    }

    .body-title {
      font-size: rem(15);
      line-height: rem(20);
      color: #FFF;
      margin: 2% 0 2% 0;
    }

    .body-panel {
      display: inherit;
      font-size: rem(12);
      line-height: rem(16);
      color: $grey-scale-200;

      .panel-date {
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: rem(12);
        line-height: rem(16);
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
        margin-top: 3px;
      }
    }

    .body-border {
      border-bottom: $grey-scale-400 solid 1px;
      margin-top: 3%;
    }
  }
}

</style>

