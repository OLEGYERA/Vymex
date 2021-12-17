<template>
  <div class="app-vx-profile">
    <div class="vx-profile-body">
      <profile-faq/>
    </div>
  </div>
</template>


<script>
  import ProfileFaq from '@Container/Vx/Profile/Faq'

  export default {
    name: 'app.vx.profile',
    components: {
      ProfileFaq
    }
  }
</script>


<style lang="scss" scoped>
  .app-vx-profile{
    padding: 24px 0;
    height: 100%;
    box-sizing: border-box;
    .vx-profile-body{
      width: 100%;
      height: 100%;
      max-width: 796px;
      margin: 0 auto;
    }
  }
</style>