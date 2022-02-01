<template>
  <div class="singleton-messenger-chat">
    <div class="dialog-image">
      <avatar :logo="logo" :colorCode="color"/>
      <span v-if="dialog.name"><icon-group/></span>
    </div>
    <div class="info-text">
      <div class="top-part">
        <text-base>{{dialog.title}}</text-base>
        <div class="message-info">
          <div class="message-check">
            <double-check v-if="dialog.status==='delivered'"/>
            <single-check v-if="dialog.status==='sent'"/>
          </div>
          <title-caption>{{dialog.time}}</title-caption>
        </div>
      </div>
      <title-caption class="name">{{dialog.name}}</title-caption>
      <title-caption>{{dialog.message}}</title-caption>
    </div>
    <template v-if="dialog.unread">
      <info-amount>{{dialog.unread}}</info-amount>
    </template>
  </div>
</template>

<script>
import TitleCaption from '@Facade/Title/Caption'
import TextBase from '@Facade/Text/Base'
import DoubleCheck from "@Icon/DoubleCheck"
import IconGroup from "@Icon/Group"
import Avatar from '@Facade/Image/Avatar'
import SingleCheck from '@Icon/SingleCheck'
import InfoAmount from "@/LTE/Singletons/Messenger/facades/info-amount";

export default {
  name: 'Singleton.Messenger.Chat',
  components: {
    TitleCaption,
    TextBase,
    DoubleCheck,
    IconGroup,
    Avatar,
    SingleCheck,
    InfoAmount
  },
  data() {
    return {
      color: '1'
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
  }
}
</script>

<style lang="scss" scoped>
  .singleton-messenger-chat {
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
  }
</style>