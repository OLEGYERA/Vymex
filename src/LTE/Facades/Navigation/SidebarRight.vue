<template>
  <aside class="facade-navigation-sidebar-right">
    <main class="sidebar-main">
      <div class="main-header"><slot name="main-header"/></div>
      <div class="main-content"><slot name="main-content"/></div>
    </main>
    <aside class="sidebar-aside">
      <panel-button class="panel-button-close"
                    @click.native="$emit('onClose')">
        <icon-error/>
      </panel-button>
      <template v-for="(tabIndex, tabKey) in tabList.group">
        <template v-if="tabIndex !== null">
          <panel-button :key="tabKey"
                        :class="{active: tabList.data[tabIndex].name === tabActive.name}"
                        @click.native="$emit('onChangeTab', tabIndex)">
            <component :is="tabList.data[tabIndex].iconName"/>
          </panel-button>
        </template>
        <template v-else>
          <div class="border" :key="tabKey"></div>
        </template>
      </template>
    </aside>
  </aside>
</template>


<script>
  export default {
    name: 'Facades.Navigation.SidebarRight',
    components: {
      PanelButton: {template: `<div class="singleton-side-button"><slot/></div>`}
    },
    props: {
      tabList: Object,
      tabActive: Object,
    },
  }
</script>

<style lang="scss" scoped>
  .facade-navigation-sidebar-right {
    main.sidebar-main{
      height: 100%;
      display: flex;
      flex-direction: column;
      .main-header{
        flex-shrink: 0;
      }
      .main-content{
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }
    .sidebar-aside{
      height: 100%;
      background-color: $grey-scale-500;
      border-left: $grey-scale-700 solid 1px;

      .singleton-side-button{
        width: 72px;
        height: 65px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $grey-scale-200;
        cursor: pointer;
      }

      .panel-button-close {
        border-bottom: $grey-scale-700 solid 1px;
      }
      .border {
        margin: 12px 18px;
        height: 1px;
        width: 36px;
        background-color: $grey-scale-400;
      }
      .active {
        background-color: $grey;
        .icon {
          color: #fff;
        }
      }
    }
  }
</style>