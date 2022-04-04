<template>
  <div class="router-add-users-view">
    <name name="Добавить в чат" @onClick="routerBack()"/>
    <div class="add-users-header">
      <input-search :model="searchModel" :placeholder="'Поиск по контактам'"/>

      <title-caps>
        Контакты
        <span class="list-title-counter">{{ contacts.length }}</span>
      </title-caps>
    </div>

    <div class="add-users-contacts-table">
      <person-checkbox v-for="(contact, key) in contacts"
              :data="contact" :key="key" :model="contact.details.checked" @onClick="chooseUser(key)"/>
    </div>

    <div class="button-next">
      <button-base :disable="contacts.every(contact => contact.details.checked === false)" @onClick="onConfirm">Далее</button-base>
    </div>
  </div>
</template>

<script>
  import Name from "@/LTE/Singletons/MessengerDff/facade/Name";
  import PersonCheckbox from "@/LTE/Singletons/MessengerDff/facade/PersonCheckbox";
  import InputSearch from "@Facade/Input/Search";
  import TitleCaps from '@Facade/Title/Caps'
  import ButtonBase from '@Facade/Button/Base'

  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'Singleton.Messenger.ToolsScene.TabView.Contacts',
    components: {
      PersonCheckbox, InputSearch,
      Name, TitleCaps, ButtonBase
    },
    data() {
      return {
        searchModel: '',
      }
    },
    computed: {
      ...mapGetters({
        contacts: 'Messenger/contactsAll',
      }),
    },
    methods: {
      ...mapMutations({
        routerNext: 'Messenger/ToolsScene/routerNext',
        routerBack: 'Messenger/ToolsScene/routerBack',
        selectContacts: 'Messenger/selectContacts',
        chooseUser: 'Messenger/chooseUser'
      }),
      onConfirm() {
        this.routerBack()
        this.selectContacts()
        this.$notify({text: 'Участники добавлены', type: 'success', duration: 3000, speed: 500})

      }
    },
    created() {
      this.$core.execViaComponent('MsgUser', 'search', '');
    },
    updated() {
      console.log(this.contacts, 'updated')
    },
    mounted() {
      console.log(this.contacts, 'mounted')
    }
  }
</script>


<style lang="scss" scoped>
  .router-add-users-view{
    height: 100%;
    display: flex;
    flex-direction: column;
    //justify-content: space-between;
    box-sizing: border-box;
    padding: 8px 0 24px;
    .facade-messenger-name{
      margin-bottom: 24px;
    }
    .add-users-header{
      padding: 0 20px;

      .facade-input-search{
        margin-bottom: 12px;
      }
      .facade-title-caps{
        padding: 8px 0;
        margin-bottom: 4px;
        .list-title-counter{
          color: $blue;
        }
      }
    }
    .add-users-contacts-table{
      padding: 0 20px;
      overflow-y: scroll;
      margin-bottom: 24px;
      max-height: 528px;
    }
    .button-next{
      padding: 0 20px;
    }
  }
</style>