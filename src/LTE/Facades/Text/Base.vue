<template>
  <p class="facade-text-base"><slot/></p>
</template>

<script>
  export default {
    name: 'Facades.Text.Base'
  }
</script>

<style lang="scss" scoped>
  .facade-text-base{
    font-weight: 400;
    font-size: rem(15);
    line-height: rem(20);
    color: $grey-scale-200;
    margin: 0;
  }
</style>