<template>
  <div class="facade-notifications-header">
    <div class="info">
      <title-sub>Выберите получателя</title-sub>
    </div>
  </div>
</template>

<script>
import TitleSub from '@Facade/Title/Sub'

export default {
  name: 'Singleton.Facades.UsersHeader',
  components: {
    TitleSub,
  },
}
</script>

<style lang="scss" scoped>
  .facade-notifications-header {
    padding: rem(22);
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    background-color: $grey-scale-500;
    border-bottom: $grey-scale-700 solid 1px;
    .info {
      display: inherit;
      align-items: center;
      .facade-title-sub {
        margin-right: 16px;
      }
      .facade-info-amount {
        background-color: $grey-scale-300;
      }
    }
    .icon-points-vertical {
      padding: 0 rem(10);
      height: 16px;
      cursor: pointer;
    }
  }
</style>