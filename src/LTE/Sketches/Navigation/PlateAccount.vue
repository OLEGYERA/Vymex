<template>
  <div class="sketch-navigation-plate-account">
    <transition name="vx-center-right">
      <div class="navigation-plate-body" v-if="tiny">
        <plate-account tiny :category="category" :data="data" :active="active" @click.native="routerPush(data.id)"/>
      </div>
    </transition>
    <transition name="vx-center-left">
      <div class="navigation-plate-body" v-if="!tiny">
        <plate-account :category="category" :data="data" :active="active" @click.native="routerPush"/>
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
      router: {
        type: Object,
        // required: true
      },
      data: Object,
      active: Boolean
    },
    components: {
      PlateAccount
    },
    methods: {
      routerPush(){
        this.$core.execViaComponent('Company', 'get', this.router.params.companyID)
        this.$router.push(this.router).catch(() => {})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sketch-navigation-plate-account{
    display: flex;
    align-items: center;
    cursor: pointer;
    .navigation-plate-body{
      flex-shrink: 0;
      width: 100%;
    }
    .facade-plate-account{
      margin: 0 20px;
      width: calc(100% - 20px * 2);
      cursor: pointer;
      &.plate-account-tiny{
        margin: 0 4px;
        width: calc(100% - 4px * 2);
      }
    }
  }
</style>