<template>
  <h2 class="facade-title-semi"><slot/></h2>
</template>

<script>
export default {
  name: 'Facades.Title.Semi'
}
</script>

<style lang="scss" scoped>
  .facade-title-semi{
    font-weight: 600;
    font-size: rem(20);
    line-height: rem(24);
    color: #fff;
    margin: 0;
  }
</style>