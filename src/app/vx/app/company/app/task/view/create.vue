<template>
  <div class="task-create-view">
    <navigation-comeback @onClick="$router.push({name: 'vx.co.task', params: {companyID: $route.params.companyID}})"/>
    <title-base class="task-create-title">Создать задачу</title-base>

    <div class="task-create-space">
      <input-base placeholder="Название задачи" labeled/>
      <input-area :model="''" :bound="1000" placeholder="Описание" labeled />
    </div>





  </div>
</template>

<script>
  /*eslint-disable*/
  import NavigationComeback from '@Facade/Navigation/Comeback'
  import TitleBase from '@Facade/Title/Base'
  import InputBase from '@Facade/Input/Base'
  import InputArea from '@Facade/Input/Area'


  export default {
    name: 'vx.co.task.create.view',
    components: {
      NavigationComeback, TitleBase, InputBase, InputArea
    },
    data: () => ({
      currentNavigationCoTab: 0
    })
  }
</script>

<style lang="scss" scoped>
  .task-create-view{
    .task-create-title{
      text-align: center;
      margin: 0 0 36px;
    }
    .task-create-space{
      width: 100%;
      padding: 48px 164px 52px;
      box-sizing: border-box;
      border-radius: 16px;
      background-color: $grey-scale-500;
      .facade-input-base, .facade-input-area{
        margin-bottom: 16px;
      }
    }
  }
</style>