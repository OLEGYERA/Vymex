<template>
  <div class="task-main-view">
    <navigation-close @onClick="$router.push({name: 'vx.co', params: {companyID: $route.params.companyID}})"/>
    <title-base>Задачи</title-base>
    <text-base>Тут отображаються все задачи в вашей компании</text-base>
    <navigation-static-tabs :tabs="[{title: ' Мои задачи', count: taskCount}, {title: 'Поставленные мной', count: observableTasksCount}]" :current-tab="currentNavigationCoTab" @onTab="currentNavigationCoTab = $event">
      <template #header-content>
        <div class="create-new-task" @click="createTask"><icon-add/><title-caption>Создать задачу</title-caption></div>
      </template>
      <template #tab-content-0>
        <div class="tab-nav-space">
          <task-column-ui title="Текущие">
            <task-ui v-for="(task, taskKey) in tasks['in_progress']"
                     :task="task" :key="taskKey"
                     :actions="actionsProgress"
                     @onList="actionProgress"
                     @onDelete="deleteTask"/>
          </task-column-ui>

          <task-column-ui title="Отложено">
            <task-ui v-for="(task, taskKey) in tasks.hold"
                     :task="task"
                     :key="taskKey"
                     :actions="actionsHold"
                     @onList="actionHold"
                     @onDelete="deleteTask"/>
          </task-column-ui>

          <task-column-ui title="Выполнено">
            <task-ui v-for="(task, taskKey) in tasks.done"
                     :task="task"
                     :key="taskKey"
                     :actions="actionsDone"
                     @onList="actionDone"
                     @onDelete="deleteTask"/>
          </task-column-ui>
<!--          <task-column-create-ui/>-->
        </div>
      </template>
      <template #tab-content-1>
        <div class="tab-nav-space">
          <task-column-ui title="Текущие">
            <task-ui v-for="(task, taskKey) in observableTasks['in_progress']" :task="task" :key="taskKey"/>
          </task-column-ui>
          <task-column-ui title="Отложено">
            <task-ui v-for="(task, taskKey) in observableTasks.hold" :task="task" :key="taskKey"/>
          </task-column-ui>
          <task-column-ui title="Выполнено">
            <task-ui v-for="(task, taskKey) in observableTasks.done" :task="task" :key="taskKey"/>
          </task-column-ui>
          <!--          <task-column-create-ui/>-->
        </div>
      </template>
    </navigation-static-tabs>
  </div>
</template>

<script>
  /*eslint-disable*/

  import NavigationClose from '@Facade/Navigation/Close'
  import TitleBase from '@Facade/Title/Base'
  import TextBase from '@Facade/Text/Base'
  import NavigationStaticTabs from '@Facade/Navigation/StaticTabs'
  import TitleCaption from '@Facade/Title/Caption'
  import {TaskColumnUi, TaskColumnCreateUi, TaskUi} from '@Providers'
  import {mapGetters} from "vuex";


  export default {
    name: 'vx.co.task.main.view',
    components: {
      NavigationClose, TitleBase, TextBase, NavigationStaticTabs, TaskColumnUi, TaskUi, TitleCaption, TaskColumnCreateUi
    },
    data: () => ({
      currentNavigationCoTab: 0,
      actionsProgress: ['Редактировать', 'В отложенные', 'В выполненные'],
      actionsHold: ['Редактировать', 'В текущие', 'В выполненные'],
      actionsDone: ['В текущие', 'В отложенные'],
    }),
    created() {
      this.$core.execViaComponent('Tasks', 'getUserTasks', 50);
      this.$core.execViaComponent('Tasks', 'getObservableTasksByWorker', {workerId: 50, targetWorkerId: 51});
    },
    computed: {
      ...mapGetters({
        tasks: 'Tasks/getTasks',
        observableTasks: 'Tasks/getObservableTasks'
      }),
      taskCount(){
        return this.tasks['in_progress'].length + this.tasks.hold.length + this.tasks.done.length
      },
      observableTasksCount() {
        return this.observableTasks['in_progress'].length + this.observableTasks.hold.length + this.observableTasks.done.length
      }
    },
    methods: {
      createTask() {
        this.$router.push({name: 'vx.co.task.create', params: {companyID: this.$route.params.companyID}})
        this.$core.execViaComponent('Tasks', 'create', [50, this.$route.params.companyID]);
      },
      actionProgress(key, id) {
        if(key === 0) {
          this.$router.push({name: 'vx.co.task.edit', params: {taskID: id}})
        }
        if(key === 1) {
          this.$core.execViaComponent('Tasks', 'changeStatus', {id: id, status: 'hold'});
        }
        if(key === 2) {
          this.$core.execViaComponent('Tasks', 'changeStatus', {id: id, status: 'done'});
        }
      },
      actionHold(key, id){
        if(key === 0) {
          this.$router.push({name: 'vx.co.task.edit', params: {taskID: id}})
        }
        if(key === 1) {
          this.$core.execViaComponent('Tasks', 'changeStatus', {id: id, status: 'in_progress'});
        }
        if(key === 2) {
          this.$core.execViaComponent('Tasks', 'changeStatus', {id: id, status: 'done'});
        }

      },
      actionDone(key, id){
        if(key === 0) {
          this.$core.execViaComponent('Tasks', 'changeStatus', {id: id, status: 'in_progress'});
        }
        if(key === 1) {
          this.$core.execViaComponent('Tasks', 'changeStatus', {id: id, status: 'hold'});
        }
      },
      deleteTask({id}){
        this.$core.execViaComponent('Tasks', 'delete', id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .task-main-view{
    max-width: 90%!important;
    min-width: 796px;
    width: fit-content;
    .facade-title-base, .facade-text-base{
      margin: 0 0 12px;
    }

    .create-new-task{
      display: flex;
      align-items: center;
      padding: 8px 14px;
      background-color: $grey-scale-500;
      border-radius: 8px;
      cursor: pointer;
      transition: .2s all linear;
      .icon{
        height: 16px;
        color: #fff;
        margin-right: 10px;
      }
      .facade-title-caption{
        color: #fff;
      }
      &:hover{
        background-color: $grey-scale-400;
      }
    }

    .tab-nav-space{
      width: 100%;
      padding: 16px 0 140px;
      display: flex;
      overflow-x: scroll;
      .company-task-ui{
        margin-bottom: 8px;

        &:last-child{
          margin-bottom: 0;
        }
      }
    }
  }
</style>