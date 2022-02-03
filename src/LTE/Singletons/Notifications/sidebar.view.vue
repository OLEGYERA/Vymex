<template>
  <div class="sidebarViewController">
    <transition :name="`component-${renderAnimationName}`" mode="out-in">
      <keep-alive>
        <component
            :is="renderViewName"
            class="sidebarViewComponent"
            :switchNotify="switchNotify"
            :newTime="newTime"
            @change-switch="changeSwitch()"
            @change-time="changeTime"
        />
      </keep-alive>
    </transition>
  </div>
</template>
// внутренносити sidebar notifications
<script>
import {mapGetters, mapMutations} from 'vuex'
/*eslint-disable*/
import Notifications from "@/LTE/Singletons/Notifications/views/Notifications";
import VolumesTab from "@/LTE/Singletons/facades/TabVolumes.atom";
import SettingsTab from "@/LTE/Singletons/Notifications/views/Settings.tab";

export default {
  name: 'Singleton.Notifications.SidebarView',
  components: {
    Notifications, VolumesTab, SettingsTab
  },
  computed: {
    ...mapGetters({
      // какая хрень активна и будет рендериться
      sidebarView: 'Notifications/sidebarView',
      // отключение оповещений
      switchNotify: 'Notifications/disableNotifications',
      newTime: 'Notifications/disableTime',
    }),
    renderViewName(){
      const tabActive = this.sidebarView.tabActive;
      return tabActive === null ? 'notifications' : tabActive.name + '-tab';
    },
    renderAnimationName(){
      return this.sidebarView.animation;
    }
  },
  methods: {
    ...mapMutations({
      // отключение оповещений
      changeSwitch: 'Notifications/switchNotifications',
      changeTime: 'Notifications/changeTime',
    })
  }
}
</script>

<style lang="scss">
.sidebarViewController{
  width: 100%;
  height: 100%;
  //display: flex;
  justify-content: center;
  .sidebarViewComponent{
    width: 100%;
    height: 100%;
    display: inherit;
    justify-content: inherit;
    //overflow: hidden;

    &.component-expand{
      &-enter-active{
        width: 30%;
        opacity: 0;
        transition: all 100ms ease;
      }
      &-enter-to{
        width: 100%;
        opacity: 1;
      }

      &-leave-active {
        //width: 100%;
        opacity: 1;
        transition: all 50ms ease;
      }
      &-leave-to {
        //width: 60%;
        opacity: 0;
      }
    }
    &.component-zoom-out{
      &-enter-active{
        opacity: 0;
        transform: scale(.96);
        transition: all 100ms ease;
      }
      &-enter-to{
        opacity: 1;
        transform: scale(1);
      }

      &-leave-active {
        opacity: 1;
        transition: all 50ms ease;
      }
      &-leave-to {
        opacity: 0;
      }
    }
  }
}
</style>