<template>
  <div class="container-vx-group-chat">
    <div class="dialog-image">
      <avatar :colorCode="color" :logo="logo"/>
      <span v-if="dialog.name"><icon-group/></span>
    </div>
    <div class="info-text">
      <div class="top-part">
        <text-base>{{dialog.title}}</text-base>
        <div class="message-info">
          <double-check/>
          <title-caption>{{dialog.time}}</title-caption>
        </div>
      </div>
      <div class="down-part">
        <div>
          <title-caption class="name">{{dialog.name}}</title-caption>
          <title-caption>{{dialog.message}}</title-caption>
        </div>
        <div v-if="dialog.unread" class="message-count">{{dialog.unread}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleCaption from '@Facade/Title/Caption'
import TextBase from '@Facade/Text/Base'
import DoubleCheck from "@Icon/DoubleCheck"
import IconGroup from "@Icon/Group"
import Avatar from '@Facade/Image/Avatar'

export default {
  name: 'Container.Vx.PrivateDialog',
  components: {
    TitleCaption,
    TextBase,
    DoubleCheck,
    IconGroup,
    Avatar
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
.container-vx-group-chat {
  width: 100%;
  box-sizing: border-box;
  min-height: 68px;
  padding: rem(12);
  display: flex;
  align-items: center;
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
      .facade-text-base {
        color: #fff;
      }
      .message-info {
        display: inherit;
        align-items: center;
        .icon-double-check {
          color: $blue;
          height: 16px;
          margin-right: 12px;
        }
      }
    }
    .down-part {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        color: $gray-scale-100;
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
  }
}

</style>