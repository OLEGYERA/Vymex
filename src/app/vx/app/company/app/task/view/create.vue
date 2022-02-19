<template>
  <div class="task-create-view">
    <navigation-comeback @onClick="$router.push({name: 'vx.co.task', params: {companyID: $route.params.companyID}})"/>
    <title-base class="task-create-title">Создать задачу</title-base>

    <div class="task-create-space">
      <input-base placeholder="Название задачи" labeled/>
      <input-text-area :model="''" :max-length="1000" placeholder="Описание" labeled count/>

      <title-caps>Время выполнения</title-caps>

      <div class="date-range-box">
        <input-date :model="dateStart" @onDate="dateStart = $event" placeholder="Начало" :disable="perpetual"/>
        <input-date :model="dateEnd" @onDate="dateEnd = $event" placeholder="Конец" :disable="perpetual"/>
      </div>
      <div class="perpetual-task">
        <input-checkbox :model="perpetual" @click.native="togglePerpetual"/>
        <text-base @click.native="togglePerpetual">Безсрочная задача</text-base>
      </div>

      <navigation-list-header title="Список" :title-count="countTest" @onAction="countTest++"/>



<!--      <unit-setting-ui :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}"/>-->
<!--      <unit-setting-ui :unit-level="3" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}"/>-->
<!--      <unit-checkbox-ui :model="unitCheckboxModel" @onClick="unitCheckboxModel = !unitCheckboxModel" :unit-level="2" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}" unit-position="CTO"/>-->
<!--      <unit-ui :unit-level="3" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}" unit-position="Head of Front-End"/>-->
<!--      <unit-ui :unit-level="4" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}" unit-position="Front-End Executor"/>-->


    </div>





  </div>
</template>

<script>
  /*eslint-disable*/
  import NavigationComeback from '@Facade/Navigation/Comeback'
  import TitleBase from '@Facade/Title/Base'
  import InputBase from '@Facade/Input/Base'
  import InputTextArea from '@Facade/Input/TextArea'
  import TitleCaps from '@Facade/Title/Caps'
  import InputDate from '@Facade/Input/Date'
  import InputCheckbox from '@Facade/Input/Checkbox'
  import TextBase from '@Facade/Text/Base'
  import {UnitUi, UnitSettingUi, UnitCheckboxUi} from '@Providers'
  import NavigationListHeader from '@Facade/Navigation/ListHeader'

  export default {
    name: 'vx.co.task.create.view',
    components: {
      NavigationComeback, TitleBase, InputBase, InputTextArea, TitleCaps, InputDate, InputCheckbox, TextBase,
      UnitUi, UnitSettingUi, UnitCheckboxUi,
      NavigationListHeader
    },
    data: () => ({
      currentNavigationCoTab: 0,
      perpetual: false,
      dateStart: null,
      dateEnd: null,
      unitCheckboxModel: false,
      countTest: 0
    }),
    methods: {
      togglePerpetual(){
        this.perpetual = !this.perpetual;

        if(this.perpetual){
          this.dateStart = null;
          this.dateEnd = null;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .task-create-view{
    max-width: 1200px;
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
      .facade-input-base, .facade-input-text-area{
        margin-bottom: 16px;
      }
      .date-range-box{
        display: flex;
        justify-content: space-between;
        margin: 16px 0;
        .facade-input-date{
          width: 47%;
        }
      }
      .perpetual-task{
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-bottom: 32px;
        .facade-text-base{
          padding-left: 12px;
          color: #fff;
        }
      }
    }
  }
</style>