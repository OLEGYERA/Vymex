<template>
  <div class="container-vx-header">
    <div class="vx-header-body">
      <div class="vymex-logo">
        <img src="@/assets/img/vymex/base-reverse.svg" alt="">
      </div>
      <div class="header-icons">
        <div @click="openPanel('notify')">
          <icon-alarm/>
        </div>
        <div @click="messengerShow()">
          <icon-comments/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import IconAlarm from '@Icon/Alarm'
  import IconComments from '@Icon/Comments'
  import {mapMutations} from 'vuex'

  export default {
    name: 'Container.Vx.Header',
    components: {
      IconAlarm,
      IconComments,
    },
    methods: {
      ...mapMutations({
        messengerShow: 'Messenger/show'
      })
    }
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
</style>