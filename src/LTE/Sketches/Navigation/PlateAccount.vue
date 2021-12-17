<template>
  <div class="sketch-navigation-plate-account">
    <transition name="vx-center-right">
      <div class="navigation-plate-body" v-if="tiny">
        <plate-account tiny :category="category" :data="data"/>
      </div>
    </transition>
    <transition name="vx-center-left">
      <div class="navigation-plate-body" v-if="!tiny">
        <plate-account :category="category" :data="data"/>
      </div>
    </transition>
  </div>
</template>

<script>
  import PlateAccount from '@Facade/Plate/Account'

  export default {
    name: 'Sketch.Navigation.PlateAccount',
    props: {
      tiny: {
        type: Boolean,
        required: true
      },
      category: {
        type: String,
        default: 'create-company',
      },
      data: Object
    },
    components: {
      PlateAccount
    }
  }
</script>

<style lang="scss" scoped>
  .sketch-navigation-plate-account{
    display: flex;
    align-items: center;
    .navigation-plate-body{
      flex-shrink: 0;
      width: 100%;
    }
    .facade-plate-account{
      margin: 0 20px;
      width: calc(100% - 20px * 2);
      &.plate-account-tiny{
        margin: 0 4px;
        width: calc(100% - 4px * 2);
      }
    }
  }
</style>