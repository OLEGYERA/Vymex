<template>
  <div class="sketch-navigation-plate-setting">
    <transition name="vx-center-right">
      <div class="navigation-plate-body" v-if="tiny">
        <div class="plate-setting plate-setting-tiny">
          <div class="icon-box"><slot name="icon"/></div>
        </div>
      </div>
    </transition>
    <transition name="vx-center-left">
      <div class="navigation-plate-body" v-if="!tiny">
        <div class="plate-setting">
          <div class="icon-box"><slot name="icon"/></div>
          <text-base><slot name="title"/></text-base>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import TextBase from '@Facade/Text/Base'
  export default {
    name: 'Sketch.Navigation.PlateSetting',
    props: {
      tiny: {
        type: Boolean,
        required: true
      }
    },
    components: {
      TextBase
    }
  }
</script>

<style lang="scss" scoped>
  .sketch-navigation-plate-setting{
    display: flex;
    align-items: center;
    .navigation-plate-body{
      flex-shrink: 0;
      width: 100%;
    }
    .plate-setting{
      cursor: pointer;
      display: flex;
      align-items: center;
      color: $grey-scale-200;
      margin: 10px 20px;
      width: calc(100% - 20px * 2);
      .icon-box{
        margin-right: 12px;
        padding-top: 2px;
        height: 20px;
        box-sizing: border-box;
      }
      .facade-text-base{
        white-space: nowrap;
      }
      &.plate-setting-tiny{
        margin: 10px 4px;
        justify-content: center;
        align-items: center;
        width: calc(100% - 4px * 2);
        .icon-box{
          margin-right: 0;
        }
      }
    }
  }
</style>