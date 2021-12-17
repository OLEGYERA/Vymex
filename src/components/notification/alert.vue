<template>
  <div class="notification-alert">
    <icon-bell />
    <span class="notification-counter">5</span>
  </div>
</template>

<script>
  import IconBell from '@/components/icon/bell'

  export default {
    name: 'notification.alert.component',
    components: {
      IconBell
    }
  }
</script>

<style lang="scss" scoped>
  .notification-alert{
    color: #fff;
    position: relative;
    cursor: pointer;
    .notification-counter{
      position: absolute;
      right: -12px;
      bottom: -4px;
      width: 18px;
      height: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 15px;
      font-size: 14px;
      line-height: 14px;
      font-weight: 600;
      background-color: $blue;
      color: #fff;
    }
  }
</style>