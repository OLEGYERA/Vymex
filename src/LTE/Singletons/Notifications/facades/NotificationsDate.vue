<template>
  <div class="facade-date-box">
    <title-caps>
      <slot name="date">сегодня, 16 янв.</slot>
      <span class="notifications-count">
        <slot name="count">4</slot>
      </span>
    </title-caps>
      <button-close/>
<!--      <action-list :items="items" :actionListStatus="true"/>-->
  </div>
</template>

<script>
  import ButtonClose from "@Facade/Button/Close";
  import TitleCaps from "@Facade/Title/Caps";

  export default {
    name: 'Singleton.Notifications.Notifications',
    components: {
      ButtonClose,
      TitleCaps,
    },
    data() {
      return {
        items: ['Удалить все'],
      }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-date-box {
    position: relative;
    padding: 4px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .notifications-count {
      color: $blue;
    }
    .facade-button-close {
      height: 24px;
      width: 24px;
      margin-right: 4px;
      background-color: $grey-scale-400;
    }
    .facade-modal-action-list::v-deep {
      position: absolute;
      right: 0;
      top: 0;
      width: 248px;
      padding: 8px 0;
      transform: translateY(-100%);
      //z-index: 10;
      .action-item {
        padding: 12px 16px;
      }
    }
  }
</style>