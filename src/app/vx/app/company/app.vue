<template>
  <div class="app-company">
    <div class="app-company-navigation">
      <navigation-panel/>
    </div>
    <div class="app-company-main">
      <div class="router-view-body">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import NavigationPanel from "@Container/PanelNavigation/app";

  export default {
    name: 'vx.co.app',
    components: {
      NavigationPanel
    }
  }
</script>

<style lang="scss" scoped>
  .app-company{
    width: 100%;
    height: 100%;
    display: flex;
    .app-company-navigation{
      height: 100%;
      width: 60px;
      position: relative;
      .container-navigation-panel{
        position: fixed;
        height: calc(100% - 64px);
      }
    }
    .app-company-main{
      width: 100%;
      height: 100%;
      .router-view-body{
        padding-top: 24px;
        max-width: 796px;
        margin: 0 auto;
      }
    }
  }
</style>