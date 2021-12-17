<template>
  <div :class="[{'icon-substrate-component': IconTouch, 'icon-no-touch': !IconTouch}, IconName]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'icon.substrate',
    props: {
      IconName: String,
      IconTouch: Boolean
    }
  }
</script>

<style lang="scss" scoped>

  .icon-substrate-component, .icon-no-touch{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon-substrate-component{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    transition: .2s all linear;
    cursor: pointer;
    svg{
      width: 80%;
      color: #fff;
    }

    &:hover{
      box-shadow: inset 2px 2px 3px $grey;
      background-color: rgba(0, 0, 0, .1);
    }

    &:active{
      background-color: rgba(0, 0, 0, .3);
    }
  }


</style>