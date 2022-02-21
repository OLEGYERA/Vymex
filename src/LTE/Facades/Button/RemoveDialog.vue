<template>
  <div class="facade-button-remove">
    <text-base><slot>Удалить диалог</slot></text-base>
  </div>
</template>

<script>
  import TextBase from '@Facade/Text/Base'
  export default {
    name: 'Facades.Button.RemoveDialog',
    components: {
      TextBase,
    }
  }
</script>

<style lang="scss" scoped>
  .facade-button-remove {
    width: max-content;
    padding: rem(12);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $grey-scale-700;
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;
    line-height: 20px;
    .facade-text-base {
      color: #fff;
    }
  }
</style>