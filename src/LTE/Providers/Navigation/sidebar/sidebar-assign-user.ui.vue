<template>
  <div class="resource-assign-user-sidebar-ui" v-if="status">
    <sidebar-right
        class="sidebar-assign-user-container" @onClose="closeSidebar()">
      <template #main-header>
        <sidebar-header-atom>Назначить пользователя</sidebar-header-atom>
      </template>
      <template #main-content>
        <div class="sidebar-info-group">
          <div class="sidebar-header-content">
            <title-caps>
              Пользователи
            </title-caps>
            <search :placeholder="'Поиск'"/>
          </div>
          <sidebar-structure-ui :view-type="2" :levels="levels" @onClick="chooseUser"/>
        </div>
      </template>
    </sidebar-right>
  </div>
</template>

<script>
  import SidebarRight from "@Facade/Navigation/SidebarRight";
  import Search from "@Facade/Input/Search";
  import TitleCaps from "@Facade/Title/Caps";
  import SidebarHeaderAtom from "./sidebar-header.atom";
  import SidebarStructureUi from "./sidebar-structure.ui";

  import {mapMutations} from "vuex";

  export default {
    name: 'Providers.Navigation.Sidebar.AssignUser',
    components: {
      SidebarHeaderAtom, SidebarRight, TitleCaps, Search, SidebarStructureUi
    },
    data() {
      return{

      }
    },
    props:{
      levels: {
        type: Array,
        required: true,
      },
      status: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      ...mapMutations({
        closeSidebar: 'Resources/closeSidebarAssign',
      }),
      // chooseUser(unitKey, personKey){
      //   this.levels[unitKey].data[personKey].unitChecked = !this.levels[unitKey].data[personKey].unitChecked
      // }
    },
  }
</script>

<style lang="scss" scoped>
  .resource-assign-user-sidebar-ui {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    background-color: rgba($grey-scale-700, .8);
    z-index: 1;

    .sidebar-assign-user-container ::v-deep {
      display: flex;
      height: 100%;
      background-color: $grey;

      .sidebar-main {
        width: 372px;
        .sidebar-info-group{
          overflow: hidden;
          height: 100%;
          padding: rem(20);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .sidebar-header-content {;
            margin-bottom: 12px;
            .facade-title-caps {
              margin-bottom: 8px;
              padding: 8px 0;
            }
          }
        }
      }
    }
  }
</style>