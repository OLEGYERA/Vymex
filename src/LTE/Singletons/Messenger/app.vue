<template>
  <div class="singleton-messenger-app" v-if="status">
    <main class="messenger-app-main">
      <transition name="fade">
        <messenger-main/>
      </transition>
    </main>
    <sidebar
        class="messenger-app-sidebar" @onClose="close()"
        :tab-list="sidebarView.tabList" :tab-active="sidebarView.tabActive"
        @onChangeTab="switchTab($event)">
      <template #main-header>
        <sidebar-header
            @click.native="setRouterName('personal')"
            :avatar="avatar"
            :full-name="fullName"
            unread-messages="1"/>
      </template>
      <template #main-content>
        <sidebar-view/>
      </template>
    </sidebar>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  //for sidebar
  import Sidebar from "@Facade/Navigation/SidebarRight"
  import SidebarHeader from './facades/SidebarHeader'
  import SidebarView from './sidebar.view'
  import MessengerMain from "@/LTE/Singletons/Messenger/views/messenger/MessengerMain";

  export default {
    name: 'Singleton.Messenger.app',
    components: {
      Sidebar, SidebarHeader, SidebarView,
      MessengerMain
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters({
        //messenger
        status: 'Messenger/status',
        sidebarView: 'Messenger/sidebarView',
        //user
        avatar: 'getUserAvatarData',
        fullName: 'getUserFullName',
        messengerStatus: 'Messenger/messengerStatus'
      })
    },
    methods: {
      ...mapMutations({
        close: 'Messenger/close',
        switchTab: 'Messenger/switchTab',
        setRouterName: 'Messenger/setRouterName',
      }),
    },
    updated() {
      console.log(this.status)
    }
  }
</script>

<style lang="scss" scoped>
  .singleton-messenger-app {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    background-color: rgba($grey-scale-700, .8);
    z-index: 3;

    .messenger-app-main {
      width: 100%;
    }

    .messenger-app-sidebar ::v-deep{
      display: flex;
      height: 100%;
      background-color: $grey;
      .sidebar-main{
        width: 372px;
      }
    }
  }
</style>