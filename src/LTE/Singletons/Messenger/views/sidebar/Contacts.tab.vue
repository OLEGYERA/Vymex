<template>
  <div class="contacts-tab-view">
    <tab-view :search-placeholder="'Поиск по контактам'" search-disable
              @onSearchClick="$emit('updateRouter', 'search')">
      <template #header-add>
        <header-add>
          <template #header-title>Контакты</template>
          <template #header-amount>{{contacts.length}}</template>
        </header-add>
      </template>
      <template #content>
        <div class="chats-table">
          <person v-for="(contact, key) in contacts" :contact="contact" :key="key"/>
        </div>
      </template>
    </tab-view>
  </div>
</template>

<script>
import TabView from "../../facades/TabView"
import Person from "@/LTE/Singletons/MessengerDff/facade/Person";
import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";

export default {
  name: 'Singleton.Messenger.Views.Sidebar.Contacts.Tab',
  components: {
    TabView, Person, HeaderAdd
  },
  data() {
    return {
      placeholder: 'Поиск по диалогам',
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
    }
  },
}
</script>

<style lang="scss" scoped>
.contacts-tab-view{
  .facade-tab-view{
    min-width: 372px;
  }
}
</style>