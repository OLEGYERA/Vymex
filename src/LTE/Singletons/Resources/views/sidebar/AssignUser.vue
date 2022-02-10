<template>
  <div class="singleton-resources-assign-user" v-if="assignStatus">
    <sidebar-right
        class="messenger-app-sidebar" @onClose="closeSidebar()">
      <template #main-header>
        <sidebar-header>Назначить пользователя</sidebar-header>
      </template>
      <template #main-content>
        <div class="sidebar-main">
          <div class="top-part">
            <title-caps class="sidebar-view-header-title">
              Пользователи
            </title-caps>
            <search :placeholder="'Поиск'"/>
            <sidebar-structure :round="true"/>
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
  name: 'Singleton.Resources.Views.Sidebar.AssignUser',
  components: {
    SidebarHeader, SidebarRight, TitleCaps, Search, SidebarStructure
  },
  data() {
    return{
    }
  },
  // props: {
  //   status: Boolean
  // },
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
.singleton-resources-assign-user {
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
    padding: 20px;
    height: 100%;
    box-sizing: border-box;
    .top-part{
      height: 100%;
      overflow-y: scroll;
    }
    .facade-button-base {
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