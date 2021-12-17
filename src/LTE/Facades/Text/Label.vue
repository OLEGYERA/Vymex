<template>
  <p class="facade-text-label"><slot/></p>
</template>

<script>
  export default {
    name: 'Facades.Text.Label'
  }
</script>

<style lang="scss" scoped>
  .facade-text-label{
    font-weight: 400;
    font-size: rem(14);
    line-height: rem(20);
    color: #fff;
    margin: 0;
  }
</style>