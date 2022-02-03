<template>
  <div class="facade-messenger-date">
    <slot>22 апреля, 2022</slot>
  </div>
</template>

<script>
  export default {
    name: 'Singleton.Messenger.Facades.MessengerDate',
  }
</script>

<style lang="scss" scoped>
  .facade-messenger-date{
    font-size: rem(12);
    line-height: rem(12);
    text-align: center;
    color: #FFF;
    opacity: 0.4;
  }
</style>