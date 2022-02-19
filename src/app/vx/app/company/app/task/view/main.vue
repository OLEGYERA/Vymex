<template>
  <div class="task-main-view">
    <navigation-close @onClick="$router.push({name: 'vx.co', params: {companyID: $route.params.companyID}})"/>
    <title-base>Задачи</title-base>
    <text-base>Тут отображаються все задачи в вашей компании</text-base>
    <navigation-static-tabs :tabs="[{title: ' Мои задачи', count: 5}, {title: 'Поставленные мной'}]" :current-tab="currentNavigationCoTab" @onTab="currentNavigationCoTab = $event">
      <template #header-content>
        <div class="create-new-task" @click="$router.push({name: 'vx.co.task.create', params: {companyID: $route.params.companyID}})"><icon-add/><title-caption>Создать задачу</title-caption></div>
      </template>
      <template #tab-content>
        <div class="tab-nav-space">
          <task-column-ui title="Текущие">
            <task-ui :term-stage="0" title="Модули клиентской поддержки или еще чет ведь всякое "/>
            <task-ui :term-stage="1" title="Модули клиентской поддержки или еще чет ведь всякое "/>
            <task-ui title="Модули клиентской поддержки или еще чет ведь всякое может быть в этой жизниМодули клиентской поддержки или еще чет ведь всякое может быть в этой жизниМодули клиентской поддержки или еще чет ведь всякое может быть в этой жизни "/>
          </task-column-ui>
          <task-column-ui title="Отложено">
            <task-ui :term-stage="1" title="Модули клиентской поддержки или еще чет ведь всякое "/>
            <task-ui :term-stage="2" title="Модули клиентской поддержки или еще чет ведь всякое Модули клиентской поддержки или еще чет ведь всякое "/>
          </task-column-ui>
          <task-column-ui title="Отложено">
            <task-ui :term-stage="1" title="Модули клиентской поддержки или еще чет ведь всякое "/>
            <task-ui :term-stage="2" title="Модули клиентской поддержки или еще чет ведь всякое Модули клиентской поддержки или еще чет ведь всякое "/>
          </task-column-ui>
          <task-column-ui title="Отложено">
            <task-ui :term-stage="1" title="Модули клиентской поддержки или еще чет ведь всякое "/>
            <task-ui :term-stage="2" title="Модули клиентской поддержки или еще чет ведь всякое Модули клиентской поддержки или еще чет ведь всякое "/>
          </task-column-ui>
          <task-column-ui title="Отложено">
            <task-ui :term-stage="1" title="Модули клиентской поддержки или еще чет ведь всякое "/>
            <task-ui :term-stage="2" title="Модули клиентской поддержки или еще чет ведь всякое Модули клиентской поддержки или еще чет ведь всякое "/>
          </task-column-ui>
          <task-column-ui title="Выполнено">
          </task-column-ui>
          <task-column-create-ui/>
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


  export default {
    name: 'vx.co.task.main.view',
    components: {
      NavigationClose, TitleBase, TextBase, NavigationStaticTabs, TaskColumnUi, TaskUi, TitleCaption, TaskColumnCreateUi
    },
    data: () => ({
      currentNavigationCoTab: 0
    })
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
      padding: 16px 0;
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