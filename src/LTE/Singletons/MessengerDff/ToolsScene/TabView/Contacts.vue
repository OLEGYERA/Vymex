<template>
  <div class="tab-view-contacts">
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
  import TabView from "../../facade/TabView"
  import Person from "@/LTE/Singletons/Messenger/facades/Person";
  import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";

  export default {
    name: 'Singleton.Messenger.ToolsScene.TabView.Contacts',
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
  .tab-view-contacts{
    //background-color: #EA5455;
  }
</style>