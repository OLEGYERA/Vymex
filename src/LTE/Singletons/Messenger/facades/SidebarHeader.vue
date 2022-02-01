<template>
  <div class="facade-sidebar-header">
    <div class="sidebar-header-body">
      <div class="personal-msg-info">
        <image-avatar :logo="avatar.logo" :colorCode="avatar.colorCode"/>
        <div class="msg-info-heads">
          <title-caption>Личные диалоги</title-caption>
          <text-base>{{fullName}}</text-base>
        </div>
      </div>
      <template v-if="unreadMessages">
        <info-amount>{{unreadMessages}}</info-amount>
      </template>
    </div>
  </div>
</template>

<script>
  import ImageAvatar from '@Facade/Image/Avatar'
  import TitleCaption from '@Facade/Title/Caption'
  import TextBase from '@Facade/Text/Base'
  import InfoAmount from "@/LTE/Singletons/Messenger/facades/info-amount";

  export default {
    name: 'Singleton.Messenger.Facades.SidebarHeader',
    components: {ImageAvatar, TitleCaption, TextBase, InfoAmount},
    props: {
      avatar: {
        type: Object,
        required: true
      },
      fullName: {
        type: String,
        required: true
      },
      unreadMessages: {
        validator: (_uM) => typeof _uM === 'string' || _uM === null
      }

    }
  }
</script>

<style lang="scss" scoped>
  .facade-sidebar-header{
    width: 100%;
    background-color: $grey-scale-500;
    border-bottom: $grey-scale-700 solid 1px;
    .sidebar-header-body{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      padding: rem(12) rem(20);
      box-sizing: border-box;
      .personal-msg-info{
        width: 100%;
        display: inherit;
        align-items: center;
        .facade-image-avatar{
          width: 40px;
          height: 40px;
        }
        .msg-info-heads{
          width: 100%;
          margin-left: 12px;
          .facade-title-caption{
            margin-bottom: 2px;
            color: #fff;
          }
          .facade-text-base{
            color: #fff;
          }

        }
      }
      .unread-msg-counter{
        padding: 4px 8px;
        border-radius: 8px;
        background-color: $blue;
        .facade-title-caps{
          color: #fff;
        }
      }
    }
  }
</style>