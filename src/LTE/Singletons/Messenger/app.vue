<template>
  <div class="singleton-messenger-app" v-if="status">
    <main class="messenger-app-main">
      <messenger-main/>
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
  import SidebarHeader from './facades/sidebar-header'
  import SidebarView from './sidebar.view'
  import MessengerMain from "@/LTE/Singletons/Messenger/messenger/MessengerMain";

  export default {
    name: 'Singleton.Messenger.app',
    components: {
      Sidebar, SidebarHeader, SidebarView,
      MessengerMain
    },
    created() {
      console.log(this.$store, this.test)
    },
    computed: {
      ...mapGetters({
        //messenger
        status: 'Messenger/status',
        sidebarView: 'Messenger/sidebarView',
        //user
        avatar: 'getUserAvatarData',
        fullName: 'getUserFullName'
      })
    },
    methods: {
      ...mapMutations({
        close: 'Messenger/close',
        switchTab: 'Messenger/switchTab',
        setRouterName: 'Messenger/setRouterName',
      }),
    },
  }
</script>

<style lang="scss" scoped>
  .singleton-messenger-app{
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

    .messenger-app-sidebar {
      height: 100%;
      display: flex;
      background-color: $grey;
      ::v-deep{
        .sidebar-main{
          height: 100%;
          width: 372px;
          .messenger-app-info {
            padding: rem(24) rem(20);
            width: 100%;
            box-sizing: border-box;
            height: 100%;
            overflow-y: scroll;
          }
        }
      }
    }
  }
</style>