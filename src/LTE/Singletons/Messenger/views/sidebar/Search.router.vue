<template>
  <div class="router-view search-router-view">
    <tab-view :search-model="search"
              search-placeholder="Поиск по контактам и чатам"
              search-exit
              @onSearchMounted="searchHooks = $event"
              @onSearch="filterContacts"
              @onSearchExit="$emit('closeRouter')">
      <template #header-title>Поиск</template>
      <template #header-amount>{{search ? searchedContacts.length : 0}}</template>
      <template #content>
        <person v-for="(contact, key) in searchedContacts" :data="contact" :key="key" @onClick="openPersonData"/>
      </template>
    </tab-view>
  </div>
</template>

<script>
  /*eslint-disable*/
  import TabView from "../../facades/TabView"
  import Chat from "@/LTE/Singletons/Messenger/facades/Chat";
  import Person from "@/LTE/Singletons/Messenger/facades/Person";
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
    }),
    methods: {
      filterContacts(model) {
        this.$core.execViaComponent('MsgUser', 'search', model);
        this.search = model
      },
      openPersonData(personID){
        this.$core.execViaComponent('MsgUser', 'full', personID);
        this.$emit('updateRouter', 'contact-info');
      }
    },
    computed: {
      ...mapGetters({
        sidebarView: 'Messenger/sidebarView',
        searchedContacts: 'Messenger/getSearchedContacts',

      }),
    },
    mounted() {
      console.log('111')
    }
  }
</script>

<style lang="scss" scoped>
  .search-router-view{

  }
</style>