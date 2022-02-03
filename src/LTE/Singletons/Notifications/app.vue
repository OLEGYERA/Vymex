<template>
  <div class="singleton-notifications-app" v-if="status">
    <sidebar
        class="notifications-app-sidebar" @onClose="close()"
        :tab-list="sidebarView.tabList" :tab-active="sidebarView.tabActive" :tab-index="tabIndex"
        @onChangeTab="switchTab($event)">
      <template #main-header>
        <notifications-head/>
      </template>
      <template #main-content>
        <sidebar-view-notifications/>
      </template>
    </sidebar>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

//for sidebar
import Sidebar from "@Facade/Navigation/SidebarRight"
import NotificationsHead from "@/LTE/Singletons/Notifications/facades/NotificationsHeader";
import SidebarViewNotifications from "@/LTE/Singletons/Notifications/sidebar.view"

export default {
  name: 'Singleton.Notifications.app',
  components: {
    Sidebar, NotificationsHead, SidebarViewNotifications
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      sidebarView: 'Notifications/sidebarView',
      //messenger
      status: 'Notifications/statusNotifications',
      tabIndex: 'Notifications/tabIndex'
    })
  },
  methods: {
    ...mapMutations({
      close: 'Notifications/closeNotifications',
      switchTab: 'Notifications/switchTab',
    }),
  },
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