<template>
  <div class="singleton-messenger-dialogs-block">
    <input-search :placeholder="placeholder" v-model="search"/>
    <div>{{search}}</div>
    <contacts>
      <template #title>Диалоги</template>
      <template #amount>{{dialogs.length}}</template>
    </contacts>
    <chat v-for="(dialog, key) in dialogs" :dialog="dialog" :key="key"></chat>
  </div>
</template>

<script>
import Contacts from '@/LTE/Singletons/Messenger/Contacts'
import InputSearch from '@Facade/Input/Search'
import Chat from '@/LTE/Singletons/Messenger/Chat'

export default {
  name: 'Singleton.Messenger.DialogsBlock',
  components: {
    Contacts,
    InputSearch,
    Chat,
  },
  data() {
    return {
      placeholder: 'Поиск по диалогам',
      search: '',
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
          img: './'
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
          img: './'
        },
        {
          title: 'Дмитрий Погодин',
          message: 'Погнали пилить апку, че его просто...',
          time: '04:20',
          img: './'
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
          img: './'
        },
        {
          title: 'Поездка в Чернобыль',
          name: 'Вы',
          message: 'Ребята, общий сбор в 9:30',
          time: '04:20',
          img: './'
        },
        {
          title: 'Андрей Вашуленко',
          message: 'Погнали пилить апку, че его просто...',
          time: '04:20',
          img: './'
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
  .facade-input-search {
    margin-bottom: 12px;
  }
  .container-vx-contacts {
    position: sticky;
    margin-bottom: 4px;
  }
  .container-vx-group-chat {
    margin-bottom: 4px;
  }
</style>