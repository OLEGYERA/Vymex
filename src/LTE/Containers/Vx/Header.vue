<template>
  <div class="container-vx-header" :class="{co: exceptionalStyle}">
    <div class="vx-header-body">
      <div class="header-icons">
        <div @click="notificationsShow()">
          <icon-alarm/>
        </div>
        <div @click="messengerShow()">
          <icon-comments/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import IconAlarm from '@Icon/Alarm'
  import IconComments from '@Icon/Comments'
  import {mapMutations} from 'vuex'

  export default {
    name: 'Container.Vx.Header',
    components: {
      IconAlarm,
      IconComments,
    },
    computed: {
      exceptionalStyle(){
        return this.$route.name.indexOf('vx.co') !== -1;
      }
    },
    methods: {
      ...mapMutations({
        messengerShow: 'Messenger/show',
        notificationsShow: 'Notifications/showNotifications'
      })
    },
  }
</script>

<style lang="scss" scoped>
  .container-vx-header{
    width: 100%;
    height: 64px;
    padding: 12px 0;
    box-sizing: border-box;
    flex-shrink: 0;
    background-color: $grey-scale-500;
    .vx-header-body{
      padding: 0 20px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .header-icons {
        display: flex;
        .icon {
          padding: 10px;
          cursor: pointer;
          height: 16px;
          color: $grey-scale-200;
        }
        .icon-alarm {
          width: 16px;
          margin-right: 12px;
        }
      }
    }
    &.co{
      background-color: $su-level-1;
    }
  }
</style>