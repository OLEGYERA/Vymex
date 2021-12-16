<template>
  <div class="launch-view">
    <transition name="fade">
      <div class="vymex-logo" v-if="showLogo">
        <img src="@/assets/img/vymex/base-reverse.svg" alt="">
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'auth.launch',
  mounted() {
    this.showLogo = true;
  },
  data() {
    return{
      showLogo: false
    }
  },
  beforeRouteLeave(to, from, next){
    this.showLogo = false;
    setTimeout(() => next(), 500)
  }
}
</script>

<style lang="scss" scoped>
  .launch-view{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("~@/assets/img/bg/static-demo.png"), linear-gradient(332.46deg, #1C3049 1.02%, #181F26 57.57%, #1890FF 225.95%);
    background-size: cover;
    .vymex-logo{
      width: 400px;
      img{
        width: 100%;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>