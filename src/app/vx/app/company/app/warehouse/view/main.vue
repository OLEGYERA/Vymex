<template>
  <div class="warehouse-main-view">
    <navigation-close />

    <header class="warehouse-main-header">
      <div class="header-group-text">
        <title-base>Склад ресурсов</title-base>
        <text-base>Тут храняться все ресурсы вашей компании</text-base>
      </div>

      <disk-storage-ui :storage-space="mainInfo.storageSpace"/>
    </header>

    <input-search :placeholder="'Поиск'"/>

    <list-header title="Все объекты"/>

    <main class="resource-folders">
      <div class="background-plate">
        <img class="image" src="@/assets/img/my/resource.svg">
        Ресурсов нет
      </div>

      <warehouse-object v-for="(object, objectKey) in warehouse"
                        :key="objectKey"
                        :resource-name="object.name"
                        :resource-identifier="object.identifier"
                        :cost="object.cost"
                        :count-requests="object.countRequests"
      />
    </main>
  </div>
</template>

<script>
/*eslint-disable*/
  import NavigationClose from '@Facade/Navigation/Close'
  import TitleBase from '@Facade/Title/Base'
  import TextBase from '@Facade/Text/Base'
  import TitleCaption from '@Facade/Title/Caption'
  import ButtonBase from '@Facade/Button/Base'
  import ListHeader from "@Facade/Navigation/ListHeader";
  import InputSearch from "@Facade/Input/Search";

  import {DiskStorageUi, WarehouseObject} from '@Providers'
  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'vx.warehouse.main',
    components: {
      NavigationClose, TitleBase, TextBase, InputSearch,
      TitleCaption, ButtonBase, DiskStorageUi, ListHeader,
      WarehouseObject
    },
    data() {
      return{
        modalStatus: false,
        warehouse: [
          {
            "id": 3,
            "name": "resource without worker and owner",
            "description": null,
            "identifier": "123456qwer",
            "worker": null,
            "cost": 100,
            "currency": "USD",
            "company": {
              "id": 1,
              "name": "Arxel",
              "avatar": null
            },
            "files": [],
            "images": [],
            "countRequests": 1
          },
          {
            "id": 3,
            "name": "resource without worker and owner",
            "description": null,
            "identifier": "123456qwer",
            "worker": null,
            "cost": 100,
            "currency": "USD",
            "company": {
              "id": 1,
              "name": "Arxel",
              "avatar": null
            },
            "files": [],
            "images": [],
            "countRequests": 2
          },
        ]
      }
    },
    computed:{
      ...mapGetters({
        mainInfo: 'Resources/getMainInfo',
        // warehouse: 'WareHouse/getWarehouse'
      }),
    },
    methods: {
      ...mapMutations({
        changeStatus: 'Company/changeStatus'
      }),
    },
    beforeCreate() {
      this.$core.execViaComponent('Resources', 'getWarehouse', 4)
      this.$core.execViaComponent('Resources', 'getInfo', 7)
    },
  }
</script>

<style lang="scss" scoped>
  .warehouse-main-view {
    position: relative;
    width: 100%;

    .warehouse-main-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 48px;

      .facade-title-base {
        margin: 0 0 12px;
      }
    }
    .facade-input-search{
      margin-bottom: 20px;
    }
    .facade-navigation-list-header{
      padding: 8px 0;
      margin-bottom: 4px;
    }
    .background-plate {
      height: 166px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: $grey-scale-500;
      border-radius: 12px;
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      color: $grey-scale-300;
      &-folder {
        margin-bottom: rem(20);
      }
      .image {
        height: 30px;
        width: 44px;
        margin-bottom: 8px;
      }
    }
  }
</style>