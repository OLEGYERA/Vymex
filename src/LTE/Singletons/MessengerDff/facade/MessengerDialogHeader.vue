<template>
  <div class="facade-messenger-header">
    <div class="private-info">
      <transition name="fade">
        <modal-action-list
            :actions="actions"
            :status="statusAction"
            @onClose="statusAction = false"
            @onDelete="modalStatus = true"
            @onList="chooseAction"
        >
          <template #del-title>Удалить чат</template>
        </modal-action-list>
      </transition>
      <div class="dialog-avatar">
        <image-avatar :logo="$core.traits.ImageLogo(chat.avatar , chat.name || chat.title, chat.lastname || chat.title.split(' ')[1])" :color-code="$core.traits.ImageColorCode(chat.id)"/>
      </div>
      <div class="info-text">
        <text-base>{{ title }}</text-base>
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
  import TextBase from '@Facade/Text/Base'
  import PointsVertical from '@Icon/PointsVertical'
  import IconError from '@Icon/Error'
  import ModalActionList from "@Facade/Modal/ActionList";
  import ModalBase from '@Facade/Modal/Base'
  import ImageAvatar from '@Facade/Image/Avatar'

  import {mapMutations} from "vuex";

  export default {
    name: 'Singleton.Messenger.Facades.MessengerHeader',
    components: {
      TextBase,
      PointsVertical,
      IconError,
      ModalActionList,
      ModalBase,
      ImageAvatar
    },
    data() {
      return {
        actions: ['Профиль', 'Отключить уведомления'],
        statusAction: false,
        modalStatus: false,
      }
    },
    props:{
      chat: {
        type: Object,
        required: true
      }
    },
    computed:{
      title(){
        return this.chat.title ? this.chat.title : `${this.chat.name} ${this.chat.lastname}`
      }
    },
    methods: {
      handlePressOk() {
        this.routerNull()
        this.$notify({text: 'Чат удален', type: 'success', duration: 3000, speed: 500})
        this.modalStatus = false
        this.closeMessenger()
      },
      ...mapMutations({
        closeMessenger: 'Messenger/closeMessenger',
        routerNext: 'Messenger/ToolsScene/routerNext',
        routerNull: 'Messenger/ToolsScene/routerNull'
      }),
      chooseAction(id){
        console.log(id)
        if(id === 0){
          this.$core.execViaComponent('MsgUser', 'full', this.chat.id);
          this.routerNext({name: 'contact-info'})
        }
        if(id === 1){
          this.$notify({text: 'Уведомления отключены', type: 'success', duration: 3000, speed: 500})
        }
      }
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
      .dialog-avatar {
        margin-right: 12px;
        height: 40px;
        width: 40px;
      }
      .facade-text-base {
        min-width: 180px;
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
          left: 266px; /// говно
        }
      }
    }
    .icon-error{
      color: $grey-scale-200;
      padding: 10px;
      cursor: pointer;
    }
  }
</style>