<template>
  <div class="facade-messenger-header">
    <div class="private-info">
      <transition name="fade">
        <modal-action-list
            :actions="actions"
            :status="statusAction"
            @onClose="statusAction = false"
            @onList="makeAction"
            @onDelete="modalStatus = true">
          <template #del-title>Удалить чат</template>
        </modal-action-list>
      </transition>
      <div class="dialog-image"></div>
      <div class="info-text">
        <text-base><slot>Илон Маск зовет на Марс</slot></text-base>
        <title-caption><slot>4 участника</slot></title-caption>
      </div>
      <div class="menu-button" @click="statusAction = true">
        <points-vertical :class="{active: statusAction}"/>
      </div>
    </div>
    <icon-error @click.native="closeMessenger()"/>
    <modal-base :status="modalStatus" @onClose="modalStatus = false" @onOk="handlePressOk">
      <template #title>Удалить диалог?</template>
      <template #description>Данные будут удалены вместе со всеми медиа данными без возможности восстановления</template>
      <template #button-cancel/>
      <template #button-accept>Удалить</template>
    </modal-base>
  </div>
</template>

<script>
  import TitleCaption from '@Facade/Title/Caption'
  import TextBase from '@Facade/Text/Base'
  import PointsVertical from '@Icon/PointsVertical'
  import IconError from '@Icon/Error'
  import ModalActionList from "@Facade/Modal/ActionList";
  import ModalBase from '@Facade/Modal/Base'
  import {mapMutations} from "vuex";
  export default {
    name: 'Singleton.Messenger.Facades.MessengerHeader',
    components: {
      TitleCaption,
      TextBase,
      PointsVertical,
      IconError,
      ModalActionList,
      ModalBase
    },
    data() {
      return {
        actions: ['Профиль', 'Отключить уведомления'],
        statusAction: false,
        modalStatus: false,
      }
    },
    methods: {
      handlePressOk() {
        this.modalStatus = false
      },
      ...mapMutations({
        closeMessenger: 'Messenger/closeMessenger'
      }),
      // makeAction(id){
      //   if(id === 0){
      //
      //   }
      // }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-messenger-header {
    width: 100%;
    padding: 12px 10px 12px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    background-color: $grey-scale-500;
    border-bottom: $grey-scale-700 solid 1px;
    .private-info {
      position: relative;
      display: inherit;
      align-items: center;
      .dialog-image {
        margin-right: 12px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background-color: #fff;
      }
      .facade-text-base {
        margin-right: 24px;
        color: #fff;
      }
      .icon-points-vertical {
        padding: 10px;
        height: 16px;
        color: $grey-scale-200;
        cursor: pointer;
        transition: color .2s;
      }
      .active {
        color: #fff;
      }
      .facade-modal-action-list::v-deep {
        .action-list-body{
          top: 46px;
          left: 274px; /// говно
        }
      }
    }
    .icon-error{
      color: $grey-scale-200;
      padding: 10px;
      cursor: pointer;
    }
  }

  //.facade-modal-base {
  //  &::v-deep {
  //    .modal-base-body {
  //      width: 632px;
  //      height: 244px;
  //      justify-content: space-between;
  //    }
  //    .modal-base-content {
  //      display: none;
  //    }
  //  }
  //}
</style>