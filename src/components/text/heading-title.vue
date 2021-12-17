<template>
  <h1 class="text-heading-title-component">
    <slot></slot>
  </h1>

</template>

<script>
  export default {
    name: 'heading-title'
  }
</script>

<style lang="scss" scoped>
  .text-heading-title-component{
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    line-height: 34px;
    text-align: center;
    margin: 0;
  }
</style>