<template>
  <div class="company-task-ui" @click="openTask">
    <header class="company-task-header">
      <div class="task-expiration-space" :class="{expired: termStage === 0, soon: termStage === 1, normal: termStage === 2}">
        <icon-calendar-error v-if="termStage === 0"/>
        <icon-calendar v-if="termStage !== 0"/>
        {{ task.status !== 'hold' ?  finishDate : '...'}}
      </div>
      <div class="task-setting-space">
        <icon-points-horizontal @click.native.stop="modalStatus = true"/>
      </div>
      <modal-action-list :status="modalStatus" :actions="actions" @onClose="modalStatus = false" @onList="onList" @onDelete="statusDelete = true"/>

      <modal-base :status="statusDelete" @onClose="statusDelete = false" @onOk="deleteTask">
        <template #title>Удалить задачу?</template>
        <template #description>Это действие необратимо</template>
        <template #content>
          <title-caps>Задача</title-caps>
          <div class="task-name-box">
            <title-sub>{{task.title}}</title-sub>
          </div>
        </template>
        <template #button-accept>Удалить</template>
      </modal-base>
    </header>

    <main class="company-task-main">
      <title-caption>{{task.title}}</title-caption>
    </main>
    <footer class="company-task-footer">
      <div class="task-indicator attached-files"><icon-attach/><div class="task-indicator-value">{{task['files_count']}}</div></div>
      <div class="task-indicator sub-tasks" ><icon-checkbox/><div class="task-indicator-value">{{`${task.progress.finished}/${task.progress.total}`}}</div></div>
      <div class="task-indicator comments"><icon-comments/><div class="task-indicator-value">{{task['comments_count']}}</div></div>
    </footer>
  </div>
</template>

<script>
  /*eslint-disable*/
  import TitleCaption from '@Facade/Title/Caption'
  import ModalActionList from "@Facade/Modal/ActionList";
  import ModalBase from "@Facade/Modal/Base"
  import TitleSub from '@Facade/Title/Sub'
  import TitleCaps from '@Facade/Title/Caps'

  export default {
    name: 'Providers.Company.Task.Task.Ui',
    components: {
      TitleCaption, ModalActionList, ModalBase, TitleSub, TitleCaps
    },
    data: () => ({
      modalStatus: false,
      statusDelete: false,
    }),
    props: {
      task: {
        type: Object,
        required: true,
      },
      actions: {
        type: Array
      }
    },
    computed: {
      termStage() {
        if(this.task.status === 'hold') {
          return
        }
        if (this.task.isTimeless) {
          return 2
        }
        const date = new Date().toLocaleString('ru', { timeZone: 'UTC' });
        if (this.task.finish.substr(0, 10).split('-').join('') <  date.substr(0, 10).split('.').reverse().join('')) {
            return 0
        }
        if ((this.task.finish.substr(0, 10).split('-').join('') - date.substr(0, 10).split('.').reverse().join('')) > 3){
            return 2
        }

        return 1
      },
      finishDate() {
        if (this.task.isTimeless) {
          return 'Без даты'
        }
        let month = ''
        const day = this.task.finish.substr(8, 2)
        const time = this.task.finish.slice(-8, -3)
        const dataMonth = this.task.finish.substr(5, 2)
        switch (dataMonth) {
          case '01':
            month = 'янв.'
            break;
          case '02':
            month = 'февр.'
            break;
          case '03':
            month = 'марта'
            break;
          case '04':
            month = 'апр.'
            break;
          case '05':
            month = 'мая'
            break;
          case '06':
            month = 'июня'
            break;
          case '07':
            month = 'июля'
            break;
          case '08':
            month = 'авг.'
            break;
          case '09':
            month = 'сент.'
            break;
          case '10':
            month = 'окт.'
            break;
          case '11':
            month = 'ноября'
            break;
          case '12':
            month = 'дек.'
            break;

          default:
        }
        return `${day} ${month}, ${time}`
      }
    },
    methods: {
      onList(key) {
        this.$emit('onList', key, this.task.id)
      },
      deleteTask(){
        this.statusDelete = false
        this.$core.execViaComponent('Tasks', 'delete', this.task.id)
        // this.$router.push({name: 'vx.co.task'})
      },
      openTask(){
        this.$core.execViaComponent('Tasks', 'get', this.task.id);
        this.$router.push({name: 'vx.co.task.info', params: {taskID: this.task.id}})
      }
    }

  }
</script>

<style lang="scss" scoped>
  .company-task-ui{
    width: 100%;
    border-radius: 8px;
    padding: 12px;
    background-color: $grey-scale-400;
    box-sizing: border-box;
    cursor: pointer;
    .company-task-header{
      position: relative;
      display: flex;
      justify-content: space-between;
      align-content: center;
      margin-bottom: 10px;
      .task-expiration-space{
        display: inline-flex;
        padding: 3px 10px;
        color: #fff;
        font-weight: 600;
        font-size: rem(11);
        line-height: rem(16);
        border-radius: 14px;
        background-color: $grey-scale-300;
        .icon{
          height: 10px;
          margin-right: 8.5px;
          ::v-deep svg{
            width: 10px;
            height: 10px;
          }
        }

        &.expired{
          background-color: $red;
        }
        &.soon{
          background-color: $secondary-yellow;
          color: $grey-scale-400;
        }
        &.normal{
          background-color: $blue;
        }
      }
      .task-setting-space{
        color: #fff;
        .icon{
          cursor: pointer;
        }
      }
      .facade-modal-action-list::v-deep{
        right: 0;
        bottom: -4px;
        .action-list-body{
          transform: translateX(-100%);
        }
      }
      .facade-modal-base{
        .facade-title-caps{
          padding: 8px 0;
          margin-bottom: 4px;
        }
        .task-name-box{
          padding: 12px 16px;
          background-color: $grey-scale-400;
          border-radius: 8px;

          .facade-title-sub{
            max-width: 288px;
          }
        }
      }
    }
    .company-task-main{
      .facade-title-caption{
        color: #fff;
      }
      margin-bottom: 16px;
    }
    .company-task-footer{
      display: flex;
      .task-indicator{
        display: flex;
        align-items: center;
        margin-right: 16px;
        .icon{
          color: $grey-scale-200;
          margin-right: 5px;
          ::v-deep svg{
            width: 10px;
            height: 10px;
          }
        }
        .task-indicator-value{
          font-size: rem(11);
          line-height: rem(16);
          color: $grey-scale-200;
        }
        &:last-child{
          margin-right: 0;
        }
      }
    }
  }
</style>
