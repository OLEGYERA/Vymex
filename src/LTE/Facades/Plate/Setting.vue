<template>
  <div class="facade-plate-setting">
    <div class="plate-setting-body">
      <div class="setting-left-group">
        <div class="setting-avatar" :class="{'disable': disable}">
          <slot name="icon"/>
        </div>
        <div class="setting-title">
          <text-base><slot name="title"/></text-base>
        </div>
      </div>
      <div class="setting-right-group">
        <span class="setting-additional"><slot name="additional"/></span>
        <icon-arrow-right/>
      </div>
    </div>
  </div>
</template>

<script>
  import TextBase from '@Facade/Text/Base'
  import IconArrowRight from '@Icon/ArrowRight'

  export default {
    /*eslint-disable*/
    name: 'Facade.Plate.Setting',
    props: {
      disable: Boolean
    },

    components: {
      TextBase,
      IconArrowRight,
    },
  }
</script>

<style lang="scss" scoped>
  .facade-plate-setting{
    width: 100%;
    box-sizing: border-box;
    .plate-setting-body{
      padding: 12px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba($grey-scale-400, .5);
      .setting-left-group{
        display: inherit;
        align-items: center;
        .setting-avatar{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: $blue-scale-700;
          margin-right: 12px;
          .icon{
            max-height: 16px;
            color: $blue;
          }
          &.disable {
            background-color: rgba($grey-scale-200, .2);
          }
        }
        .facade-text-base{
          color: #fff;
        }
      }
      .setting-right-group{
        display: flex;
        align-items: flex-start;
        .icon-arrow-right{
          height: 14px;
          margin-left: 20px;
          color: $grey-scale-200;
          ::v-deep{
            svg{
              height: 100%;
            }
          }
        }
      }

    }
  }
</style>