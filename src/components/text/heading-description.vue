<template>
  <div class="text-heading-description-component">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'heading-description'
  }
</script>

<style lang="scss" scoped>
  .text-heading-description-component{
    font-weight: 400;
    color: $grey-scale-200;
    font-size: 15px;
    margin: 12px 0 0;
    text-align: center;
  }
</style>