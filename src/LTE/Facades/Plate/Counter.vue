<template>
  <span class="facade-plate-counter" v-if="!(nonZero && counter === 0)">
    <title-caps>{{counter || 0}}</title-caps>
  </span>
</template>

<script>
  import TitleCaps from '@Facade/Title/Caps'

  export default {
    name: 'Facade.Plate.Counter',
    props: {
      counter: Number,
      nonZero: Boolean
    },
    components: {TitleCaps},
  }
</script>

<style lang="scss" scoped>
  .facade-plate-counter{
    width: 24px;
    height: 24px;
    background: $blue;
    border-radius: 8px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    .facade-title-caps{
      color: #fff;
    }
  }
</style>