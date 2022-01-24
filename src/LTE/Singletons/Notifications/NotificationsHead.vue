<template>
  <div class="singleton-notifications-head">
    <div class="info">
      <title-sub>Уведомления</title-sub>
      <div class="info-amount">24</div>
    </div>
    <icon-points-vertical/>
  </div>
</template>

<script>
import IconPointsVertical from '@Icon/PointsVertical'
import TitleSub from '@Facade/Title/Sub'

export default {
  name: 'Singleton.Notifications.NotificationsHead',
  components: {
    IconPointsVertical,
    TitleSub,
  },
}
</script>

<style lang="scss" scoped>
  .singleton-notifications-head {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    background-color: $grey-scale-500;
    border-bottom: $grey-scale-700 solid 1px;
    .info {
      display: flex;
      .facade-title-sub {
        margin-right: 16px;
        padding: 2px 0;
      }
      .info-amount {
        height: 24px;
        width: 32px;
        line-height: rem(24);
        font-size: rem(12);
        font-weight: bold;
        text-align: center;
        background-color: $grey-scale-300;
        border-radius: 8px;
        letter-spacing: 0.05em;
      }
    }
    .icon-points {
      padding: 0 10px;
      cursor: pointer;
    }
  }
</style>