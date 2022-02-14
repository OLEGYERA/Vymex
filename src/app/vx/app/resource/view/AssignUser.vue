<template>
  <div class="resource-assign-user-sidebar" v-if="assignStatus">
    <sidebar-right
        class="sidebar-assign-user-container" @onClose="closeSidebar()">
      <template #main-header>
        <sidebar-header>Назначить пользователя</sidebar-header>
      </template>
      <template #main-content>
        <div class="sidebar-main">
          <div class="sidebar-content">
            <title-caps>
              Пользователи
            </title-caps>
            <search :placeholder="'Поиск'"/>
            <sidebar-structure :round="true" :levels="levels"/>
          </div>
        </div>
      </template>
    </sidebar-right>
  </div>
</template>

<script>
  import SidebarHeader from "@Container/Vx/Main/Dashboard/Components/SidebarHeader";
  import SidebarRight from "@Facade/Navigation/SidebarRight";
  import Search from "@Facade/Input/Search";
  import SidebarStructure from "@Container/Vx/Main/Dashboard/facades/SidebarStructure";
  import {mapGetters, mapMutations} from "vuex";
  import TitleCaps from "@Facade/Title/Caps";

  export default {
    name: 'vx.sidebar.assignUser',
    components: {
      SidebarHeader, SidebarRight, TitleCaps, Search, SidebarStructure
    },
    data() {
      return{

      }
    },
    props:{
      levels: Array
    },
    computed: {
      ...mapGetters({
        assignStatus: 'Resources/sidebarAssignStatus',
      })
    },
    methods: {
      ...mapMutations({
        closeSidebar: 'Resources/closeSidebarAssign',
      }),
    },
  }
</script>

<style lang="scss" scoped>
  .resource-assign-user-sidebar {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    background-color: rgba($grey-scale-700, .8);
    z-index: 1;

    .sidebar-assign-user-container ::v-deep{
      display: flex;
      height: 100%;
      background-color: $grey;
      .sidebar-main{
        width: 372px;
      }
    }
    .sidebar-main {
      overflow: hidden;
      height: 100%;
      .sidebar-content{
        box-sizing: border-box;
        height: 100%;
        padding: 20px;
        overflow-y: scroll;
      }
    }
    .facade-title-caps {
      margin-bottom: 4px;
      padding: 8px 0;
    }
    .facade-input-search {
      margin-top: 8px;
    }
  }
</style>