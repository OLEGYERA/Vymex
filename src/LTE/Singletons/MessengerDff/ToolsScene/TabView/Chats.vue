<template>
  <div class="tab-view-chats">
    <tab-view :search-placeholder="'Поиск по контактам и чатам'" search-disable
              @onSearchClick="$emit('routerAdd', {name: 'search'})">
      <template #list-header>
        <list-header :title="'Чаты'" :title-count="dialogs.length"/>
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
  import Chat from "@/LTE/Singletons/Messenger/facades/Chat";
  import ListHeader from "@Facade/Navigation/ListHeader";

  export default {
    name: 'Singleton.Messenger.ToolsScene.TabView.Chats',
    components: {
      TabView, Chat, ListHeader
    },
    data() {
      return {
        placeholder: 'Поиск по диалогам',
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
        ],
      }
    },
    mounted() {
      console.log(666)
    }
  }
</script>


<style lang="scss" scoped>
  .tab-view-chats{

  }
</style>