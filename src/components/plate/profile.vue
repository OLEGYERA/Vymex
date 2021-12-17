<template>
  <div class="plate-profile active">
    <slot name="logo" />
    <div class="plate-title">
      <slot name="title" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'plate.profile.component',
  }
</script>

<style lang="scss" scoped>
  .plate-profile{
    padding: 12px 18px;
    display: flex;
    align-items: center;
    background: $grey-scale-500;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    &:before{
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 5px;
      background-color: transparent;
    }

    .img-avatar{
      width: 40px;
      height: 40px;
    }
    .plate-title{
      margin-left: 8px;
      font-weight: 600;
      color: #fff;
      font-size: 16px;
      line-height: 22px;
    }

    &.active{
      &:before{
        background-color: $blue;
      }

    }
  }
</style>