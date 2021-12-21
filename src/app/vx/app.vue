<template>
  <div class="app-vx">
    <vx-navigation/>
    <div class="vx-body-space">
      <vx-header/>
      <div class="body-space-router-view">
        <div class="router-view-body">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import VxNavigation from '@Container/Vx/Navigation'
  import VxHeader from '@Container/Vx/Header'
  import {mapGetters} from 'vuex'

  export default {
    name: 'app.vx',
    components: {
      VxNavigation,
      VxHeader
    },
    created() {
      console.log('Vx App')
    },
    computed: {
      ...mapGetters(['getPage'])
    },
    beforeRouteLeave(to, from, next){
      console.log(this.getPage, to, from, next)
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
    .vx-body-space{
      display: flex;
      flex-direction: column;
      width: 100%;
      .body-space-router-view{
        height: 100%;
        box-sizing: border-box;
        padding: 24px 0;
        overflow-y: scroll;
        .router-view-body{
          max-width: 796px;
          margin: 0 auto;
        }
      }
    }
  }
</style>