<template>
  <div class="sidebar-tab-volumes">
    <div class="notifications-title">
      <title-semi>Отключить оповещения</title-semi>
      <div class="button-switch"
           :class="{'on': switchNotify}"
           @click="changeSwitch()">
        <div class="button-round"></div>
      </div>
    </div>
    <transition name="slide">
      <div v-if="switchNotify">
        <div class="disable-time"
             :key="timeKey"
             :class="{active: timeKey === newTime}"
             v-for="(timeItem, timeKey) in times"
             @click="changeTime(timeKey)">
          <text-base>{{ timeItem }}</text-base>
          <div class="radiobutton"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import TitleSemi from "@Facade/Title/Semi";
  import TextBase from "@Facade/Text/Base";

  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'Singleton.Messenger.Sidebar.TabVolumes',
    components: {
      TitleSemi,
      TextBase
    },
    data() {
      return {
        times: ['Отключить на 1 час', 'Отключить на 8 часов', 'Отключить на 2 дня', 'Отключить'],
      };
    },
    computed: {
      ...mapGetters({
        switchNotify: 'Messenger/disableNotifications',
        newTime: 'Messenger/disableTime',
      })
    },
    methods: {
      ...mapMutations({
        changeSwitch: 'Messenger/switchNotifications',
        changeTime: 'Messenger/changeTime',
      }),
    },
  }
</script>

<style lang="scss" scoped>
  .sidebar-tab-volumes{
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;

    .notifications-title {
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .button-switch {
      box-sizing: border-box;
      display: flex;
      padding: rem(2);
      width: 36px;
      border-radius: 16px;
      background-color: rgba(130, 150, 170, 0.2);
      cursor: pointer;
      transition: all .2s;
      .button-round {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background-color: #fff;
      }
      &.on {
        background-color: $blue;
        justify-content: flex-end;
      }
    }
    .disable-time {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
      padding: 12px 16px;
      border-radius: 8px;
      background-color: $grey-scale-500;
      cursor: pointer;
      .radiobutton {
        width: 20px;
        height: 20px;
        box-sizing: border-box;
        border-radius: 50%;
        border: $grey-scale-200 solid 2px;
        background-color: transparent;
      }

      &.active{
        background-color: $grey-scale-400;
        .facade-text-base {
          color: #fff;
          font-weight: 600;
        }
        .radiobutton{
          border: $blue-scale-300 solid 5px;
          background-color: #fff;
        }
      }
    }
  }
  .slide {
    &-enter-active, &-leave-active {
      transition: all .2s linear;
    }
    &-enter-to, &-leave {
      max-height: 200px;
      overflow: hidden;
    }
    &-enter, &-leave-to {
      overflow: hidden;
      max-height: 0;
    }
  }
</style>