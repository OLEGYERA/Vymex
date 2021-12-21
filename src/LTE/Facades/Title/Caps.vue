<template>
  <h3 class="facade-title-caps" :class="{'title-caps-tiny': tiny}"><slot/></h3>
</template>

<script>
  export default {
    name: 'Facades.Title.Caps',
    props: {
      tiny: Boolean
    }
  }
</script>

<style lang="scss" scoped>
  .facade-title-caps{
    font-weight: 600;
    font-size: rem(12);
    line-height: rem(16);
    color: $grey-scale-200;
    letter-spacing: 0.05rem;
    text-transform: uppercase;
    margin: 0;
  }
</style>