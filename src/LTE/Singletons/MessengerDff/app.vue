<template>
  <div class="singleton-messenger-app" v-if="status">
    <sender-scene/>

    <transition name="tools-scene-animation" mode="out-in">
      <keep-alive><tools-scene v-if="status"/></keep-alive>
    </transition>
  </div>
</template>

<script>
  /*eslint-disable*/
  import SenderScene from './SenderScene/app'
  import ToolsScene from './ToolsScene/app'


  import {mapGetters, mapMutations} from 'vuex'
  //for sidebar
  // import Sidebar from "@Facade/Navigation/SidebarRight"
  // import SidebarHeader from './facades/SidebarHeader'
  // import SidebarView from './sidebar.view'
  // import MessengerMain from "@/LTE/Singletons/Messenger/views/messenger/MessengerMain";

  export default {
    name: 'Singleton.Messenger.app',
    components: {
      SenderScene, ToolsScene
      // Sidebar, SidebarHeader, SidebarView,
      // MessengerMain
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters({
        //messenger
        status: 'Messenger/status',
      })
    },
    methods: {
      // ...mapMutations({
      //   close: 'Messenger/close',
      //   switchTab: 'Messenger/switchTab',
      //   setRouterName: 'Messenger/setRouterName',
      //   changePersonalRouterType: 'Messenger/changePersonalRouterType'
      // }),
      // changeRouterInfo() {
      //   this.setRouterName('personal');
      //   this.changePersonalRouterType('personal');
      // }
    },
  }
</script>

<style lang="scss" scoped>
  .singleton-messenger-app {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    background-color: rgba($grey-scale-700, .8);
    z-index: 3;

    .tools-scene-animation{
      &-enter-active{
        transition: .2s all ease .05s;
        transform: translateX(100%);
      }
      &-enter-to{
        transform: translateX(0%);
      }
    }
  }
</style>