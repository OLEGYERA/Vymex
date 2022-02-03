<template>
  <div class="facade-notify">
    <div class="notify-header">
      <div class="notify-left-part">
        <div class="notify-icon">
          <img v-if="info.icon" :src="info.icon"/>
          <icon-info
            v-else
            :class="{
              'icon-success': success,
              'icon-reject': reject
            }"
          />
        </div>
        <div>
          <title-sub>{{ info.title }}</title-sub>
          <div class="notify-name">{{ fullName }}</div>
        </div>
      </div>
      <title-caption>{{ info.time }}</title-caption>
    </div>
    <div class="notify-main">
      <text-base>
        <slot name="text"></slot>
        <a class="notify-link" href="info.link" v-if="link">
          тут
        </a>
      </text-base>
      <button-base v-if="info.manage">Перейти</button-base>
      <div class="notify-buttons" v-if="response">
        <button-base class="notify-button-reject">Отклонить</button-base>
        <button-base class="notify-button-accept"> Принять</button-base>
      </div>
    </div>
  </div>
</template>

<script>
  import IconInfo from '@Icon/Colored/Info'
  import ButtonBase from '@Facade/Button/Base'
  import TitleSub from '@Facade/Title/Sub'
  import TitleCaption from '@Facade/Title/Caption'
  import TextBase from '@Facade/Text/Base'
  import {mapGetters} from 'vuex';

  export default {
    name: 'Singleton.Facades.Notify',
    components: {
      IconInfo,
      ButtonBase,
      TitleSub,
      TitleCaption,
      TextBase
    },
    props: {
      info: {
        type: Object,
        required: true,
      },
      response: Boolean,
      link: String,
      success: Boolean,
      reject: Boolean
    },
    computed: {
      ...mapGetters({
        fullName: 'getUserFullName'
      })
    }
  } 
</script>

<style lang="scss" scoped>
  .facade-notify{
    margin-bottom: 12px;
    .notify-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px;
      background-color: $grey-scale-300;
      color: #fff;
      border-radius: 12px 12px 0 0;
      .notify-left-part {
        display: inherit;
        align-items: center;
        .notify-icon {
          margin-right: 8px;
          height: 28px;
        }
        .icon-success {
          background-color: $green;
        }
        .icon-reject {
          background-color: $red;
        }
        .facade-title-sub {
          margin-bottom: 2px;
        }
        .notify-name {
          font-weight: 500;
          font-size: 13px;
          line-height: 13px;
          color: $grey-scale-200;
        }
      }
      .facade-title-caption{
        margin-right: 12px;
        color: #fff;
      }
    }
    .notify-main {
      padding: 16px;
      background-color: $grey-scale-400;
      border-radius: 0 0 12px 12px;
      .facade-text-base {
        color: #fff;
      }
      .notify-link {
        color: $blue;
        text-decoration: none;
      }
      .facade-button-base{
        padding: 8px 0;
        margin-top: 12px;
        width: 96px;
        align-items: center;
        border-radius: 18px;
      }
      .message-buttons {
        display: flex;
      }
      .message-button-reject {
        margin-right: 12px;
        width: 113px;
        background-color: $red;
      }
      .message-button-accept {
        background-color: $green;
      }
    }
  }
</style>