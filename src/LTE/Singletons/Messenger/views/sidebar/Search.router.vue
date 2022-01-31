<template>
  <div class="router-view search-router-view">
    <tab-view :search-model="search" :search-placeholder="'Поиск по диалогам'" search-exit
              @onSearchMounted="searchHooks = $event"
              @onSearchExit="$emit('closeRouter')">
      <template #header-title>Поиск</template>
      <template #header-amount>0</template>

      <template #content>
        121212
<!--        <div class="chats-table">-->
<!--          <chat v-for="(dialog, key) in dialogs" :dialog="dialog" :key="key"></chat>-->
<!--        </div>-->
      </template>
    </tab-view>
  </div>
</template>

<script>
  /*eslint-disable*/
  import TabView from "../../facades/TabView"
  import Chat from "@/LTE/Singletons/Messenger/Chat";

  export default {
    name: 'Singleton.Messenger.Views.Sidebar.Search.Router',
    components: {
      TabView, Chat
    },
    activated() {
      this.searchHooks.focusInput?.();
    },
    data: () => ({
      search: '',
      searchHooks: {}
    }),

  }
</script>

<style lang="scss" scoped>
  .search-router-view{

  }
</style>