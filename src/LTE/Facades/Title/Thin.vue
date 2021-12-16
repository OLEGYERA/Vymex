<template>
  <h1 class="ft-title-thin"><slot/></h1>
</template>

<script>
  export default {
    name: 'Facades.Text.Title.Thin'
  }
</script>

<style lang="scss" scoped>
  .ft-title-thin{
    font-weight: 400;
    font-size: rem(42);
    line-height: 50px;
    color: #fff;
  }
</style>