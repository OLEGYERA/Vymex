<template>
  <div class="singleton-messenger-side-panel">
    <div @click="$emit('openPanel')">
      <side-button class="side-button-close">
        <icon-error/>
      </side-button>
    </div>
    <div v-if="type==='messenger'">
      <div @click="$emit('changeMessenger', 'contacts')" :class="{active: open==='contacts'}">
        <side-button>
          <icon-profile/>
        </side-button>
      </div>
      <div @click="$emit('changeMessenger', 'dialogs')" :class="{active: open==='dialogs'}">
        <side-button>
          <icon-comments/>
        </side-button>
      </div>
      <div class="border"></div>
      <side-button>
        <icon-volume/>
      </side-button>
    </div>
    <div v-if="type==='notify'">
      <span @click="$emit('changeNotification')">
          <side-button :class="{active: !notification}">
            <icon-volume v-if="!this.switch"/>
            <icon-volume-off v-else/>
          </side-button>
        </span>
      <side-button>
        <icon-setting/>
      </side-button>
    </div>
  </div>
</template>

<script>
import IconError from '@Icon/Error'
import IconVolume from '@Icon/Volume'
import IconProfile from '@Icon/Profile'
import IconComments from '@Icon/Comments'
import SideButton from '@Facade/Button/Side'
import IconSetting from '@Icon/Setting'
import IconVolumeOff from '@Icon/VolumeOff'

export default {
  name: 'Singleton.Messenger.SidePanel',
  components: {
    IconVolume,
    IconError,
    IconProfile,
    IconComments,
    SideButton,
    IconSetting,
    IconVolumeOff
  },
  props: {
    open: String,
    messenger: Boolean,
    openBlock: String,
    switch: Boolean,
    notification: Boolean,
    type: String
  },
}
</script>

<style lang="scss" scoped>
  .singleton-messenger-side-panel {
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
    .active {
      background-color: $grey;
      .icon {
        color: #fff;
      }
    }
  }
</style>