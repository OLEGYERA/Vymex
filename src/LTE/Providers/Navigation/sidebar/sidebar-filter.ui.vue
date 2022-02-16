<template>
  <div class="resource-sidebar-filter" v-if="status">
    <sidebar-right
        class="sidebar-filter-container" @onClose="closeSidebar()">
      <template #main-header>
        <sidebar-header>Фильтры</sidebar-header>
      </template>
      <template #main-content>
        <div class="sidebar-main-plate">
          <div class="header-text-group">
            <title-caps>Расположение</title-caps>
            <div class="buttons">
              <div
                  class="button-location"
                  :class="{active: activeButton === buttonKey}"
                  v-for="(button, buttonKey) in buttons"
                  @click="activeButton = buttonKey"
                  :key="buttonKey">
                {{button}}
              </div>
            </div>
            <title-caps class="sidebar-view-header-title">
              пользователь
            </title-caps>
            <search :placeholder="'Поиск'"/>
            <sidebar-structure />
          </div>
          <button-base>Применить</button-base>
        </div>
      </template>
    </sidebar-right>
  </div>
</template>

<script>
  import SidebarHeader from "../sidebar-header.facade"; //// костыль
  import SidebarRight from "@Facade/Navigation/SidebarRight";
  import Search from "@Facade/Input/Search";
  import ButtonBase from "@Facade/Button/Base";
  import SidebarStructure from "../sidebar-structure.facade"; //// костыль
  import {mapMutations} from "vuex";
  import TitleCaps from "@Facade/Title/Caps";

  export default {
    name: 'Providers.Navigation.sidebar.Filter',
    components: {
      SidebarHeader, SidebarRight, TitleCaps, Search, ButtonBase, SidebarStructure
    },
    data() {
      return{
        buttons: ['Все', 'Локальные', 'Глобальные'],
        activeButton: 0
      }
    },
    props: {
      status: Boolean
    },
    methods: {
      ...mapMutations({
        closeSidebar: 'Resources/closeSidebar',
      }),
    },
  }
</script>

<style lang="scss" scoped>
  .resource-sidebar-filter {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    background-color: rgba($grey-scale-700, .8);
    z-index: 4;

    .sidebar-filter-container ::v-deep{
      display: flex;
      height: 100%;
      background-color: $grey;
    }
    .sidebar-main-plate {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px 20px 0;
      height: 100%;
      box-sizing: border-box;
      .header-text-group{
        height: 100%;
        padding: 0 0 30px;
        overflow-y: scroll;
      }
      .facade-button-base {
        transform: translateY(-20px);
      }
    }
    .facade-title-caps {
      margin-bottom: 4px;
      padding: 8px 0;
    }
    .facade-input-search {
      margin-top: 8px;
    }
    .buttons {
      display: flex;
      margin-bottom: rem(20);
      .button-location {
        padding: rem(8) rem(16);
        margin-right: rem(8);
        background-color: $grey-scale-400;
        border-radius: 20px;
        color: #fff;
        cursor: pointer;
      }
      .active {
        background-color: $blue;
      }
    }
  }
</style>