<template>
  <div class="facade-tab-view">
    <div class="tab-view-header">
      <input-search :model="searchModel" :placeholder="searchPlaceholder" :disable="searchDisable" :exit="searchExit"
                    @onMounted="$emit('onSearchMounted', $event)"
                    @onExit="$emit('onSearchExit')"
                    @onSearch="sendData"
                    @click.native="$emit('onSearchClick')"/>
    </div>
    <div class="list-header">
      <slot name="list-header"/>
    </div>
    <div class="tab-view-content">
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
  /*eslint-disable*/
  import InputSearch from "@Facade/Input/Search";
  import TitleCaps from "@Facade/Title/Caps";
  import IconAdd from "@Icon/Add";
  // import ActionList from "@Facade/Modal/ActionList";

  export default {
    name: 'Singleton.Messenger.Facades.TabView',
    components: {InputSearch, TitleCaps, IconAdd},
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
      items: ['Найти контакт', 'Пригласить в VYMEX'],
      actionListStatus: false,
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
    .list-header{
      margin-bottom: 4px;
    }
    .tab-view-content{
      height: 100%;
      overflow-y: scroll;
    }
  }
  .facade-messenger-contacts{
    width: 100%;
    padding: 4px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $grey;
    .contacts-amount{
      padding: 0 rem(3);
      color: $blue;
    }
    .add-item {
      position: relative;
      .icon-add{
        height: 24px;
        width: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        background-color: $grey-scale-400;
        border-radius: 8px;
        cursor: pointer;
      }
    }
  }
</style>