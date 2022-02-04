<template>
  <h2 class="facade-title-base"><slot/></h2>
</template>

<script>
  export default {
    name: 'Facades.Title.Base'
  }
</script>

<style lang="scss" scoped>
  .facade-title-base{
    margin: 0;
    font-weight: 600;
    font-size: rem(28);
    line-height: rem(34);
    color: #fff;
  }
</style>