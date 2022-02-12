<template>
  <div class="app-company-task">
    <router-view class="child-view"/>
  </div>
</template>


<script>
  // import ProfileFaq from '@Container/Vx/Profile/Faq'

  export default {
    name: 'app.vx.co.task',
    beforeCreate() {
      console.log(this.$route.params);
    }

  }
</script>


<style lang="scss" scoped>
  .app-company-task{
    position: relative;
    .child-view {
      width: 100%;
      position: absolute;
      transition: all .35s cubic-bezier(.55,0,.1,1);
      padding-bottom: 24px;
    }
  }
</style>