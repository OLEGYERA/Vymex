<template>
  <div class="container-vx-header">
    <div class="vx-header-body">
      <div class="vymex-logo">
        <img src="@/assets/img/vymex/base-reverse.svg" alt="">
      </div>
      <div class="header-icons">
        <div
          class="header-icon icon-alarm"
          @click="getNotify"
        >
          <icon-alarm/>
        </div>
        <div class="header-icon icon-comments"><icon-comments/></div>
      </div>
    </div>
    <vx-notifications
      :notify="notify"
      @get-notify="getNotify"
    />
    <div class="opacity" v-if="notify"></div>
  </div>
</template>

<script>
  import IconAlarm from '@Icon/Alarm'
  import IconComments from '@Icon/Comments'
  import VxNotifications from '@Container/Vx/Notifications'

  export default {
    name: 'Container.Vx.Header',
    components: {
      IconAlarm,
      IconComments,
      VxNotifications
    },
    data() {
      return {
        notify: false
      };
    },
    methods: {
      getNotify () {
        this.notify = !this.notify;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container-vx-header{
    width: 100%;
    box-sizing: border-box;
    padding: 12px 0;
    background-color: $grey-scale-500;
    .vx-header-body{
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .vymex-logo{
        height: 40px;
        img{
          height: 100%;
        }
      }
      .header-icons {
        display: flex;
        .header-icon {
          padding: 10px;
          cursor: pointer;
          height: 16px;
        }
        .icon-alarm {
          width: 16px;
          margin-right: 12px;
        }
      }
    }
    .opacity {
      width: 100%;
      height: 100%;
      z-index: 2;
      top: 0;
      left: 0;
      position: absolute;
      background-color: $grey-scale-700;
      opacity: 80%;
    }
  }
</style>