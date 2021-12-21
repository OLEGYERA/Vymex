<template>
  <h4 class="facade-title-caption"><slot/></h4>
</template>

<script>
  export default {
    name: 'Facades.Title.Caption'
  }
</script>

<style lang="scss" scoped>
  .facade-title-caption{
    font-weight: 400;
    font-size: rem(12);
    line-height: rem(16);
    color: $grey-scale-200;
    margin: 0;
  }
</style>