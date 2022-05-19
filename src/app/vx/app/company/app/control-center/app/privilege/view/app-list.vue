<template>
  <div class="privilege-app-list-view">
    <navigation-comeback @onClick="$router.push({name: 'vx.co.control-center', params: {companyID: $route.params.companyID}})"/>

    <div class="app-list-header">
      <div class="header-top-level">
        <title-base>Ролирование приложение</title-base>
        <icon-points-vertical @click.native="modalActionStatus = true"/>

        <modal-action-list :status="modalActionStatus" @onClose="modalActionStatus = false" @onDelete="modalBaseStatus = true">
          <template #del-title>Сброс к базовым настройкам</template>
        </modal-action-list>
      </div>
      <text-base>Здесь находиться оплата электронными денежными средствами</text-base>
    </div>

    <modal-base :status="modalBaseStatus" @onClose="modalBaseStatus = false" @onOk="modalBaseStatus = false">
      <template #title>
        Вернуть базовые настройки для этого модуля?
      </template>
      <template #description>Это действие необратимо</template>
      <template #button-accept>Удалить</template>
    </modal-base>

    <div class="structure-modules-box">
      <title-caps>Модули С.Е. <span class="size-counter">{{structureModules.length}}</span></title-caps>

      <div class="co-module-plate" v-for="(structureModule, structureModuleKey) in structureModules" :key="structureModuleKey" @click="changePage(structureModuleKey)">
        <div class="module-plate-info">
          <div class="info-icon"><img :src="structureModule.img"></div>
          <text-base>{{ structureModule.title }}</text-base>
        </div>
        <icon-arrow-right/>
      </div>
    </div>


    <div class="company-modules-box">
      <title-caps>Модули С.Е. <span class="size-counter">{{companyModules.length}}</span></title-caps>

      <div class="co-module-plate" v-for="(companyModule, companyModuleKey) in companyModules" :key="companyModuleKey">
        <div class="module-plate-info">
          <div class="info-icon"><img :src="companyModule.img"></div>
          <text-base>{{ companyModule.title }}</text-base>
        </div>
        <icon-arrow-right/>
      </div>
    </div>

<!--    <unit-privilege-ui :privilege-type="1" :unit-level="3" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}" unit-position="Head of Front-End"/>-->
<!--    <unit-privilege-ui :privilege-type="2" :unit-level="3" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}" unit-position="Head of Front-End"/>-->
<!--    <unit-privilege-ui :privilege-type="3" :unit-level="3" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}" unit-position="Head of Front-End"/>-->
<!--    <unit-privilege-ui :privilege-type="0" :unit-level="2" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}" unit-position="Head of Front-End"/>-->
<!--    <unit-privilege-ui :privilege-type="2" :unit-level="2" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}" unit-position="Head of Front-End"/>-->


  </div>
</template>

<script>
  /*eslint-disable*/
  import NavigationComeback from '@Facade/Navigation/Comeback'
  import TitleBase from '@Facade/Title/Base'
  import TextBase from '@Facade/Text/Base'
  import TitleCaps from '@Facade/Title/Caps'
  import ModalActionList from '@Facade/Modal/ActionList'
  import ModalBase from '@Facade/Modal/Base'
  import {UnitPrivilegeUi} from '@Providers'


  export default {
    name: 'vx.co.control-center.privilege.app-list.view',
    components: {
      NavigationComeback, TitleBase, TextBase, TitleCaps,
      UnitPrivilegeUi, ModalActionList, ModalBase
    },
    data: () => ({
      structureModules: [
        {title: 'Структура компании', img: require('@/assets/img/my/structure.svg')},
        {title: 'Процессы С.Е.', img: require('@/assets/img/my/process.svg')},
        {title: 'Задачи С.Е.', img: require('@/assets/img/my/task.svg')},
        {title: 'Ресурсы С.Е.', img: require('@/assets/img/my/resource.svg')},
      ],
      companyModules: [
        {title: 'Склад ресурсов', img: require('@/assets/img/my/storage.svg')},
        {title: 'Центр управления', img: require('@/assets/img/my/control-center.svg')},
      ],
      modalActionStatus: false,
      modalBaseStatus: false
    }),
    methods: {
      changePage(key) {
        if (key === 0){
          this.$router.push({name: 'vx.co.control-center.privilege.structure'})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .privilege-app-list-view{
    .app-list-header{
      margin-bottom: 48px;
      .header-top-level{
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        .icon{
          padding: 0 10px;
          color: #fff;
          cursor: pointer;
        }
        .facade-modal-action-list::v-deep {
          right: 0;
          .action-list-body{
            transform: translateX(-100%);
            top: 10px;
          }
        }
      }
    }
    .structure-modules-box{
      margin-bottom: 48px;
    }
    .facade-title-caps{
      padding: 8px 0;
      margin-bottom: 8px;
      .size-counter{
        color: $blue;
      }
    }
    .co-module-plate{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-radius: 12px;
      background-color: $grey-scale-400;
      margin-bottom: 12px;
      cursor: pointer;
      .module-plate-info{
        display: flex;
        align-items: center;
        .info-icon{
          width: 32px;
          height: 32px;
          margin-right: 8px;
          img{
            width: 100%;
          }
        }
        .facade-text-base{
          color: #fff;
        }
      }
      .icon{
        color: $grey-scale-200;
        height: 16px;
      }

      &:last-child{
        margin-bottom: 0;
      }


    }
  }
</style>