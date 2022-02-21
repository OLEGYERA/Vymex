<template>
  <div class="button-info">
    <span class="icon-info"><icon-info/></span>
  </div>
</template>

<script>
  import IconInfo from '@Icon/Info'

  export default {
    name: 'Facades.Button.Info',
    components: {
      IconInfo
    }
  }
</script>

<style lang="scss" scoped>
  .button-info {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background-color: $blue;
    .icon-info {
      line-height: 24px;
      text-align: center;
      color: #fff;
      transform: scale(1, -1);
    }
  }
</style>