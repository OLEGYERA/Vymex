<template>
  <div class="sidebarViewController">
    <transition :name="`component-${renderAnimationName}`" mode="out-in">
      <keep-alive>
        <component :is="renderViewName" class="sidebarViewComponent"
                   @updateRouter="setRouterName($event)"
                   @closeRouter="closeRouter()"
                   :switchNotify="disableNotifications"
                   :newTime="newTime"
                   @change-switch="changeSwitch()"
                   @change-time="changeTime"
        />
      </keep-alive>
    </transition>
  </div>
</template>
// внутренносити sidebar messenger
<script>
  import {mapGetters, mapMutations} from 'vuex'
  /*eslint-disable*/
  import ChatsTab from './views/sidebar/Chats.tab'
  import ContactsTab from './views/sidebar/Contacts.tab'
  import SearchRouter from './views/sidebar/Search.router'
  import ContactInfoRouter from '../MessengerDff/ToolsScene/RouterView/ContactInfo'

  /**/
  import VolumesTab from '../Notifications/views/Volumes.tab'




  export default {
    name: 'Singleton.Messenger.SidebarView',
    components: {
      ChatsTab, ContactsTab, /**/ VolumesTab,
      SearchRouter,  ContactInfoRouter
    },
    computed: {
      ...mapGetters({
        // какая хрень активна и будет рендериться
        sidebarView: 'Messenger/sidebarView',
        // отключение оповещений
        disableNotifications: 'Messenger/notificationsStatus',
        newTime: 'Messenger/disableTime',
      }),
      renderViewName(){
        const tabActive = this.sidebarView.tabActive;
        return tabActive.routerName ? tabActive.routerName + '-router' : tabActive.name + '-tab';
      },
      renderAnimationName(){
        return this.sidebarView.animation;
      },
    },
    methods: {
      ...mapMutations({
        setRouterName: 'Messenger/setRouterName',
        closeRouter: 'Messenger/closeRouter',
        // отключение оповещений
        changeSwitch: 'Messenger/switchNotifications',
        changeTime: 'Messenger/changeTime',
      }), //setRouteByrName
    }
  }
</script>

<style lang="scss">
  .sidebarViewController{
    width: 100%;
    height: 100%;
    //display: flex;
    //justify-content: center;
    .sidebarViewComponent{
      width: 100%;
      height: 100%;
      display: inherit;
      justify-content: inherit;
      overflow: hidden;

      &.component-expand{
        &-enter-active{
          width: 30%;
          opacity: 0;
          transition: all 100ms ease;
        }
        &-enter-to{
          width: 100%;
          opacity: 1;
        }

        &-leave-active {
          //width: 100%;
          opacity: 1;
          transition: all 50ms ease;
        }
        &-leave-to {
          //width: 60%;
          opacity: 0;
        }
      }
      &.component-zoom-out{
        &-enter-active{
          opacity: 0;
          transform: scale(.96);
          transition: all 100ms ease;
        }
        &-enter-to{
          opacity: 1;
          transform: scale(1);
        }

        &-leave-active {
          opacity: 1;
          transition: all 50ms ease;
        }
        &-leave-to {
          opacity: 0;
        }
      }
    }
  }
</style>