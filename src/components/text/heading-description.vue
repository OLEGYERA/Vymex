<template>
  <div class="heading-description-component">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'heading-description'
  }
</script>

<style lang="scss" scoped>
  .heading-description-component{
    font-weight: 400;
    color: $grey-scale;
    font-size: 15px;
    margin: 12px 0 0;
    text-align: center;
  }
</style>