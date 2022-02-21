<template>
  <div class="singleton-notifications-app">
    <div class="notifications-app-block">
      <main class="notifications-app-main">
        <div>
          <notifications-head />
          <div class="notifications-app-info">
            <transition name="blocks">
              <messages-block v-if="notification"/>
              <disable-notification
                  v-if="!notification"
                  @changeSwitch="changeSwitch"
                  @changeTime="changeTime"
                  :switch="this.switch"
                  :chooseTime="this.chooseTime"
              />
            </transition>
          </div>
        </div>
      </main>
      <aside class="notifications-app-sidebar">
        <side-panel
            :type="type"
            @changeNotification="changeNotification"
            :switch="this.switch"
            :notification="notification"
        />
      </aside>
    </div>
  </div>
</template>

<script>
import SidePanel from "@/LTE/Singletons/Facades/SidePanel"
import DisableNotification from '@/LTE/Singletons/Notifications/DisableNotifications'
import MessagesBlock from '@/LTE/Singletons/Notifications/MessagesBlock'
import NotificationsHead from "@/LTE/Singletons/Notifications/NotificationsHead"

export default {
  name: 'Singleton.Notifications.app',
  components: {
    SidePanel,
    DisableNotification,
    MessagesBlock,
    NotificationsHead
  },
  data() {
    return {
      type: 'notify',
      notification: true,
    };
  },
  props: {
    switch: Boolean,
    chooseTime: Number,
  },
  methods: {
    changeNotification() {
      this.notification = !this.notification;
    },
    changeTime(timeKey) {
      this.$emit('change-time', timeKey)
    },
    changeSwitch() {
      this.$emit('change-switch')
    },
  },
}
</script>

<style lang="scss" scoped>
.singleton-notifications-app{
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  background-color: rgba($grey-scale-700, .8);
  z-index: 3;
  .notifications-app-block {
    display: flex;
    height: 100%;
    background-color: $grey;
    .notifications-app-main {
      height: 100%;
      background-color: $grey;
      width: 372px;
      .notifications-app-info {
        padding: rem(24) rem(20);
        width: 100%;
        box-sizing: border-box;
        height: 100%;
        overflow-y: scroll;
      }
    }
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