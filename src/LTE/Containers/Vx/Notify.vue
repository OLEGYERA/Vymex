<template>
  <div class="container-vx-message">
    <div class="message-head">
      <div class="message-part">
        <div class="message-icon">
          <img v-if="info.icon" :src="info.icon"/>
          <icon-info
            v-else
            :class="{
              'icon-success': success,
              'icon-reject': reject
            }"
          />
        </div>
        <title-sub>{{ info.title }}</title-sub>
      </div>
      <title-caption>{{ info.time }}</title-caption>
    </div>
    <div class="message-text">
      <slot name="text"></slot>
      <a class="message-link" href="info.link" v-if="link">
        тут
      </a>
      <button-base v-if="info.manage">Перейти</button-base>
      <div class="message-buttons" v-if="response">
        <button-base class="message-button-reject">Отклонить</button-base>
        <button-base class="message-button-accept"> Принять</button-base>
      </div>
    </div>
  </div>
</template>

<script>
  import IconInfo from '@Icon/Colored/Info'
  import ButtonBase from '@Facade/Button/Base'
  import TitleSub from '@Facade/Title/Sub'
  import TitleCaption from '@Facade/Title/Caption'

  export default {
    name: 'Container.Vx.NotificationPlate',
    components: {
      IconInfo,
      ButtonBase,
      TitleSub,
      TitleCaption
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
    }
  } 
</script>

<style lang="scss" scoped>
  .container-vx-message {
    margin-bottom: 12px;
    .message-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px;
      background-color: $grey-scale-300;
      color: #fff;
      border-radius: 12px 12px 0 0;
      .message-part {
        display: flex;
        align-items: center;
      }
      .message-icon {
        margin-right: 8px;
        height: 28px;
      }
      .icon-success {
        background-color: $green;
      }
      .icon-reject {
        background-color: $red;
      }
      .facade-title-caption ::v-deep {
        margin-right: 12px;
        color: #fff;
      }
    }
    .message-text {
      padding: 16px;
      color: #fff;
      background-color: $grey-scale-400;
      font-size: 15px;
      font-weight: 400;
      line-height: 20px;
      border-radius: 0 0 12px 12px;
      .message-link {
        color: $blue;
        text-decoration: none;
      }
    }
    .facade-button-base ::v-deep {
      padding: 0;
      margin-top: 12px;
      height: 36px;
      width: 96px;
      align-items: center;
      border-radius: 18px;
    }
    .message-buttons {
      display: flex;
    }
    .message-button-reject {
      margin-right: 12px;
      width: 112px;
      background-color: $red;
    }
    .message-button-accept {
      background-color: $green;
    }
  }
</style>