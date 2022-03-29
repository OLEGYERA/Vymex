<template>
  <div class="router-view-search">
    <tab-view :search-model="search"
              search-placeholder="Поиск по контактам и чатам"
              search-exit
              @onSearchMounted="searchHooks = $event"
              @onSearch="filterContacts"
              @onSearchExit="$emit('routerBack')">
      <template #list-header>
        <div class="search-header">
          <title-caps>
            Найдено
            <span class="searched-contacts">{{searchedContacts.length && search ? searchedContacts.length : ''}}</span>
          </title-caps>
        </div>
      </template>
      <template #content>
        <div class="found-contacts-group" v-if="search && searchedContacts.length">
          <person v-for="(contact, key) in searchedContacts" :data="contact" :key="key" @onClick="openPersonData"/>
        </div>
        <div class="search-contacts-plate" v-else-if="!search">
          <img class="empty-plate-img" src="@/assets/img/my/search.svg">
          <div class="empty-plate-title">Поиск контактов</div>
        </div>
        <div class="search-contacts-plate" v-else>
          <img class="empty-plate-img" src="@/assets/img/my/no-search.svg">
          <div class="empty-plate-title">Результатов поиска нет</div>
        </div>
      </template>
    </tab-view>
  </div>
</template>

<script>
  /*eslint-disable*/
  import TabView from "../../facade/TabView"
  import Chat from "@/LTE/Singletons/Messenger/facades/Chat";
  import Person from "@/LTE/Singletons/MessengerDff/facade/PersonSearch";
  import TitleCaps from '@Facade/Title/Caps'
  import  {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'Singleton.Messenger.ToolsScene.RouterView.Search',
    components: {
      TabView, Chat, Person, TitleCaps
    },
    activated() {
      this.searchHooks.focusInput?.();
    },
    data: () => ({
      search: '',
      searchHooks: {},
    }),
    methods: {
      ...mapMutations({
        routerNext: 'Messenger/ToolsScene/routerNext'
      }),
      filterContacts(model) {
        this.$core.execViaComponent('MsgUser', 'search', model);
        this.search = model
      },
      openPersonData(personID){
        console.log(personID)
        this.$core.execViaComponent('MsgUser', 'full', personID);
        // this.$emit('routerNext', 'contact-info');
        this.routerNext({name: 'contact-info'})
      }
    },
    computed: {
      ...mapGetters({
        searchedContacts: 'Messenger/getSearchedContacts',
        currentContact: 'Messenger/getCurrentContact'
      }),
    }
  }
</script>


<style lang="scss" scoped>
  .router-view-search{
    .search-header{
      padding: rem(8) 0;
      margin-bottom: 4px;
      display: flex;
      .searched-contacts{
        color: $blue;
      }
    }
    .search-contacts-plate{
      height: 108px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .empty-plate-img{
        margin-bottom: 8px;
      }
      .empty-plate-title{
        font-weight: 600;
        font-size: 17px;
        line-height: 22px;
        color: $grey-scale-300;
      }
    }
  }
</style>