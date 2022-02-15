<template>
  <div class="app-vx">
    <main class="app-vx-main">
      <vx-navigation/>
      <div class="vx-body-space">
        <vx-header/>
        <div class="body-space-router-view" :class="{'not-adapt-styles': exceptionalStyle}">
          <navigation-panel/>
          <div class="router-view-body">
            <router-view/>
          </div>
        </div>
      </div>
    </main>
    <section class="vx-other-apps">
      <notifications-app/>
      <messenger-app/>
    </section>
  </div>
</template>

<script>
/*eslint-disable*/
  import VxNavigation from '@Container/Vx/Navigation'
  import VxHeader from '@Container/Vx/Header'

  import {mapGetters} from 'vuex'
  import NavigationPanel from "@Container/PanelNavigation/app";
  const exceptionalRoutes = ['vx.msg'];

  export default {
    name: 'app.vx',
    components: {
      VxNavigation,
      VxHeader,
      MessengerApp: async () => (await import('@Singletons')).MessengerApp,
      NotificationsApp: async () => (await import('@Singletons')).NotificationsApp,
      NavigationPanel
    },
    created() {
      // for (let i=0; i<5000; i++) {
      //   console.log('Тест получения: ' + i);
      //   this.$core.execViaComponent('Auth', 'user');
      // }
      this.$core.execViaComponent('Auth', 'user');
      this.$core.execViaComponent('Company', 'getUserCompanies');
    },
    computed: {
      ...mapGetters(['getPage']),
      exceptionalStyle(){
        return exceptionalRoutes.some(exceptionalRoute => this.$route.name.indexOf(exceptionalRoute) !== -1)
      }
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
    overflow: hidden;
    background-color: $grey;
    position: relative;
    .app-vx-main{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      .vx-body-space{
        display: flex;
        flex-direction: column;
        width: 100%;
        .body-space-router-view{
          display: flex;
          height: 100%;
          box-sizing: border-box;
          overflow-y: scroll;
          .router-view-body{
            width: 83.1%;
            max-width: 796px;
            margin: 0 auto;
          }
          &.not-adapt-styles{
            padding: 0;
            .router-view-body {
              max-width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .vx-other-apps{

    }
  }
</style>