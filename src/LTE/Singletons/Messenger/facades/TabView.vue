<template>
  <div class="facade-tab-view">
    <div class="tab-view-header">
      <input-search :model="searchModel" :placeholder="searchPlaceholder" :disable="searchDisable" :exit="searchExit"
                    @onMounted="$emit('onSearchMounted', $event)"
                    @onExit="$emit('onSearchExit')"
                    @onSearch="sendData"
                    @click.native="$emit('onSearchClick')"/>
      <contacts>
        <template #title><slot name="header-title"/></template>
        <template #amount><slot name="header-amount"/></template>
      </contacts>
    </div>
    <div class="tab-view-content">
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
  import InputSearch from "@Facade/Input/Search";
  import Contacts from "@/LTE/Singletons/Messenger/Contacts";

  export default {
    name: 'Singleton.Messenger.Facades.TabView',
    components: {InputSearch, Contacts},
    props: {
      searchModel: [String, Number],
      searchPlaceholder: {
        type: String,
        required: true
      },
      searchDisable: Boolean,
      searchExit: Boolean,
    },
    created() {

    },
    data: () => ({
      search: '',
    }),
    methods: {
      sendData(data) {
        this.$emit('onSearch', data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-tab-view{
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .tab-view-header{
      flex-shrink: 0;

      .facade-input-search{
        margin-bottom: 12px;
        &[disable]{
          cursor: pointer;
          ::v-deep input{
            cursor: text;
          }
        }
      }
      .container-vx-contacts {
        position: sticky;
        margin-bottom: 4px;
      }
      .container-vx-group-chat {
        margin-bottom: 4px;
      }
    }
    .tab-view-content{
      height: 100%;
      overflow-y: scroll;
    }
  }
</style>