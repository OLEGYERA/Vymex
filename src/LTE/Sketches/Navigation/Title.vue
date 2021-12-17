<template>
  <div class="sketch-navigation-title">
    <transition name="vx-center-right">
      <div class="navigation-title-body" v-if="tiny">
        <title-caps tiny><slot name="icon"/></title-caps>
      </div>
    </transition>
    <transition name="vx-center-left">
      <div class="navigation-title-body" v-if="!tiny">
        <title-caps><slot name="title"/></title-caps>
      </div>
    </transition>
  </div>
</template>

<script>
  import TitleCaps from '@Facade/Title/Caps'

  export default {
    name: 'Sketch.Navigation.Title',
    props: {
      tiny: {
        type: Boolean,
        required: true
      }
    },
    components: {
      TitleCaps
    }
  }
</script>

<style lang="scss" scoped>
  .sketch-navigation-title{
    padding: 8px 0;
    display: flex;
    align-items: center;
    .navigation-title-body{
      flex-shrink: 0;
      min-width: 100%;
    }
    .facade-title-caps{
      margin: 0 20px;
      width: calc(100% - 40px);
      white-space: nowrap;
      &.title-caps-tiny{
        margin: 0;
        width: 100%;
        text-align: center;
      }
      ::v-deep{
        .icon{
          height: 16px;
        }
      }
    }
  }
</style>