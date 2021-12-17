<template>
  <div class="text-short-description">
    <slot />
  </div>

</template>

<script>
  export default {
    name: 'text.short.description'
  }
</script>

<style lang="scss" scoped>
  .text-short-description{
    color: $grey-scale-200;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
  }
</style>