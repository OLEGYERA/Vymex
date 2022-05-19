<template>
  <div class="singleton-notifications-app" v-if="status">
    <sidebar-right
        class="notifications-app-sidebar" @onClose="closeSidebar"
        :tab-list="sidebarView.tabList" :tab-active="sidebarView.tabActive" :tab-index="tabIndex"
        @onChangeTab="switchTab($event)">
      <template #main-header>
        <notifications-head :count="count"/>
      </template>
      <template #main-content>
        <sidebar-view-notifications />
      </template>
    </sidebar-right>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  //for sidebar
  import SidebarRight from "@Facade/Navigation/SidebarRight"
  import NotificationsHead from "@/LTE/Singletons/Notifications/facades/NotificationsHeader";
  import SidebarViewNotifications from "@/LTE/Singletons/Notifications/sidebar.view"

  export default {
    name: 'Singleton.Notifications.app',
    components: {
      SidebarRight, NotificationsHead, SidebarViewNotifications
    },
    data() {
      return {
        readNotifications: []
      }
    },
    computed: {
      ...mapGetters({
        sidebarView: 'Notifications/sidebarView',
        status: 'Notifications/statusNotifications',
        tabIndex: 'Notifications/tabIndex',
        notificationsCount: 'Notifications/getNotificationsCount',
        notifications: 'Notifications/getNotifications',
      }),
      count(){
        return this.notificationsCount
      }
    },
    methods: {
      ...mapMutations({
        close: 'Notifications/closeNotifications',
        switchTab: 'Notifications/switchTab',
      }),
      closeSidebar(){
        this.close()
        this.notifications.notifications.map(notification => this.readNotifications.push(notification.id)) ///фильтровать?

        this.$core.execViaComponent('Notifications', 'readNotifications', this.readNotifications); /// не обновляется автоматически
      }
    },
    created() {
      this.$core.execViaComponent('Notifications', 'getNotifications', 1);
      this.$core.execViaComponent('Notifications', 'getNotificationCount');
    },
    // updated() {
    //   this.$core.execViaComponent('Notifications', 'getNotificationCount');
    // }
  }
</script>

<style lang="scss" scoped>
  .singleton-notifications-app {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    background-color: rgba($grey-scale-700, .8);
    z-index: 3;

    .notifications-app-sidebar ::v-deep{
      display: flex;
      height: 100%;
      background-color: $grey;
      .sidebar-main{
        width: 372px;
      }
    }
  }
</style>