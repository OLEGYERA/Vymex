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
          <chat v-for="(dialog, key) in dialogs" :dialog="dialog" :key="key"></chat>
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
  import {mapMutations} from "vuex";

  export default {
    name: 'Singleton.Messenger.ToolsScene.TabView.Chats',
    components: {
      TabView, Chat, ListHeader, ModalActionList
    },
    data() {
      return {
        statusAction: false,
        actions: ['Создать чат', 'Создать групповой чат'],
        dialogs: [
          {
            title: 'Корпоративный Движ',
            name: 'Виталина',
            message: 'Ок, но ничего не понятно!',
            time: '04:20',
            img: './',
            unread: 2,
          },
          {
            title: 'Поездка в Чернобыль',
            name: 'Вы',
            message: 'Ребята, общий сбор в 9:30',
            time: '04:20',
            img: './',
            unread: 3,
          },
          {
            title: 'Татьяна Булатова',
            message: 'Офигеть, здесь можно переписыват...',
            time: '04:20',
            img: './',
            status: 'sent'
          },
          {
            title: 'Анастасия Куликова',
            message: 'Рада что все круто)',
            time: '04:20',
            img: './'
          },
          {
            title: 'Андрей Вашуленко',
            message: 'Погнали пилить апку, че его просто...',
            time: '04:20',
            img: './',
            status: 'delivered'
          },
          {
            title: 'Дмитрий Погодин',
            message: 'Погнали пилить апку, че его просто...',
            time: '04:20',
            img: './',
            status: 'sent'
          },
          {
            title: 'Нина Меркулова',
            message: 'Норм, а что по задачам?',
            time: '04:20',
            img: './',
            unread: 5,
          },
          {
            title: 'Дария Шевченко',
            message: 'Офигеть, здесь можно переписыват...',
            time: '04:20',
            img: './',
            status: 'sent'
          },
          {
            title: 'Поездка в Чернобыль',
            name: 'Вы',
            message: 'Ребята, общий сбор в 9:30',
            time: '04:20',
            img: './',
            status: 'delivered'
          },
          {
            title: 'Андрей Вашуленко',
            message: 'Погнали пилить апку, че его просто...',
            time: '04:20',
            img: './',
            status: 'sent'
          },
          {
            title: 'Анастасия Куликова',
            message: 'Рада что все круто)',
            time: '04:20',
            img: './'
          },
          {
            title: 'Андрей Вашуленко',
            message: 'Погнали пилить апку, че его просто...',
            time: '04:20',
            img: './',
            status: 'delivered'
          },
          {
            title: 'Дмитрий Погодин',
            message: 'Погнали пилить апку, че его просто...',
            time: '04:20',
            img: './',
            status: 'sent'
          },
          {
            title: 'Нина Меркулова',
            message: 'Норм, а что по задачам?',
            time: '04:20',
            img: './',
            unread: 5,
          },
          {
            title: 'Дария Шевченко',
            message: 'Офигеть, здесь можно переписыват...',
            time: '04:20',
            img: './',
            status: 'sent'
          },
          {
            title: 'Поездка в Чернобыль',
            name: 'Вы',
            message: 'Ребята, общий сбор в 9:30',
            time: '04:20',
            img: './',
            status: 'delivered'
          },
          {
            title: 'Андрей Вашуленко',
            message: 'Погнали пилить апку, че его просто...',
            time: '04:20',
            img: './',
            status: 'sent'
          },
          {
            "id": 1,
            "avatar": null,
            "type": "dialog",
            "title": "Андрей test_lastname",
            "userId": 1,
            "unread": 0,
            "status": "unread",
            "accessHash": "57f288f1394975e47b58165ebf8a2788ee60eb9d26f425f6d5a588f9134c2e5c",
            "isMuted": 0
          },
        ],
      }
    },
    methods: {
      ...mapMutations({
        routerNext: 'Messenger/ToolsScene/routerNext'
      }),
      makeAction(id){
        if(id === 1) {
          this.routerNext({name: 'create-group-chat'})
        }
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