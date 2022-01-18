<template>
  <div class="container-vx-side-panel">
    <side-button class="side-button-close" @click="$emit('get-notify')">
      <icon-error/>
    </side-button>
    <side-button>
      <icon-profile/>
    </side-button>
    <side-button>
      <icon-comments/>
    </side-button>
    <div class="border"></div>
    <side-button
        :class="{disable: disable}"
        @click="$emit('open-disable')"
    >
      <icon-volume/>
      <!--      <icon-volume-off v-else/>-->
    </side-button>
  </div>
</template>

<script>
import IconError from '@Icon/Error'
import IconVolume from '@Icon/Volume'
import IconProfile from '@Icon/Profile'
import IconComments from '@Icon/Comments'
import SideButton from '@Facade/Button/Side'

export default {
  name: 'Container.Vx.SidePanel',
  components: {
    IconVolume,
    IconError,
    IconProfile,
    IconComments,
    SideButton
  }
}
</script>

<style lang="scss" scoped>
.container-vx-side-panel {
  height: 100%;
  background-color: $grey-scale-500;
  border-left: $grey-scale-700 solid 1px;
  .side-button-close {
    border-bottom: $grey-scale-700 solid 1px;
  }
  .border {
    margin: 12px 18px;
    height: 1px;
    width: 36px;
    background-color: $grey-scale-400;
  }
  .disable {
    background-color: $grey;
    .icon {
      color: #fff;
    }
  }
}
</style>