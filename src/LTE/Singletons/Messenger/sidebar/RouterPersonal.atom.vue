<template>
  <div class="sidebar-router-personal">
    <name :name="user.name" @updateRouter="updateRouter"/>
    <div class="photo">
      <avatar :logo="logo" :colorCode="colorCode"/>
    </div>
    <div class="info-block">
      <div class="user-info">
        <div class="icon-info"><icon-mail/></div>
        <div>
          <text-base>{{user.nickname}}</text-base>
          <title-caption>Имя пользователя VYMEX</title-caption>
        </div>
        <icon-copy/>
      </div>
      <div v-if="user.phone" class="user-info">
        <div class="icon-info"><icon-phone/></div>
        <div>
          <text-base>{{user.phone}}</text-base>
          <title-caption>Телефон</title-caption>
        </div>
        <icon-copy/>
      </div>
      <div v-if="user.mail" class="user-info">
        <div class="icon-info"><icon-letter/></div>
        <div>
          <text-base>{{user.mail}}</text-base>
          <title-caption>Электронная почта</title-caption>
        </div>
        <icon-copy/>
      </div>
      <div v-if="user.birthday" class="user-info">
        <div class="icon-info"><icon-calendar/></div>
        <div>
          <text-base>{{user.birthday}}</text-base>
          <title-caption>День рождения</title-caption>
        </div>
        <icon-copy/>
      </div>
      <text-area v-model="textarea" :type="value">
        <template #title>О себе</template>
      </text-area>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
 import Name from "@/LTE/Singletons/Messenger/Name";
 import Avatar from "@Facade/Image/Avatar";
 import TextBase from "@Facade/Text/Base";
 import TitleCaption from "@Facade/Title/Caption";
 import IconMail from "@Icon/Mail";
 import IconPhone from "@Icon/Phone";
 import IconLetter from "@Icon/Letter";
 import IconCalendar from "@Icon/Calendar";
 import IconCopy from "@Icon/Copy";
 import TextArea from "@Facade/Input/TextArea";

export default {
  name: 'Singleton.Messenger.Sidebar.RouterPersonal',
  components: {
    Name,
    Avatar,
    TextBase,
    TitleCaption,
    IconMail,
    IconPhone,
    IconLetter,
    IconCalendar,
    IconCopy,
    TextArea
  },
  data() {
    return {
      logo: 'AK',
      colorCode: '1',
      user: {
        name: 'Александр Ким',
        nickname: '@arnoldino22',
        phone: '+380(63)-222-33-44',
        mail: 'makaroni@mail.com',
        birthday: '2 апреля',
      },
      textarea: '',
      value: 'Короткий но емкий текст о том насколько я хорош, профессионален, и самое главное — скромен до глубины души.'
    }
  },
  methods: {
    updateRouter(value) {
      this.$emit('updateRouter', value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebar-router-personal{
    width: 100%;
    //height: 100%;
    padding: 8px 0;
    box-sizing: border-box;
    .container-vx-name {
      margin-bottom: 36px;
    }
    .photo {
      margin: 0 auto 32px;
      height: 120px;
      width: 120px;
    }
    .facade-image-avatar::v-deep {
      font-size: 18px;
    }
    .info-block {
      padding: 0 20px;
    }
    .user-info {
      display: flex;
      position: relative;
      padding: 12px 0;
      border-bottom: $grey-scale-400 solid 1px;
      cursor: pointer;
      .icon-info {
        margin-right: 12px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        display: inherit;
        justify-content: center;
        align-items: center;
        background-color: rgba(24, 144, 255, 0.2);
      }
      .icon-copy {
        position: absolute;
        right: 18px;
        top: 50%;
        transform: translateY(-50%);
        display: none;
      }
      .icon {
        height: 16px;
        width: 16px;
      }
    }
    .user-info:active {
      .icon-copy {
        display: block;
      }
    }
    .user-info-about {
      padding: 20px 0;
      display: block;
      .about {
        margin-bottom: 4px;
      }
    }
    .facade-text-base {
      color: #fff;
      margin-bottom: 4px;
    }

    .textarea-count {
      color: #fff;
    }
    .facade-text-area {
      padding: 20px 0;
    }
    .facade-text-area::v-deep {
      .textarea{
        padding: 0 0 24px;
      }
    }
  }
</style>