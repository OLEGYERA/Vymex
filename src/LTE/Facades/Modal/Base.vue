<template>
  <div class="facade-modal-base" v-if="status" @click.stop>
    <div class="modal-base-body">
      <button-close @onClick="$emit('onClose')"/>
      <div class="modal-base-header">
        <title-semi><slot name="title"/></title-semi>
        <text-base><slot name="description"/></text-base>
      </div>
      <div class="modal-base-content"><slot name="content"/></div>
      <div class="modal-base-footer">
        <button-secondary @onClick="$emit('onClose')"><slot name="button-cancel">Отмена</slot></button-secondary>
        <button-base :disable="buttonDisable" @onClick="$emit('onOk')"><slot name="button-accept">Сохранить</slot></button-base>
      </div>
    </div>
  </div>
</template>

<script>
  import ButtonClose from '@Facade/Button/Close'
  import TitleSemi from '@Facade/Title/Semi'
  import TextBase from '@Facade/Text/Base'
  import ButtonBase from '@Facade/Button/Base'
  import ButtonSecondary from '@Facade/Button/Secondary'

  export default {
    name: 'Facade.Modal.Base',
    components: {
      ButtonClose,
      TitleSemi,
      TextBase,
      ButtonBase,
      ButtonSecondary
    },
    props: {
      status: {
        type: Boolean,
        required: true
      },
      buttonDisable: {
        type: Boolean,
        default: () => false
      },
    },
    computed: {

    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .facade-modal-base{
    display: flex;
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($grey-scale-700, .8);
    .modal-base-body{
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 620px;
      //height: 720px;
      margin: auto;
      position: relative;
      box-sizing: border-box;
      background-color: $grey-scale-500;
      border-radius: 16px;
      padding: 48px 82px;
      .facade-button-close{
        position: absolute;
        top: 5px;
        right: 5px;
      }
      .modal-base-header{
        .facade-title-semi{
          margin-bottom: 8px;
          text-align: center;
        }
        .facade-text-base{
          text-align: center;
        }
      }
      .modal-base-content{
        margin: 16px 0;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
      }
      .modal-base-footer{
        display: flex;
        flex-shrink: 0;
        justify-content: space-around;
        align-items: center;
        overflow: hidden;
        .facade-button-base,
        .facade-button-secondary{
          width: 50%;
        }
        .facade-button-secondary{
          padding: 16px 0;
          margin-right: 24px;
        }
        .facade-button-base{
          &[disable] {
            background-color: $grey-scale-400;
          }
        }
      }
    }
  }
</style>