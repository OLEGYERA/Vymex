<template>
  <div class="container-vx-disable-notif">
    <div class="notif-title">
      <title-semi>Отключить оповещения</title-semi>
      <div class="button"
           :class="{on: this.switch}"
           @click="$emit('changeSwitch')">
        <div class="button-switch"></div>
      </div>
    </div>
    <transition name="slide">
      <div v-if="this.switch">
        <div class="switch-time"
             :key="timeKey"
             :class="{active: timeKey === chooseTime}"
             v-for="(timeItem, timeKey) in times"
             @click="$emit('changeTime', timeKey)">
          <div>{{ timeItem }}</div>
          <div class="radiobutton"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
 import TitleSemi from '@Facade/Title/Semi'

export default {
  name: 'Container.Vx.Header',
  components: {
    TitleSemi
  },
  data() {
    return {
      times: ['Через 1 час', 'Через 4 час', 'Через 24 часа', 'Отключить'],
    };
  },
  props: ['switch', 'chooseTime'],
}
</script>

<style lang="scss" scoped>
 * {
   box-sizing: border-box;
 }
 .container-vx-disable-notif {
   height: 100%;
   .notif-title {
     margin-bottom: 24px;
     display: flex;
     justify-content: space-between;
     align-items: center;
   }
 }
  .button {
    display: flex;
    padding: 2px;
    width: 36px;
    height: 20px;
    border-radius: 16px;
    background-color: rgba(130, 150, 170, 0.2);
    cursor: pointer;
    transition: all .2s;
    .button-switch {
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
  .switch-time {
    width: 100%;
    height: 44px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 15px;
    line-height: 20px;
    color: $grey-scale-200;
    background-color: $grey-scale-500;
    cursor: pointer;
    .radiobutton {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: $grey-scale-200 solid 2px;
      background-color: transparent;
    }

    &.active{
      background-color: $grey-scale-400;
      color: #fff;
      font-weight: 600;
      .radiobutton{
        border: $blue-scale-300 solid 5px;
        background-color: #fff;
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