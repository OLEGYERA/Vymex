<template>
  <div class="singleton-notifications-notifications-panel">
    <div class="notifications-block">
      <notifications-head v-if="openBlock==='notify'"/>
      <messages-header v-if="openBlock==='messenger'" @changeMessenger="changeMessenger" :name="user.name"/>
      <div class="notifications-main">
        <transition name="blocks">
          <div v-if="openBlock==='notify'">
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
          <div v-if="openBlock==='messenger'">
            <transition name="blocks">
              <personal-info :user="user" v-if="open==='owner'"/>
              <dialogs-block v-if="open==='dialogs'"/>
              <contacts-block v-if="open==='contacts'"/>
            </transition>
          </div>
        </transition>
      </div>
    </div>
    <side-panel
        v-if="openBlock==='notify'"
        @openPanel="openPanel"
        :openBlock="openBlock"
        @changeNotification="changeNotification"
        :switch="this.switch"
        :notification="notification"
    />
    <side-panel
        v-else-if="openBlock==='messenger'"
        @openPanel="openPanel"
        :openBlock="openBlock"
        @changeMessenger="changeMessenger"
        :open="open"
    />
  </div>
</template>

<script>
import DisableNotification from '@/LTE/Singletons/Notifications/DisableNotifications'
import MessagesBlock from '@/LTE/Singletons/Notifications/MessagesBlock'
import NotificationsHead from "@/LTE/Singletons/Notifications/NotificationsHead"
import MessagesHeader from "@/LTE/Singletons/Messenger/MessagesHeader"
import SidePanel from "@/LTE/Singletons/Facades/SidePanel"
import ContactsBlock from '@/LTE/Singletons/Messenger/ContactsBlock'
import DialogsBlock from '@/LTE/Singletons/Messenger/DialogsBlock'
import PersonalInfo from '@/LTE/Singletons/Messenger/PersonalInfo'

export default {
  name: 'Singleton.Notifications.NotificationsPanel',
  components: {
    DisableNotification,
    MessagesBlock,
    NotificationsHead,
    MessagesHeader,
    SidePanel,
    DialogsBlock,
    PersonalInfo,
    ContactsBlock
  },
  data() {
    return {
      notification: true,
      user: {
        name: 'Александр Ким',
        nickname: '@arnoldino22',
        phone: '+380(63)-222-33-44',
        mail: 'makaroni@mail.com',
        birthday: '2 апреля',
        about: 'Короткий но емкий текст о том насколько я хорош, профессионален, и самое главное — скромен до глубины души.'
      },
    }
  },
  props: {
    openBlock: String,
    open: String,
    switch: Boolean,
    chooseTime: Number,
  },
  methods: {
    openPanel() {
      this.$emit('open-panel')
    },
    changeNotification() {
      this.notification = !this.notification;
    },
    changeTime(timeKey) {
      this.$emit('change-time', timeKey)
    },
    changeSwitch() {
      this.$emit('change-switch')
    },
    changeMessenger(type) {
      this.$emit('change-messenger', type)
    }
  }
}
</script>

<style lang="scss" scoped>
  .singleton-notifications-notifications-panel {
    position: fixed;
    top: 0;
    right: 0;
    box-sizing: border-box;
    z-index: 4;
    display: flex;
    height: 100%;
    background-color: $grey;
    .notifications-block {
      .notifications-main {
        padding: rem(24) rem(20);
        width: 372px;
        box-sizing: border-box;
        height: 100%;
        overflow-y: scroll;
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
</style>