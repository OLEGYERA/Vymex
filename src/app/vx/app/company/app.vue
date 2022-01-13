<template>
  <div class="app-profile-company">
    <transition :name="transitionName">
     <router-view class="child-view"/>
    </transition>
  </div>
</template>


<script>
  // import ProfileFaq from '@Container/Vx/Profile/Faq'

  export default {
    name: 'app.vx.company',
    data(){
      return {
        transitionName: 'vx-swap-left'
      }
    },
    beforeRouteUpdate (to, from, next) {
      const toDepth = to.name.split('.').length
      const fromDepth = from.name.split('.').length
      console.log(toDepth, fromDepth, to)
      this.transitionName = toDepth < fromDepth ? 'vx-swap-right' : 'vx-swap-left'
      next()
    },
  }
</script>


<style lang="scss" scoped>
  .app-profile-company{
    position: relative;
    .child-view {
      width: 100%;
      position: absolute;
      transition: all .75s cubic-bezier(.55,0,.1,1);
      padding-bottom: 24px;
    }
  }
</style>