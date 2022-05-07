<template>
  <div class="facade-faq-player">
    <div class="control-player">
      <div class="control-player-body">
        <icon-control-play :size="size"/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'vx.faq.facade.faq.player',
  components: {
    IconControlPlay: () => import('@Icon/ControlPlay'),
  },
  props:{
    size: Number
  }
}
</script>

<style lang="scss" scoped>
.facade-faq-player {
  flex-shrink: 0;
  width: 16px;
  height: 100%;
  margin-left: rem(12);

  .control-player {
    top: 8px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    overflow: hidden;
    background: linear-gradient(135deg, #81FFEF 0%, #F067B4 100%);

    .control-player-body {
      color: #fff;
      height: 100%;
      display: flex;
      padding-bottom: 6px;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}


</style>