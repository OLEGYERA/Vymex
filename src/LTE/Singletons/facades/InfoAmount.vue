<template>
  <span class="facade-info-amount"><title-caps><slot/></title-caps></span>
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
    .facade-title-caps{
      color: #fff;
    }
  }
</style>