<template>
  <div class="facade-notifications-header">
    <div class="info">
      <title-sub>Уведомления</title-sub>
      <info-amount><slot>24</slot></info-amount>
    </div>
    <icon-points-vertical/>
  </div>
</template>

<script>
import IconPointsVertical from '@Icon/PointsVertical'
import TitleSub from '@Facade/Title/Sub'
import InfoAmount from "@/LTE/Singletons/facades/InfoAmount";

export default {
  name: 'Singleton.Facades.NotificationsHeader',
  components: {
    IconPointsVertical,
    TitleSub,
    InfoAmount
  },
}
</script>

<style lang="scss" scoped>
  .facade-notifications-header {
    padding: rem(20);
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