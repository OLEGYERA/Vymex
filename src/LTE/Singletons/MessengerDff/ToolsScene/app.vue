<template>
  <div class="tools-scene-app">
    <sidebar class="messenger-app-sidebar"
             :tab-active="TabViewActive"
             :tab-list="{data: TabViewCollection.list, group: TabViewCollection.group}"
             @onChangeTab="switchActiveTab($event)" @onClose="closeAll">
      <template #main-header>
        <div class="sidebar-header" @click="routerNext({name: 'personal-info'})">
          <div class="header-user-info">
            <image-avatar :logo="UserAvatar.logo" :colorCode="UserAvatar.colorCode"/>
            <div class="info-title-group">
              <title-caption>Личное</title-caption>
              <text-base>{{UserFullName}}</text-base>
            </div>
          </div>
          <div class="header-user-unread-msg">
            <info-amount>1</info-amount>
          </div>
        </div>
      </template>
      <template #main-content>
        <div class="tools-scene-view">
          <transition :name="toolsSceneViewAnimation" mode="out-in"> <!--:name="`component-${renderAnimationName}`"-->
            <keep-alive>
              <component :is="toolsSceneView" class="tools-scene-view-component"
                         @routerAdd="routerNext" @routerBack="routerBack"/>
           </keep-alive>
          </transition>
        </div>
      </template>
    </sidebar>
  </div>
</template>

<script>
  /*eslint-disable*/
  import {mapGetters, mapMutations} from 'vuex'
  import Sidebar from "@Facade/Navigation/SidebarRight"
  import ImageAvatar from '@Facade/Image/Avatar'
  import TitleCaption from '@Facade/Title/Caption'
  import TextBase from '@Facade/Text/Base'
  import InfoAmount from "@/LTE/Singletons/facades/InfoAmount";

  import TabViewContacts from "./TabView/Contacts";
  import TabViewChats from "./TabView/Chats";
  import TabViewVolumes from "./TabView/Volumes"

  import RouterViewSearch from "./RouterView/Search";
  import RouterViewContact from "./RouterView/Contact";
  import RouterViewPersonalInfo from "./RouterView/PersonalInfo"
  import RouterViewContactInfo from "./RouterView/ContactInfo"
  import RouterViewInvite from "./RouterView/Invite"
  import RouterViewCreateGroupChat from "./RouterView/CreateGroupChat"
  import RouterViewAddUsers from "./RouterView/AddUsers"
  import RouterViewGroupInfo from "./RouterView/GroupInfo"
  import RouterViewEditGroup from "./RouterView/EditGroup"


  export default {
    name: 'Singleton.Messenger.ToolsScene.app',
    components: {
      Sidebar,
      ImageAvatar, TitleCaption, TextBase, InfoAmount,
      TabViewContacts, TabViewChats, TabViewVolumes,
      RouterViewSearch, RouterViewContact, RouterViewPersonalInfo, RouterViewContactInfo, RouterViewInvite,
      RouterViewCreateGroupChat, RouterViewAddUsers, RouterViewGroupInfo, RouterViewEditGroup
    },
    computed: {
      ...mapGetters({
        TabViewActive: 'Messenger/ToolsScene/getActiveTab',
        TabViewCollection: 'Messenger/ToolsScene/getTabCollections',
        RouterViewCollection: 'Messenger/ToolsScene/getRouterCollections',

        UserAvatar: 'getUserAvatarData',
        UserFullName: 'getUserFullName'
      }),
      toolsSceneView(){
        const TabViewActiveRouters = this.TabViewActive.routers;
        if(TabViewActiveRouters){
          return 'router-view-' + TabViewActiveRouters[TabViewActiveRouters.length - 1].name;
        } else {
          return 'tab-view-' + this.TabViewActive.name;
        }
      },
      toolsSceneViewAnimation(){
        if(this.TabViewActive.routers === null){
          return 'component-overlap-off'
        } else if(this.TabViewActive.routers.length === 1 && this.RouterViewCollection.directionNext){
          return 'component-overlap-on'
        }
        return 'component-swipe-' + (this.RouterViewCollection.directionNext ? 'left' : 'right')
      }
    },
    methods: {
      ...mapMutations({
        switchActiveTab: 'Messenger/ToolsScene/switchActiveTab',
        routerNext: 'Messenger/ToolsScene/routerNext',
        routerBack: 'Messenger/ToolsScene/routerBack',
        close: 'Messenger/close',
        closeMessenger: 'Messenger/closeMessenger'
      }),
      closeAll(){
        this.close()
        this.closeMessenger()
      }
    }
  }
</script>


<style lang="scss">
  .tools-scene-app{
    width: 450px;
    height: 100%;
    display: flex;
    flex-shrink: 0;
    background-color: $grey;

    .messenger-app-sidebar{
      width: 100%;
      .sidebar-header{
        width: 100%;
        background-color: $grey-scale-500;
        border-bottom: $grey-scale-700 solid 1px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        padding: rem(12) rem(20);
        box-sizing: border-box;
        .header-user-info{
          width: 100%;
          display: inherit;
          align-items: center;
          .facade-image-avatar{
            width: 40px;
            height: 40px;
          }
          .info-title-group{
            width: 100%;
            margin-left: 12px;
            .facade-title-caption{
              margin-bottom: 2px;
              color: #fff;
            }
            .facade-text-base{
              color: #fff;
            }

          }
        }
        .header-user-unread-msg{}
      }
      .tools-scene-view{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .tools-scene-view-component{
    width: 100%;
    height: 100%;
    &.component-overlap-on{
      &-enter-active{
        width: 50%;
        opacity: 0;
        transition: all 100ms ease;
      }
      &-enter-to{
        width: 100%;
        opacity: 1;
      }
      &-leave-active {
        opacity: 1;
        transition: all 50ms ease;
      }
      &-leave-to {
        opacity: 0;
      }
    }
    &.component-overlap-off{
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
    &.component-swipe-left{
      &-enter-active{
        opacity: 0;
        transform: translateX(-100%);
        transition: all 120ms ease-in;
      }
      &-enter-to{
        opacity: 1;
        transform: translateX(0);
      }
    }
    &.component-swipe-right{
      &-leave-active {
        opacity: 1;
        transform: translateX(0);
        transition: all 120ms ease-out;
      }
      &-leave-to {
        opacity: 0;
        transform: translateX(-100%);
      }
    }
  }
</style>