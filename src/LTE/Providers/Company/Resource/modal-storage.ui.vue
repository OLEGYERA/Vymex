<template>
  <div class="resource-modal-storage-ui" v-if="status">
    <div class="modal-title">
      Свободное пространство в хранилище
      ({{percent}} %)
    </div>
    <text-base class="modal-subtitle">
      Вскоре вы не сможете загружать файлы на Диск, а также получать и отправлять письма
    </text-base>
    <div class="modal-storage-buttons">
      <text-base class="button-detailed">Подробнее</text-base>
      <text-base><button-base>Купить место</button-base></text-base>
    </div>
  </div>
</template>

<script>
  import TextBase from '@Facade/Text/Base'
  import ButtonBase from '@Facade/Button/Base'

  export default {
    name: 'Facade.Modal.Storage',
    components: {
      TextBase,
      ButtonBase,
    },
    props: {
      status: {
        type: Boolean,
        required: true
      },
      percent: Number
    },
    computed: {

    }
  }
</script>

<style lang="scss" scoped>
  .resource-modal-storage-ui {
    position: absolute;
    padding: rem(20) rem(16) rem(16) rem(20);
    background-color: $grey-scale-400;
    border-radius: 12px;
    max-width: 386px;
    box-sizing: border-box;
    z-index: 0;
    &::before{
      position: absolute;
      content: "";
      height: 29px;
      width: 29px;
      background-color: inherit;
      transform: rotate(45deg);
      right: 39px;
      top: -5px;
      z-index: -1;
    }
    .modal-subtitle {
      margin-bottom: rem(5);
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      color: #fff;
    }
    .modal-text {
      margin-bottom: rem(19);
    }
    .modal-storage-buttons {
      display: flex;
      justify-content: space-between;
      .button-detailed {
        color: $blue;
        padding: rem(12) 0;
        cursor: pointer;
      }
      .facade-button-base {
        border-radius: 8px;
        padding: rem(12) rem(24);
        width: max-content;
      }
    }
  }
</style>