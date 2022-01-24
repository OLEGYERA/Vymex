<template>
  <div class="singleton-messenger-name">
    <div class="name-part">
      <arrow-left/>
      <div class="block">{{name}}</div>
    </div>
    <points-vertical v-if="type==='contact'"/>
  </div>
</template>

<script>
import ArrowLeft from '@Icon/ArrowLeftBold'
import PointsVertical from '@Icon/PointsVertical'

export default {
  name: 'Singleton.Messenger.Name',
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
  .singleton-messenger-name {
  //width: 100%;
  //padding: 11px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background-color: $grey;
    margin-bottom: 36px;
  .icon-arrow-left-bold {
    margin-right: 12px;
    height: 18px;
    padding: 0 8px;
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
    padding: 0 10px;
    cursor: pointer;
  }
}
</style>