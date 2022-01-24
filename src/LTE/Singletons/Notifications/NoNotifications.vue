<template>
  <div class="singleton-notifications-no-notifications">
    <div class="no-notifications-icon"><icon-setting/></div>
    <div class="no-notifications-title">Нет новых уведомлений</div>
  </div>
</template>

<script>
  import IconSetting from '@Icon/Colored/Settings'

  export default {
    name: 'Singleton.Notifications.NoNotifications',
    components: {
      IconSetting
    },
  } 
</script>

<style lang="scss" scoped>
  .singleton-notifications-no-notifications {
    padding: rem(4) 0;
    text-align: center;
    .no-notifications-icon {
      margin-bottom: 22px;
    }
    .no-notifications-title {
      font-weight: 600;
      font-size: rem(17);
      line-height: rem(22);
      color: $grey-scale-300;
    }
  }
</style>