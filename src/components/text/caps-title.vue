<template>
  <div class="text-caps-title">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'text.caps.title.component'
  }
</script>

<style lang="scss" scoped>
  .text-caps-title{
    font-size: 14px;
    line-height: 16px;
    font-weight: 600;
    color: $grey-scale-200;
  }
</style>