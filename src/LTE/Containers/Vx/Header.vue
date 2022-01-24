<template>
  <div class="container-vx-header">
    <div class="vx-header-body">
      <div class="vymex-logo">
        <img src="@/assets/img/vymex/base-reverse.svg" alt="">
      </div>
      <div class="header-icons">
        <div
          @click="openPanel('notify')"
        >
          <icon-alarm/>
        </div>
        <div @click="openPanel('messenger')">
          <icon-comments/>
        </div>
      </div>
    </div>
    <transition name="panel">
      <notifications-panel
          v-if="openBlock==='messenger'"
          :openBlock="openBlock"
          @open-panel="openPanel"
          @change-messenger="changeMessenger"
          :open="open"
      />
      <notifications-panel
          v-if="openBlock==='notify'"
          :openBlock="openBlock"
          @open-panel="openPanel"
          @change-switch="changeSwitch"
          :switch="this.switch"
          :chooseTime="chooseTime"
          @change-time="changeTime"
      />
    </transition>
    <transition name="fade">
      <div class="notifications-backdrop" v-if="openBlock"></div>
    </transition>
  </div>
</template>

<script>
  import IconAlarm from '@Icon/Alarm'
  import IconComments from '@Icon/Comments'
  import NotificationsPanel from "@Container/Vx/NotificationsPanel";

  export default {
    name: 'Container.Vx.Header',
    components: {
      IconAlarm,
      IconComments,
      NotificationsPanel
    },
    data() {
      return {
        openBlock: '',
        open: 'contacts',
        switch: false,
        chooseTime: 0,
      };
    },
    methods: {
      openPanel(type) {
        if (this.openBlock) {
          this.openBlock = '';
        } else {
          this.openBlock = type
        }
      },
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
  }
  .notifications-backdrop {
    width: 100%;
    height: 100%;
    z-index: 2;
    top: 0;
    left: 0;
    position: absolute;
    background-color: $grey-scale-700;
    opacity: 80%;
  }
  .fade {
    &-enter, &-leave-to {
      opacity: 0;
    }
    &-enter-to, &-leave {
      opacity: .8;
    }
    &-enter-active, &-leave-active {
      transition: opacity .4s;
    }
  }
  .panel {
    &-enter, &-leave-to{
      transform: translateX(100%);
    }
    &-enter-active, &-leave-active{
      transition: .4s all ease;
    }
    &-enter-to{
      transform: translateX(0);
    }
  }

</style>