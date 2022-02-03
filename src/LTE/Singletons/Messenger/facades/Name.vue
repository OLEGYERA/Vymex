<template>
  <div class="facade-messenger-name">
    <div class="name-part">
      <div @click="$emit('updateRouter', null)"><arrow-left/></div>
      <div class="block">{{name}}</div>
    </div>
    <points-vertical v-if="type==='user'"/>
  </div>
</template>

<script>
import ArrowLeft from '@Icon/ArrowLeftBold'
import PointsVertical from '@Icon/PointsVertical'

export default {
  name: 'Singleton.Messenger.Facades.Name',
  components: {
    ArrowLeft,
    PointsVertical
  },
  props: {
    name: String,
    type: String
  }
}
</script>

<style lang="scss" scoped>
  .facade-messenger-name {
    width: 100%;
    padding: 8px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: transparent;
    box-sizing: border-box;
    margin-bottom: 36px;
    .icon-arrow-left-bold {
      margin-right: 12px;
      height: 18px;
      padding: 5px 8px;
      cursor: pointer;
    }
    .name-part {
      display: inherit;
      align-items: center;
    }
    .block {
      font-weight: 600;
      font-size: rem(17);
      line-height: rem(22);
    }
    .icon-points {
      height: 16px;
      padding: 5px 10px;
      cursor: pointer;
    }
  }
</style>