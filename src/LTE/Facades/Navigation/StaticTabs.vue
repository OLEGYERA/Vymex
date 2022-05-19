<template>
  <div class="facade-navigation-static-tabs">
    <div class="navigation-tabs-header">
      <div class="rail-active-tab">
        <div class="navigation-tab-item" v-for="(tab, tabIndex) in tabs"
             :key="tabIndex" :ref="`tab-${tab.title}`" @click="$emit('onTab', tabIndex)">
          <title-caps :class="{active: currentTab === tabIndex}">
            {{tab.title}}
            <span class="tab-item-counter" v-if="tab.count">{{tab.count}}</span>
          </title-caps>
        </div>
        <div class="railTab" ref="railTab" :style="railTabStyle"></div>
      </div>
      <div class="other-header-content">
        <slot name="header-content"/>
      </div>
    </div>
    <transition :name="tabTransitionName" mode="out-in">
      <template v-for="(tab, tabIndex) in tabs">
        <div class="navigation-tabs-content" :key="tabIndex" v-if="tabIndex === currentTab">
          <slot :name="`tab-content-${tabIndex}`"/>
        </div>
      </template>
    </transition>
  </div>
</template>

<script>
  import TitleCaps from '@Facade/Title/Caps'

  export default {
    name: 'Facades.Navigation.StaticTabs',
    components: {
      TitleCaps
    },
    props: {
      tabs: {
        type: Array,
        required: true,
        validator: (tabs => tabs.length > 1)
      },
      currentTab: Number
    },
    mounted() {
      this.updateRailTabStyle();
    },
    data(){
      return {
        tabTransitionName: 'tab-slot-left',
        railTabStyle: {}
      }
    },
    methods: {
      changeTap(tabIndex){
        console.log(tabIndex)
      },
      updateRailTabStyle(){
        const navigationTab = this.$refs[`tab-${this.tabs[this.currentTab].title}`];
        if(navigationTab){
          const railTab = navigationTab[0].getElementsByClassName('facade-title-caps')[0];
          this.railTabStyle = {width: railTab.offsetWidth + 'px',left: railTab.offsetLeft + 'px'}
        }
      }
    },
    watch: {
      currentTab(to, from){
        this.tabTransitionName = to < from ? 'tab-slot-right' : 'tab-slot-left'
        this.updateRailTabStyle();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-navigation-static-tabs{
    width: 100%;
    .navigation-tabs-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 0 12px;
      .rail-active-tab{
        display: inline-flex;
        align-items: inherit;
        justify-content: inherit;
        position: relative;
        .navigation-tab-item {
          padding: 0 0 10px;
          cursor: pointer;
          margin-right: rem(36);
          .tab-item-counter{
            color: $blue;
          }
          &:last-child{
            margin-right: 0;
          }
        }
        .railTab{
          width: 40px;
          height: 2px;
          position: absolute;
          bottom: 0;
          left: 0;
          background-color: $blue;
          transition: $vx-tab-time all ease;
        }
      }
    }
    .navigation-tabs-content{
      width: 100%;
      height: 100%;
      padding: 12px 0 24px;
      overflow: hidden;
      box-sizing: border-box;
      &.tab-slot-right{
        &-enter-active{
          transform: translateX(-30%);
          opacity: 0;
          transition: all 80ms ease;
        }
        &-enter-to{
          transform: translateX(0);
          opacity: 1;
        }
        &-leave-active {
          transform: translateX(0);
          opacity: 1;
          transition: all 80ms ease;
        }
        &-leave-to {
          transform: translateX(30%);
          opacity: 0;
        }
      }
      &.tab-slot-left{
        &-enter-active{
          transform: translateX(30%);
          opacity: 0;
          transition: all 80ms ease;
        }
        &-enter-to{
          transform: translateX(0);
          opacity: 1;
        }
        &-leave-active {
          transform: translateX(0);
          opacity: 1;
          transition: all 80ms ease;
        }
        &-leave-to {
          transform: translateX(-30%);
          opacity: 0;
        }
      }
    }

  }
</style>