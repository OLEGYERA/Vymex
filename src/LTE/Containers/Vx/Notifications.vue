<template>
  <div class="container-vx-notifications" :class="{visible: notify}">
      <div class="notifications-block">
        <div class="notifications-head">
          <div class="info">
            <title-sub>Уведомления</title-sub>
            <div class="info-amount">24</div>
          </div>
          <icon-points-vertical/>
        </div>
        <div class="notifications-main">
          <transition name="blocks">
            <messages-block v-if="openMessages"/>
            <disable-notif v-else-if="disable" @changeIcon="changeIcon" :chooseTime="chooseTime"/>
            <!--          <no-notifications v-else/>-->
          </transition>
        </div>
      </div>
      <div class="side-panel">
        <div class="side-button" @click="$emit('get-notify')">
          <icon-error/>
        </div>
        <div
            class="side-button side-button-special"
            :class="{active: disable}"
            @click="$emit('open-disable')"
        >
          <icon-volume :class="{active: disable}" v-if="chooseTime === null"/>
          <icon-volume-off :class="{active: disable}" v-else/>
        </div>
        <div class="side-button side-button-special">
          <icon-setting/>
        </div>
      </div>
    </div>
</template>

<script>
  import IconError from '@Icon/Error'
  import IconSetting from '@Icon/Setting'
  import IconPointsVertical from '@Icon/PointsVertical'
  import IconVolume from '@Icon/Volume'
  import IconVolumeOff from '@Icon/VolumeOff'
  import DisableNotif from '@Container/Vx/DisableNotif'
  import MessagesBlock from '@Container/Vx/MessagesBlock'
  import TitleSub from '@Facade/Title/Sub'
  // import NoNotifications from '@Container/Vx/NoNotifications'

  export default {
    name: 'Container.Vx.Notifications',
    components: {
      IconError,
      IconSetting,
      IconPointsVertical,
      IconVolume,
      DisableNotif,
      MessagesBlock,
      IconVolumeOff,
      TitleSub,
      // NoNotifications
    },
    data() {
      return {
        chooseTime: null,
      };
    },
    props: {
      notify: Boolean,
      openMessages: Boolean,
      disable: Boolean,
    },
    methods: {
      changeIcon(key) {
        if (this.chooseTime === key) {
          this.chooseTime = null
        } else {
          this.chooseTime = key
        }
      }
    }
  } 
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }
  .container-vx-notifications {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 3;
    display: flex;
    height: 100%;
    background-color: $grey;
    width: 444px;
    transform: translateX(100%);
    transition: transform 0.4s;
    .notifications-block {
      .notifications-head {
        width: 372px;
        padding: 0 20px;
        height: 65px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        background-color: $grey-scale-500;
        border-bottom: $grey-scale-700 solid 1px;
        .info {
          display: flex;
          .facade-title-sub ::v-deep {
            margin-right: 16px;
            padding: 2px 0;
          }
          .info-amount {
            height: 24px;
            width: 32px;
            line-height: 24px;
            font-size: 12px;
            font-weight: bold;
            text-align: center;
            background-color: $grey-scale-300;
            border-radius: 8px;
            letter-spacing: 0.05em;
          }
        }
        .icon-points {
          padding: 10px;
          cursor: pointer;
        }
      }
      .notifications-main {
        padding: 24px 20px;
        height: 100%;
        overflow-y: scroll;
      }
    }
    .side-panel {
      width: 72px;
      height: 100%;
      background-color: $grey-scale-500;
      border-left: $grey-scale-700 solid 1px;
      .side-button {
        width: 72px;
        height: 65px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $grey-scale-200;
        border-bottom: $grey-scale-700 solid 1px;
        cursor: pointer;
      }
      .side-button-special {
        border: none;
      }
    }
  }
  .visible {
    transform: translateX(0);
  }
  .active {
    background-color: $grey;
    color: #fff;
  }
  .blocks {
    &-enter{
      transform: translateX(15%);
    }
    &-leave-to{
      opacity: 0;
    }
    &-enter-active{
      transition: $vx-tab-time all ease;
    }
    &-enter-to{
      transform: translateX(0);
    }
  }
</style>