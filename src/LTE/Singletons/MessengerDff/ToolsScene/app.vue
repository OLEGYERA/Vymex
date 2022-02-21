<template>
  <div class="tools-scene-app">
    <sidebar class="messenger-app-sidebar"
             :tab-active="TabViewActive"
             :tab-list="{data: TabViewCollection.list, group: TabViewCollection.group}"
             @onChangeTab="switchActiveTab($event)" @onClose="close()">
      <template #main-header>
        12
<!--        <sidebar-header-->
<!--          @click.native="changeRouterInfo"-->
<!--          :avatar="avatar"-->
<!--          :full-name="fullName"-->
<!--          unread-messages="1"/>-->
      </template>
      <template #main-content>
        1212
<!--        <sidebar-view/>-->
      </template>
    </sidebar>
  </div>
</template>

<script>
  /*eslint-disable*/
  import {mapGetters, mapMutations} from 'vuex'
  import Sidebar from "@Facade/Navigation/SidebarRight"

  export default {
    name: 'Singleton.Messenger.ToolsScene.app',
    components: {
      Sidebar
    },
    computed: {
      ...mapGetters({
        TabViewActive: 'Messenger/ToolsScene/TabView/getActiveTab',
        TabViewCollection: 'Messenger/ToolsScene/TabView/getCollections',
      })
    },
    methods: {
      ...mapMutations({
        switchActiveTab: 'Messenger/ToolsScene/TabView/switchActiveTab',
        close: 'Messenger/close',
      })
    }
  }
</script>


<style lang="scss">
  .tools-scene-app{
    width: 372px;
    height: 100%;
    display: flex;
    flex-shrink: 0;
    background-color: $grey;

    .messenger-app-sidebar{
      width: 100%;
    }
  }
</style>