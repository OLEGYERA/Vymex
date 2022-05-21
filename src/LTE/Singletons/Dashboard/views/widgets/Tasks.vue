<template>
  <div :class="[hideWidget === 'tasks'
  ? (index + 1) % 2 === 0
  ? 'hide-right-widget'
  : 'hide-left-widget' : '',
  'container-dashboard-tasks']">
    <widgets-header @show-context="showContext"
                    :title="data.title"
                    :icon="data.icon"/>
    <div class="tasks-body"
         v-for="(task, i) in data.widget"
         :key="i">
      <div class="body-task">
        <img :src="require('@/assets/img/icons/bell.svg')" class="task-bell"/>
        <span class="task-event">{{ task.event }}</span>
      </div>
      <span class="body-title">{{ createElipsis(task.title) }}</span>
      <div class="body-panel">
        <div class="panel-date"
             :style="{color: widgetWarningColor(task.finish) && widgetWarningColor(task.finish).color,
             background: widgetWarningColor(task.finish) && widgetWarningColor(task.finish).background}">
          <icon-calendar v-if="task.finish" class="panel-date-icons"/>
          <span>{{ task.finish }}</span>
        </div>
        <div class="panel-notification">
          <img :src="require('@/assets/img/icons/message.svg')" class="panel-alerts-icon"/>
          <div class="panel-alerts">{{ task.commentsCount }}</div>
          <img :src="require('@/assets/img/icons/attach.svg')" class="panel-alerts-icon"/>
          <div class="panel-alerts">{{ task.filesCount }}</div>
          <img :src="require('@/assets/img/icons/completed.svg')" class="panel-alerts-icon"/>
          <div class="panel-alerts">{{ task.progress.finished }}/{{ task.progress.total }}</div>
        </div>
      </div>
      <div class="body-border"></div>
    </div>
  </div>
</template>

<script>
import WidgetsHeader from "../../facades/WidgetsHeader";
import {mapGetters} from "vuex";
import DashboardMixin from "@/LTE/Singletons/Dashboard/mixin";

export default {
  name: "tasks",
  mixins: [DashboardMixin],
  methods: {
    showContext(value) {
      this.$emit('show-context', value, this.data.name)
    },
    widgetWarningColor(data) {
      if (data) {
        let dateFinish = new Date(data)
        let currentDate = new Date()
        let period = dateFinish.getTime() - currentDate.getTime()
        if (period > 0) {
          if (period > 86400000) {
            return {color: '#FFF', background: '#1890FF'}
          } else {
            return {color: '#010203', background: '#FACD23'}
          }
        } else {
          return {color: '#010203', background: '#FF0000'}
        }
      } else {
        return null
      }
    }
  },
  components: {
    WidgetsHeader
  },
  props: {
    data: Object,
    index: Number
  },
  computed: {
    ...mapGetters({
      hideWidget: 'getHideWidget'
    }),
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/animations.module';

.container-dashboard-tasks {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 224px;
  cursor: pointer;

  .widgets-header {
    margin-bottom: 17px;
  }

  .tasks-body {
    display: inherit;
    flex-direction: column;
    margin-top: 12px;

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
      align-items: center;
      font-size: rem(12);
      line-height: rem(16);
      color: $grey-scale-200;
      width: 100%;

      .panel-date {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: rem(12);
        line-height: rem(16);
        border-radius: 14px;
        width: 43%;
      }

      .panel-notification {
        display: flex;
        align-items: center;
        width: 40%;

        .panel-alerts {
          margin-left: 5px;
        }

        .panel-alerts-icon {
          margin-left: 8px;
          width: 11px;
          height: 11px;
        }
      }
    }

    .body-border {
      border-bottom: $grey-scale-400 solid 1px;
      margin-top: 3%;
    }
  }
}

.panel-date-icons {
  height: 12px;
  width: 12px;
  display: flex;
  margin: 0 6px;
  justify-content: center;
  align-items: center;
}
</style>

