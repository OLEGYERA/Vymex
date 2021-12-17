<template>
  <div class="plate-navigation" :class="customization">
    <div class="plate-left-box">
      <div class="logo-box">
        <slot name="logo" />
      </div>
      <div class="plate-title">
        <slot name="title" />
      </div>
    </div>
    <div class="plate-right-part">
      <div class="data-title">
        <slot name="data-title" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'plate.navigation.component',
    props: {
      customization: String
    }
  }
</script>

<style lang="scss" scoped>
  .plate-navigation{
    padding: 12px 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: .1s all linear;
    background: transparent;
    &:before{
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 5px;
      background-color: transparent;
      transition: .1s all linear;
    }

    .plate-left-box{
      display: flex;
      align-items: center;
      .logo-box{
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $blue;
        background-color: $blue-opacity-2;
        border-radius: 50%;
        overflow: hidden;
      }
      .plate-title{
        color: #fff;
        margin-left: 12px;
        font-weight: 400;
        font-size: 15px;
        line-height: 20px;
      }
    }

    .plate-right-part{
      .data-title{
        color: $blue;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
      }
    }


    &.active,
    &:hover{
      background: $grey-scale-500;
    }
    &.active{
      &:before{
        background-color: $blue;
      }
    }

    &.exit{
      background: $grey-scale-500;
      .logo-box{
        color: $red;
        background-color: $red-opacity-2;
      }
      .plate-title{
        font-weight: 500;
        color: $red;
      }
    }
  }
</style>