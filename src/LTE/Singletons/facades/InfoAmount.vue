<template>
  <title-caps class="facade-info-amount"><slot/></title-caps>
</template>

<script>
import TitleCaps from '@Facade/Title/Caps'
export default {
  name: 'Singleton.Facades.InfoAmount',
  components: {
    TitleCaps
  }
}
</script>

<style lang="scss" scoped>
  .facade-info-amount{
    padding: rem(4) rem(8);
    border-radius: 8px;
    background-color: $blue;
    color: #fff;
  }
</style>