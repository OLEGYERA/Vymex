<template>
  <div class="facade-navigation-tabs">
    <div class="navigation-tabs-header">
      <div class="rail-active-tab">
        <div class="navigation-tab-item" v-for="(tab, tabIndex) in tabs"
             :key="tabIndex" :ref="`tab-${tab}`" @click="$emit('onTab', tabIndex)">
          <title-caps :class="{active: currentTab === tabIndex}">{{tab}}</title-caps>
        </div>
        <div class="railTab" ref="railTab" :style="railTabStyle"></div>
      </div>
    </div>
    <div class="navigation-tabs-content">
      <div class="navigation-tab-content" :class="{active: currentTab === tabIndex}" v-for="(tab, tabIndex) in tabs" :key="tab">
        <transition name="vx-zoom">
          <div class="tab-content-body" v-if="currentTab === tabIndex">
            <slot :name="`tab-content-${tabIndex}`"/>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import TitleCaps from '@Facade/Title/Caps'

  export default {
    name: 'Facades.Navigation.Comeback',
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
        railTabStyle: {}
      }
    },
    methods: {
      changeTap(tabIndex){
        console.log(tabIndex)
      },
      updateRailTabStyle(){
        const navigationTab = this.$refs[`tab-${this.tabs[this.currentTab]}`];
        console.log(navigationTab)
        if(navigationTab){
          const railTab = navigationTab[0].getElementsByClassName('facade-title-caps')[0];
          this.railTabStyle = {
            width: railTab.offsetWidth + 'px',
            left: railTab.offsetLeft + 'px'
          }
          console.log(this.railTabStyle)

        }
      }
    },
    watch: {
      currentTab(){
        this.updateRailTabStyle();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-navigation-tabs{
    width: 100%;
    .navigation-tabs-header{
      display: flex;
      align-items: center;
      justify-content: center;
      .rail-active-tab{
        display: inline-flex;
        align-items: inherit;
        justify-content: inherit;
        position: relative;
        .navigation-tab-item {
          padding: 0 6px 10px;
          cursor: pointer;
          margin-right: rem(36);
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
          transition: $vx-tab-time all ease-in-out;
        }
      }
    }
    .navigation-tabs-content{
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
      .navigation-tab-content{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 0;
        &.active{
          z-index: 1;
          position: unset;
        }
      }
    }



  }
</style>