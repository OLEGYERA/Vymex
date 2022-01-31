<template>
  <div class="singleton-messenger-header">
    <div class="private-info">
      <div class="dialog-image"></div>
      <div class="info-text">
        <text-base><slot>Илон Маск зовет на Марс</slot></text-base>
        <title-caption><slot>4 участника</slot></title-caption>
      </div>
      <div class="menu-button" @click="actionListStatus = !actionListStatus">
        <points-vertical :class="{active: actionListStatus}"/>
        <transition name="fade">
          <action-list :items="items" v-if="actionListStatus"/>
        </transition>
      </div>
    </div>
    <icon-error/>
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
  import ActionList from "@/LTE/Singletons/Messenger/facades/ActionList";
  import ModalBase from '@Facade/Modal/Base'
  export default {
    name: 'Singleton.Messenger.GroupHeader',
    components: {
      TitleCaption,
      TextBase,
      PointsVertical,
      IconError,
      ActionList,
      ModalBase
    },
    data() {
      return {
        items: ['Профиль', 'Отлючить уведомления', 'Удалить чат'],
        actionListStatus: false,
        modalStatus: false,
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .singleton-messenger-header {
    width: 100%;
    padding: 12px 10px 12px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    background-color: $grey-scale-500;
    border-bottom: $grey-scale-700 solid 1px;
    .private-info {
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
      .icon-points {
        padding: 10px;
        height: 16px;
        color: $grey-scale-200;
        cursor: pointer;
        transition: color .2s;
      }
      .active {
        color: #fff;
      }
    }
    .icon-error{
      color: $grey-scale-200;
      padding: 10px;
      cursor: pointer;
    }
  }
  .menu-button {
    position: relative;
    .singleton-messenger-action-list {
      position: absolute;
      bottom: -10px;
      z-index: 1;
      left: 10px;
      transform: translateY(100%);
    }
  }
  .facade-modal-base {
    &::v-deep {
      .modal-base-body {
        width: 632px;
        height: 244px;
        justify-content: space-between;
      }
      .modal-base-content {
        display: none;
      }
    }
  }
</style>