<template>
  <div class="app-vx">
    <main class="app-vx-main">
      <vx-navigation/>
      <div class="vx-body-space">
        <vx-header/>
        <div class="body-space-router-view" :class="{'not-adapt-styles': exceptionalStyle}">
          <div class="router-view-body">
            <router-view/>
          </div>
        </div>
      </div>
    </main>
    <section class="vx-other-apps">
      <messenger-app @change-messenger="changeMessenger" :open="open"/>
<!--      <notifications-app-->
<!--          @change-time="changeTime"-->
<!--          @change-switch="changeSwitch"-->
<!--          :switch="this.switch"-->
<!--          :chooseTime="chooseTime"-->
<!--      />-->
    </section>
  </div>
</template>


<script>
  import VxNavigation from '@Container/Vx/Navigation'
  import VxHeader from '@Container/Vx/Header'
  import {mapGetters} from 'vuex'
  const exceptionalRoutes = ['vx.msg'];

  import {MessengerApp} from '@Singletons'
  // import NotificationsApp from "@/LTE/Singletons/Notifications/app";

  export default {
    name: 'app.vx',
    components: {
      VxNavigation,
      VxHeader,
      MessengerApp,
      // NotificationsApp
    },
    data() {
      return {
        open: 'contacts',
        switch: false,
        chooseTime: 0,
      }
    },
    methods: {
      changeMessenger(type) {
        this.open = type;
      },
      changeSwitch() {
        if (this.switch) {
          this.chooseTime = 0;
        }
        this.switch = !this.switch;
        console.log(this.switch)
      },
      changeTime(timeKey) {
        this.chooseTime = timeKey;
      },
    },
    created() {
      this.$core.execViaComponent('Auth', 'user')
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
          height: 100%;
          box-sizing: border-box;
          padding: 24px 0;
          overflow-y: scroll;
          .router-view-body{
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