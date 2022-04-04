<template>
  <div class="tab-view-chats">
    <tab-view :search-placeholder="'Поиск по контактам и чатам'" search-disable
              @onSearchClick="$emit('routerAdd', {name: 'search'})">
      <template #list-header>
        <list-header :title="'Чаты'" :title-count="dialogs.length" @onAction="statusAction = true"/>
        <modal-action-list disableDelete
                           :status="statusAction"
                           :actions="actions"
                           @onClose="statusAction = false"
                           @onList="makeAction"
        />
      </template>
      <template #content>
        <div class="chats-table">
          <chat v-for="(dialog, key) in dialogs" :dialog="dialog" :key="key" @onClick="openChat"></chat>
        </div>
      </template>
    </tab-view>
  </div>
</template>

<script>
  /*eslint-disable*/
  import TabView from "../../facade/TabView"
  import Chat from "@/LTE/Singletons/MessengerDff/facade/Chat";
  import ListHeader from "@Facade/Navigation/ListHeader";
  import ModalActionList from '@Facade/Modal/ActionList'
  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'Singleton.Messenger.ToolsScene.TabView.Chats',
    components: {
      TabView, Chat, ListHeader, ModalActionList
    },
    data() {
      return {
        statusAction: false,
        actions: ['Создать чат', 'Создать групповой чат'],
      }
    },
    computed: {
      ...mapGetters({
        dialogs: 'Messenger/chats',
      }),
    },
    methods: {
      ...mapMutations({
        routerNext: 'Messenger/ToolsScene/routerNext',
        openMessenger: 'Messenger/openMessenger',
        setActiveChat: 'Messenger/setActiveChat'
      }),
      makeAction(id){
        if(id === 1) {
          this.routerNext({name: 'create-group-chat'})
        }
      },
      openChat(id){
        this.openMessenger()
        this.setActiveChat(['chats', id])
      }
    }
  }
</script>


<style lang="scss" scoped>
  .tab-view-chats{
    .facade-modal-action-list::v-deep {
      .action-list-body{
        left: 114px; /// говно
        top: 4px;
      }
    }
  }
</style>