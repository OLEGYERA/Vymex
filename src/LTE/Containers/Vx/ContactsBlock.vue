<template>
  <div class="container-vx-contacts-block">
    <input-search :placeholder="placeholder"/>
    <contacts>
      <template #title>Контакты</template>
      <template #amount>{{contacts.length}}</template>
    </contacts>
    <person v-for="(contact, key) in contacts" :contact="contact" :key="key"/>
  </div>
</template>

<script>
  import Contacts from '@Container/Vx/Messenger/Contacts'
  import InputSearch from '@Facade/Input/Search'
  import Person from '@Container/Vx/Messenger/Person'
  export default {
    name: 'Container.Vx.ContactsBlock',
    components: {
      Contacts,
      InputSearch,
      Person
    },
    data() {
      return {
        placeholder: 'Поиск по контактам',
        contacts: [
           {
            name: 'Татьяна Булатова',
            nickname: '@lable_kers'
          },
           {
            name: 'Дария Шевченко',
            nickname: '@lable_kers'
          },
           {
            name: 'Анастасия Куликова',
            nickname: '@lable_kers'
          },
           {
            name: 'Андрей Вашуленко',
            nickname: '@lable_kers'
          },
          {
            name: 'Дмитрий Погодин',
            nickname: '@lable_kers'
          },
          {
            name: 'Андрей Вашуленко',
            nickname: '@lable_kers'
          },
          {
            name: 'Дария Шевченко',
            nickname: '@lable_kers'
          },
          {
            name: 'Дмитрий Погодин',
            nickname: '@lable_kers'
          },
          {
            name: 'Андрей Вашуленко',
            nickname: '@lable_kers'
          },
          {
            name: 'Дмитрий Погодин',
            nickname: '@lable_kers'
          },
          {
            name: 'Андрей Вашуленко',
            nickname: '@lable_kers'
          },
          {
            name: 'Дария Шевченко',
            nickname: '@lable_kers'
          },
          {
            name: 'Дмитрий Погодин',
            nickname: '@lable_kers'
          },
          {
            name: 'Андрей Вашуленко',
            nickname: '@lable_kers'
          },
          ],
      }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-input-search {
    margin-bottom: 12px;
  }
  .container-vx-contacts {
    margin-bottom: 4px;
  }
</style>