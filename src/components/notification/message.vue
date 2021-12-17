<template>
  <div class="notification-message">
    <icon-message />
    <span class="notification-counter">5</span>
  </div>
</template>

<script>
import IconMessage from '@/components/icon/message'

export default {
  name: 'notification.message.component',
  components: {
    IconMessage
  }
}
</script>

<style lang="scss" scoped>
  .notification-message{
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