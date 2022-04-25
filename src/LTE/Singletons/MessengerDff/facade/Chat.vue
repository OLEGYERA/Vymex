<template>
  <div class="facade-messenger-chat" @click="$emit('onClick', dialog.id)" @click.right.prevent="status = true">
    <div class="dialog-image">
      <image-avatar :logo="$core.traits.ImageLogo(dialog.avatar, dialog.title, dialog.title.split(' ')[1])" :color-code="$core.traits.ImageColorCode(dialog.id)"/>
      <span v-if="dialog.type === 'group'"><icon-group/></span>
    </div>
    <div class="info-text">
      <div class="top-part">
        <text-base>{{dialog.title}}</text-base>
        <div class="message-info">
          <div class="message-check">
            <icon-double-check v-if="dialog.status==='delivered'"/>
            <icon-single-check v-if="dialog.status==='sent'"/>
          </div>
          <title-caption>{{dialog.time}}</title-caption>
        </div>
      </div>
      <title-caption class="name">{{dialog.name}}</title-caption>
      <title-caption v-if="dialog.message">{{dialog.message}}</title-caption>
    </div>
    <template v-if="dialog.unread">
      <info-amount>{{dialog.unread}}</info-amount>
    </template>
    <modal-action-list :status="status" :actions="actions" @onClose="status = false" @onList="chooseAction" @onDelete="deleteChat">
      <template #del-title>Выйти из чата</template>
    </modal-action-list>
  </div>
</template>

<script>
  import TitleCaption from '@Facade/Title/Caption'
  import TextBase from '@Facade/Text/Base'
  import IconDoubleCheck from "@Icon/DoubleCheck"
  import IconGroup from "@Icon/Group"
  import ImageAvatar from '@Facade/Image/Avatar'
  import IconSingleCheck from '@Icon/SingleCheck'
  import InfoAmount from "@/LTE/Singletons/facades/InfoAmount";
  import ModalActionList from "@Facade/Modal/ActionList";

  export default {
    name: 'Singleton.Messenger.Facades.Chat',
    components: {
      TitleCaption,
      TextBase,
      IconDoubleCheck,
      IconGroup,
      ImageAvatar,
      IconSingleCheck,
      InfoAmount,
      ModalActionList
    },
    data() {
      return {
        color: '1',
        status: false,
        actions: ['Отключить уведомления', 'Отметить не прочитанным']
      }
    },
    props: {
      dialog: {
        type: Object,
        required: true,
      },
    },
    computed: {
      logo: function () {
        let initials = ''
        for (const char of this.dialog.title) {
          if (char === char.toUpperCase() && char !== ' ') {
            initials += char
          }
        }
        return initials.slice(0, 2);
      },
    },
    methods: {
      chooseAction(id){
        if(id === 0){
          this.$notify({text: 'Уведомления отключены', type: 'success', duration: 3000, speed: 500})
        }
        if (id === 1){
          this.$notify({text: 'Чат отмечен как прочитанный', type: 'success', duration: 3000, speed: 500})
        }
      },
      deleteChat(){
        this.$notify({text: 'Групповой чат был удален', type: 'success', duration: 3000, speed: 500})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-messenger-chat {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    min-height: 76px;
    padding: rem(12);
    display: flex;
    background-color: $grey;
    border-radius: 12px;
    cursor: pointer;
    &:hover {
      background-color: $grey-scale-500;
    }
    &:active {
      background-color: $grey-scale-400;
    }
    .dialog-image {
      position: relative;
      margin-right: 12px;
      align-self: center;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      background-color: #fff;
      .icon-group {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 17px;
        color: $grey-scale-400;
      }
    }
    .info-text {
      min-width: 254px;
      .top-part {
        display: flex;
        justify-content: space-between;
        height: 20px;
        .facade-text-base {
          color: #fff;
        }
        .message-info {
          display: inherit;
          align-items: center;
          .message-check {
            margin-right: 12px;
            margin-top: -2px;
            .icon-double-check {
              color: $blue;
            }
            .icon-single-check {
              color: rgba($blue, .4);
            }
          }
        }
      }
      .name {
        color: $gray-scale-100;
      }
    }
    .facade-info-amount {
      position: absolute;
      right: 12px;
      bottom: 16px;
    }
    .facade-modal-action-list::v-deep {
      .action-list-body{
        left: 90px;
        top: 40px;
      }
    }
  }
</style>