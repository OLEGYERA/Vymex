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
            <disable-notif
                v-else-if="disable"
                @changeSwitch="changeSwitch"
                @changeTime="changeTime"
                :switch="this.switch"
                :chooseTime="this.chooseTime"
            />
            <!--          <no-notifications v-else/>-->
          </transition>
        </div>
      </div>
      <div class="side-panel">
        <span @click="$emit('get-notify')">
          <side-button class="side-button-close">
            <icon-error/>
          </side-button>
        </span>
        <span @click="$emit('open-disable')">
          <side-button :class="{disable: disable}">
            <icon-volume v-if="!this.switch"/>
            <icon-volume-off v-else/>
          </side-button>
        </span>
        <side-button>
          <icon-setting/>
        </side-button>
      </div>
    </div>
</template>

<script>
  import IconError from '@Icon/Error'
  import IconSetting from '@Icon/Setting'
  import IconPointsVertical from '@Icon/PointsVertical'
  import IconVolume from '@Icon/Volume'
  import IconVolumeOff from '@Icon/VolumeOff'
  import DisableNotif from '@Container/Vx/DisableNotifications'
  import MessagesBlock from '@Container/Vx/MessagesBlock'
  import TitleSub from '@Facade/Title/Sub'
  import SideButton from '@Facade/Button/Side'
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
      SideButton
      // NoNotifications
    },
    data() {
      return {
        switch: false,
        chooseTime: 0,
      };
    },
    props: {
      notify: Boolean,
      openMessages: Boolean,
      disable: Boolean,
    },
    methods: {
      changeTime(timeKey) {
        this.chooseTime = timeKey;
      },
      changeSwitch() {
        if (this.switch) {
          this.chooseTime = 0;
        }
        this.switch = !this.switch;
      },
    }
  } 
</script>

<style lang="scss" scoped>
  .container-vx-notifications {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 3;
    display: flex;
    height: 100%;
    background-color: $grey;
    transform: translateX(100%);
    transition: transform 0.4s;
    .notifications-block {
      .notifications-head {
        padding: 20px 20px 21px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        background-color: $grey-scale-500;
        border-bottom: $grey-scale-700 solid 1px;
        .info {
          display: flex;
          .facade-title-sub {
            margin-right: 16px;
            padding: 2px 0;
          }
          .info-amount {
            height: 24px;
            width: 32px;
            line-height: rem(24);
            font-size: rem(12);
            font-weight: bold;
            text-align: center;
            background-color: $grey-scale-300;
            border-radius: 8px;
            letter-spacing: 0.05em;
          }
        }
        .icon-points {
          padding: 0 10px;
          cursor: pointer;
        }
      }
      .notifications-main {
        padding: rem(24) rem(20);
        width: 372px;
        box-sizing: border-box;
        height: 100%;
        overflow-y: scroll;
      }
    }
    .side-panel {
      width: 72px;
      height: 100%;
      background-color: $grey-scale-500;
      border-left: $grey-scale-700 solid 1px;
      .side-button-close {
        border-bottom: $grey-scale-700 solid 1px;
      }
    }
  }
  .visible {
    transform: translateX(0);
  }
  .disable {
    background-color: $grey;
    .icon {
      color: #fff;
    }
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