<template>
  <div class="resource-sidebar-filter-ui" v-if="status">
    <sidebar-right
        class="sidebar-filter-container" @onClose="closeSidebar()">
      <template #main-header>
        <sidebar-header-atom>Фильтры</sidebar-header-atom>
      </template>
      <template #main-content>
        <div class="sidebar-main-plate">
          <div class="header-text-group">
            <title-caps>Расположение</title-caps>
            <div class="sidebar-filter-buttons-group">
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
            <input-search :placeholder="'Поиск'"/>
          </div>
          <sidebar-structure-ui multiply :levels="levels">1 уровень</sidebar-structure-ui>
          <button-base :disable="disable" @onClick="getChosenUnits()">Применить</button-base>
        </div>
      </template>
    </sidebar-right>
  </div>
</template>

<script>
  import SidebarRight from "@Facade/Navigation/SidebarRight";
  import InputSearch from "@Facade/Input/Search";
  import ButtonBase from "@Facade/Button/Base";
  import {mapMutations} from "vuex";
  import TitleCaps from "@Facade/Title/Caps";

  import SidebarHeaderAtom from "./sidebar-header.atom";
  import SidebarStructureUi from "./sidebar-structure.ui";

  export default {
    name: 'Providers.Navigation.Sidebar.Filter',
    components: {
      SidebarRight, TitleCaps, InputSearch, ButtonBase, SidebarStructureUi, SidebarHeaderAtom
    },
    data() {
      return{
        buttons: ['Все', 'Локальные', 'Глобальные'],
        activeButton: 0
      }
    },
    props: {
      status: {
        type: Boolean,
        required: true,
      },
      levels: {
        type: Array,
        required: true,
      },
      disable: Boolean,
    },
    methods: {
      ...mapMutations({
        closeSidebar: 'Resources/closeSidebar',
        getChosenUnits: 'Resources/getChosenUnits'
      }),
    },
  }
</script>

<style lang="scss" scoped>
  .resource-sidebar-filter-ui {
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
      .sidebar-main-plate {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px 20px 0;
        height: 100%;
        box-sizing: border-box;
        .header-text-group{
          margin-bottom: 12px;
          .facade-title-caps {
            margin-bottom: 4px;
            padding: 8px 0;
          }
          .facade-input-search {
            margin-top: 8px;
          }
          .sidebar-filter-buttons-group {
            display: flex;
            margin-bottom: rem(12);
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
        .facade-button-base {
          transform: translateY(-20px);
        }
      }
    }

  }
</style>