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
        <text-base @click.native="togglePerpetual">Бессрочная задача</text-base>
      </div>

      <navigation-list-header title="Список" :title-count="countTest" @onAction="countTest++"/>
      <div class="content-container"></div>
      <navigation-list-header title="файлы"/>
      <div class="content-container"></div>
      <navigation-list-header title="Исполнители"/>
      <div class="content-container"></div>
      <navigation-list-header title="Следят"/>
      <div class="content-container">
        <unit-setting-ui :unit-data="person.unitData" :unit-level="person.unitLevel" :unit-position="person.unitPosition"/>
      </div>



<!--      <unit-setting-ui :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}"/>-->
<!--      <unit-setting-ui :unit-level="3" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}"/>-->
<!--      <unit-checkbox-ui :model="unitCheckboxModel" @onClick="unitCheckboxModel = !unitCheckboxModel" :unit-level="2" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}" unit-position="CTO"/>-->
<!--      <unit-ui :unit-level="3" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}" unit-position="Head of Front-End"/>-->
<!--      <unit-ui :unit-level="4" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}" unit-position="Front-End Executor"/>-->


    </div>

    <sidebar-assign-user-ui :levels="levels" disable/>
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
  import {UnitUi, UnitSettingUi, UnitCheckboxUi, SidebarAssignUserUi} from '@Providers'
  import NavigationListHeader from '@Facade/Navigation/ListHeader'
  // import {SidebarAssignUserUi} from '@Providers'


  export default {
    name: 'vx.co.task.create.view',
    components: {
      NavigationComeback, TitleBase, InputBase, InputTextArea, TitleCaps, InputDate, InputCheckbox, TextBase,
      UnitUi, UnitSettingUi, UnitCheckboxUi,
      NavigationListHeader, SidebarAssignUserUi
    },
    data: () => ({
      currentNavigationCoTab: 0,
      perpetual: false,
      dateStart: null,
      dateEnd: null,
      unitCheckboxModel: false,
      countTest: 0,
      person: {
        unitLevel: 1,
        unitData: {
          id: 1,
          name: 'Александр',
          lastname: 'Ким',
          avatar: null
        },
        unitPosition: 'big boss'
      },
      levels: [
        {
          level: 1,
          disable: false,
          data: [
            {
              unitLevel: 1,
              unitData: {
                id: 1,
                name: 'Александр',
                lastname: 'Ким',
                avatar: null
              },
              unitPosition: 'big boss',
              checked: false,
            },
          ]
        },
        {
          level: 2,
          disable: true,
          data: [
            {
              unitLevel: 2,
              unitData: {
                id: 2,
                name: 'Александр',
                lastname: 'Ким',
                avatar: null
              },
              unitPosition: 'big boss',
              checked: false,
            },
            {
              unitLevel: 2,
              unitData: {
                id: 3,
                name: 'Александр',
                lastname: 'Ким',
                avatar: null
              },
              unitPosition: 'big boss',
              checked: false,
            },
          ]
        },
        {
          level: 3,
          disable: true,
          data: [
            {
              unitLevel: 3,
              unitData: {
                id: 4,
                name: 'Александр',
                lastname: 'Ким',
                avatar: null
              },
              unitPosition: 'big boss',
              checked: false,
            },
            {
              unitLevel: 3,
              unitData: {
                id: 5,
                name: 'Александр',
                lastname: 'Ким',
                avatar: null
              },
              unitPosition: 'big boss',
              checked: false,
            },
          ]
        },
        {
          level: 4,
          disable: true,
          data: [
            {
              unitLevel: 4,
              unitData: {
                id: 6,
                name: 'Александр',
                lastname: 'Ким',
                avatar: null
              },
              unitPosition: 'big boss',
              checked: false,
            },
            {
              unitLevel: 4,
              unitData: {
                id: 7,
                name: 'Александр',
                lastname: 'Ким',
                avatar: null
              },
              unitPosition: 'big boss',
              checked: false,
            },
          ]
        }
      ]
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
      .facade-navigation-list-header{
        margin-bottom: 4px;
      }
      .content-container{
        margin-bottom: 24px;
      }
    }
  }
</style>