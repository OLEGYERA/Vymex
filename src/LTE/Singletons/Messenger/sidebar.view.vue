<template>
  <div class="sidebarViewController">
    <transition :name="`component-${renderAnimationName}`" mode="out-in">
      <keep-alive>
        <component :is="renderViewName" class="sidebarViewComponent"
                   @updateRouter="setRouterName($event)"
                   @closeRouter="closeRouter()"
        />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  /*eslint-disable*/
  import ChatsTab from './views/sidebar/Chats.tab'
  import ContactsTab from './views/sidebar/Contacts.tab'
  import SearchRouter from './views/sidebar/Search.router'

  /**/
  import VolumesTab from './sidebar/TabVolumes.atom'


  import PersonalRouter from './sidebar/RouterPersonal.atom'


  export default {
    name: 'Singleton.Messenger.SidebarView',
    components: {
      ChatsTab, ContactsTab, /**/ VolumesTab,
      SearchRouter,  /**/ PersonalRouter
    },
    computed: {
      ...mapGetters({sidebarView: 'Messenger/sidebarView'}),
      renderViewName(){
        const tabActive = this.sidebarView.tabActive;
        return tabActive.routerName ? tabActive.routerName + '-router' : tabActive.name + '-tab';
      },
      renderAnimationName(){
        return this.sidebarView.animation;
      }
    },
    methods: {
      ...mapMutations({
        setRouterName: 'Messenger/setRouterName',
        closeRouter: 'Messenger/closeRouter',
      }), //setRouteByrName
    }
  }
</script>

<style lang="scss">
  .sidebarViewController{
    width: 100%;
    height: 100%;
    //display: flex;
    justify-content: center;
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