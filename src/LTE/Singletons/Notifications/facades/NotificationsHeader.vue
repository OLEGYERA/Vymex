<template>
  <div class="facade-notifications-header">
    <div class="info">
      <title-sub>Уведомления</title-sub>
      <info-amount v-if="!!count">{{count}}</info-amount>
    </div>
    <icon-points-vertical @click.native="modalStatus = true"/>
    <modal-action-list :status="modalStatus" @onClose="modalStatus = false" @onDelete="$core.execViaComponent('Notifications', 'deleteAllNotifications')">
      <template #del-title>Удалить все</template>
    </modal-action-list>
  </div>
</template>

<script>
  import IconPointsVertical from '@Icon/PointsVertical'
  import TitleSub from '@Facade/Title/Sub'
  import InfoAmount from "@/LTE/Singletons/facades/InfoAmount";
  import ModalActionList from '@Facade/Modal/ActionList'

  export default {
    name: 'Singleton.Facades.NotificationsHeader',
    components: {
      IconPointsVertical,
      TitleSub,
      InfoAmount,
      ModalActionList
    },
    data() {
      return{
        modalStatus: false
      }
    },
    props: {
      count: Number
    }
  }
</script>

<style lang="scss" scoped>
  .facade-notifications-header {
    height: 65px;
    box-sizing: border-box;
    position: relative;
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
    .facade-modal-action-list::v-deep {
      .action-list-body{
        left: 85px;
        top: -12px;
        .action-item{
          padding: 0 0 0 16px;
          height: 60px;
          width: 230px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
</style>