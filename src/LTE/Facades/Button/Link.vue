<template>
  <span class="facade-button-link" @click="$emit('onClick')"><slot/></span>
</template>

<script>
  export default {
    name: 'Facades.Button.Link'
  }
</script>

<style lang="scss" scoped>
  .facade-button-link{
    font-weight: 400;
    font-size: rem(14);
    line-height: rem(20);
    color: $blue;
    cursor: pointer;
    text-decoration: underline;
    &:hover{
      color: $blue-scale-200;
      text-decoration: unset;
    }
  }
</style>