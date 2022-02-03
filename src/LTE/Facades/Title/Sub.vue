<template>
  <h2 class="facade-title-sub"><slot/></h2>
</template>

<script>
  export default {
    name: 'Facades.Title.Sub'
  }
</script>

<style lang="scss" scoped>
  .facade-title-sub{
    font-weight: 600;
    font-size: rem(15);
    line-height: rem(20);
    color: #fff;
    margin: 0;
  }
</style>