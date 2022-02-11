<template>
  <div class="singleton-resources-sidebar-filter" v-if="status">
    <sidebar-right
        class="messenger-app-sidebar" @onClose="closeSidebar()">
      <template #main-header>
        <sidebar-header>Фильтры</sidebar-header>
      </template>
      <template #main-content>
        <div class="sidebar-main">
          <div class="top-part">
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
import SidebarHeader from "@Container/Vx/Main/Dashboard/Components/SidebarHeader";
import SidebarRight from "@Facade/Navigation/SidebarRight";
import Search from "@Facade/Input/Search";
import ButtonBase from "@Facade/Button/Base";
import SidebarStructure from "@Container/Vx/Main/Dashboard/facades/SidebarStructure";
import {mapMutations} from "vuex";
import TitleCaps from "@Facade/Title/Caps";

export default {
  name: 'Singleton.Resources.Views.Sidebar.Filter',
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
  .singleton-resources-sidebar-filter {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    background-color: rgba($grey-scale-700, .8);
    z-index: 9;

    .messenger-app-sidebar ::v-deep{
      display: flex;
      height: 100%;
      background-color: $grey;
      .sidebar-main{
        width: 372px;
      }
    }
    .sidebar-main {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px 20px 0;
      height: 100%;
      box-sizing: border-box;
      .top-part{
        height: 100%;
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