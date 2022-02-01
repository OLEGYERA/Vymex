<template>
  <div class="router-view search-router-view">
    <tab-view :search-model="search"
              :search-placeholder="sidebarView.tabActive.name==='chats' ? placeholderChats : placeholderContacts"
              search-exit
              @onSearchMounted="searchHooks = $event"
              @onSearch="filterContacts"
              @onSearchExit="$emit('closeRouter')">
      <template #header-title>Поиск</template>
      <template #header-amount>{{search ? filteredData.length : 0}}</template>

      <template #content v-if="search">
        <template v-if="sidebarView.tabActive.name==='chats'">
          <chat
              v-for="(dialog, key) in filteredData"
              :dialog="dialog"
              :key="key"/>
        </template>
        <template v-if="sidebarView.tabActive.name==='contacts'">
          <person
              v-for="(contact, key) in filteredData"
              :contact="contact"
              :key="key"/>
        </template>
      </template>
    </tab-view>
  </div>
</template>

<script>
  /*eslint-disable*/
  import TabView from "../../facades/TabView"
  import Chat from "@/LTE/Singletons/Messenger/Chat";
  import Person from "@/LTE/Singletons/Messenger/Person";
  import {mapGetters} from "vuex";

  export default {
    name: 'Singleton.Messenger.Views.Sidebar.Search.Router',
    components: {
      TabView, Chat, Person
    },
    activated() {
      this.searchHooks.focusInput?.();
    },
    data: () => ({
      search: '',
      searchHooks: {},
      placeholderChats: 'Поиск по диалогам',
      placeholderContacts: 'Поиск по контактам',
      chats: [
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
      contacts: [
        {
          title: 'Татьяна Булатова',
          alias: '@lable_kers'
        },
        {
          title: 'Дария Шевченко',
          alias: '@lable_kers'
        },
        {
          title: 'Анастасия Куликова',
          alias: '@lable_kers'
        },
        {
          title: 'Андрей Вашуленко',
          alias: '@lable_kers'
        },
        {
          title: 'Дмитрий Погодин',
          alias: '@lable_kers'
        },
        {
          title: 'Андрей Вашуленко',
          alias: '@lable_kers'
        },
        {
          title: 'Дария Шевченко',
          alias: '@lable_kers'
        },
        {
          title: 'Дмитрий Погодин',
          alias: '@lable_kers'
        },
        {
          title: 'Андрей Вашуленко',
          alias: '@lable_kers'
        },
        {
          title: 'Дмитрий Погодин',
          alias: '@lable_kers'
        },
        {
          title: 'Андрей Вашуленко',
          alias: '@lable_kers'
        },
        {
          title: 'Дария Шевченко',
          alias: '@lable_kers'
        },
        {
          title: 'Дмитрий Погодин',
          alias: '@lable_kers'
        },
        {
          title: 'Андрей Вашуленко',
          alias: '@lable_kers'
        },
      ],
    }),
    methods: {
      filterContacts(data) {
        this.search = data
      }
    },
    computed: {
      filteredData: function () {
        return this[this.sidebarView.tabActive.name].filter((data) => {
          return this.search.trim().split(' ').every(searchWord => {
            return data.title.split(' ').some(titleWord => titleWord.toLowerCase().startsWith(searchWord.toLowerCase()))
          })
        })
      },
      ...mapGetters({
        sidebarView: 'Messenger/sidebarView',
      })
    }
  }
</script>
<!--|| data.title.toLowerCase().startsWith(this.search.trim().toLowerCase())-->
<style lang="scss" scoped>
  .search-router-view{

  }
</style>