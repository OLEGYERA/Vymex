<template>
  <div class="app-auth">
    <div class="router-view-box"><router-view/></div>
    <div class="static-box">
      <static-demo/>
    </div>
  </div>
</template>

<script>
  import StaticDemo from './static/demo'
  export default {
    name: 'app.auth',
    components: {StaticDemo}
  }
</script>


<style lang="scss" scoped>
  .app-auth{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .router-view-box{
      width: 60%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .static-box{
      width: 40%;
      height: 100%;
    }
  }

  @media (max-width: 1400px) {
    .app-auth{
      .router-view-box,
      .static-box{
        width: 50%;
      }
    }
  }
</style>