<template>
  <div class="singleton-messenger-private-dialog" @click="$emit('changeMessenger', 'owner')">
    <div class="private-info">
      <div class="dialog-image">
        <avatar :logo="logo" :colorCode="color"/>
      </div>
      <div class="info-text">
        <title-caption>Личные диалоги</title-caption>
        <text-base>{{name}}</text-base>
      </div>
    </div>
    <div class="message-count">2</div>
  </div>
</template>

<script>
   import TitleCaption from '@Facade/Title/Caption'
   import TextBase from '@Facade/Text/Base'
   import Avatar from "@Facade/Image/Avatar";

export default {
  name: 'Singleton.Messenger.MessagesHeader',
  components: {
    TitleCaption,
    TextBase,
    Avatar
  },
  props: {
    name: String,
  },
  data() {
    return {
      color: '5'
    }
  },
  computed: {
    logo: function () {
      let initials = ''
      for (const char of this.name) {
        if (char === char.toUpperCase() && char !== ' ') {
          initials += char
        }
      }
      return initials.slice(0, 2);
    }
  }
}
</script>

<style lang="scss" scoped>
  .singleton-messenger-private-dialog {
    //width: 100%;
    padding: rem(12) rem(20);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $grey-scale-500;
    border-bottom: $grey-scale-700 solid 1px;
    cursor: pointer;
    .private-info {
      display: inherit;
      align-items: center;
      color: #fff;
      .dialog-image {
        margin-right: 12px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background-color: #fff;
      }
      .facade-title-caption {
        color: $gray-scale-100;
      }
      .facade-text-base{
        color: #fff;
      }
    }
    .message-count {
      height: 24px;
      width: 24px;
      border-radius: 8px;
      background-color: $blue;
      color: #fff;
      font-weight: 600;
      font-size: rem(12);
      line-height: rem(24);
      text-align: center;
    }
  }
</style>