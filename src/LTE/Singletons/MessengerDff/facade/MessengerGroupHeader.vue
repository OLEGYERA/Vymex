<template>
  <div class="facade-messenger-header" @click="$emit('onClick')">
    <div class="private-info">
      <transition name="fade">
        <modal-action-list
            :actions="actions"
            :status="statusAction"
            @onClose="statusAction = false"
            @onDelete="deleteChat"
            @onList="chooseAction"
            :disable-delete="disable"
            >
          <template v-if="!disable" #del-title>Выйти из чата</template>
        </modal-action-list>
      </transition>
      <div class="dialog-avatar">
        <image-avatar :logo="$core.traits.ImageLogo(chat.avatar, chat.title)" :color-code="$core.traits.ImageColorCode(chat.id)"/>
      </div>
      <div class="info-text">
        <text-base>{{chat.title}}</text-base>
        <title-caption><slot>{{members}}</slot></title-caption>
      </div>
      <div class="menu-button" @click.stop="statusAction = true">
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
  import ImageAvatar from '@Facade/Image/Avatar'

  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'Singleton.Messenger.Facades.MessengerHeader',
    components: {
      TitleCaption,
      TextBase,
      PointsVertical,
      IconError,
      ModalActionList,
      ModalBase,
      ImageAvatar
    },
    data() {
      return {
        actionsOwner: ['Отключить уведомления', 'Отметить непрочитанным', 'Редактировать'],
        actionsUser: ['Отключить уведомление', 'Отметить непрочитанным'],
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
      ...mapGetters({
        id: 'getUserID',
      }),
      actions(){
        if(this.id === this.chat.owner.id){
          return this.actionsOwner
        }
        return this.actionsUser
      },
      disable(){
        return this.id === this.chat.owner.id
      },
      members(){
        const usersAmount = this.chat.users.length + 1
        if(usersAmount >4 && usersAmount < 21){
          return `${usersAmount} участников`
        }
        if (Number(String(usersAmount).slice(-1)) === 1) {
          return `${usersAmount} участник`
        }
        if (Number(String(usersAmount).slice(-1)) < 5){
          return `${usersAmount} участника`
        }
        return `${usersAmount} участников`
      }
    },

    methods: {
      handlePressOk() {
        this.modalStatus = false
      },
      ...mapMutations({
        closeMessenger: 'Messenger/closeMessenger',
        routerNext: 'Messenger/ToolsScene/routerNext',
      }),
      chooseAction(id) {
        if(id === 0){
          this.$notify({text: 'Уведомления отключены', type: 'success', duration: 3000, speed: 500})
        }
        if (id === 1){
          this.$notify({text: 'Отмечено как не прочитанное', type: 'success', duration: 3000, speed: 500})
        }
        if (id === 2){
          this.routerNext({name: 'edit-group'})
        }
      },
      deleteChat(){
        this.closeMessenger()
        this.$notify({text: 'Групповой чат был удален', type: 'success', duration: 3000, speed: 500})
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
    cursor: pointer;
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
</style>