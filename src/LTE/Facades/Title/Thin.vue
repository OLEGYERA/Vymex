<template>
  <h1 class="facade-title-thin"><slot/></h1>
</template>

<script>
  export default {
    name: 'Facades.Title.Thin'
  }
</script>

<style lang="scss" scoped>
  .facade-title-thin{
    font-weight: 400;
    font-size: rem(42);
    line-height: 50px;
    color: #fff;
  }
</style>