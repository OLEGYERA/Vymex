<template>
  <div class="app-vx">
    <vx-navigation/>
    <div class="vx-body">
      <router-view/>
    </div>
  </div>
</template>


<script>
  import VxNavigation from '@Container/Vx/Navigation'
  export default {
    name: 'app.vx',
    components: {
      VxNavigation
    }
  }
</script>


<style lang="scss" scoped>
  .app-vx{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    background-color: $grey;
    .vx-body{
      width: 100%;
      height: 100%;
    }
  }
</style>