<template>
  <div class="container-vx-no-notifications">
    <div class="no-notifications-icon"><icon-setting/></div>
    <div class="no-notifications-title">Нет новых уведомлений</div>
  </div>
</template>

<script>
  import IconSetting from '@Icon/Colored/Settings'

  export default {
    name: 'Container.Vx.NoNotifications',
    components: {
      IconSetting
    },
  } 
</script>

<style lang="scss" scoped>
  .container-vx-no-notifications {
    padding: 4px 0;
    text-align: center;
    .no-notifications-icon {
      margin-bottom: 22px;
    }
    .no-notifications-title {
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      color: $grey-scale-300;
    }
  }
</style>