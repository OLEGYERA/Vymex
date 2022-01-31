<template>
  <div class="sidebar-router-personal">
    <name :name="fullName" @onNewRoute="onNewRoute"/>
    <div class="photo">
      <avatar :logo="avatar.logo" :colorCode="avatar.colorCode"/>
    </div>
    <div class="info-block">
      <div class="user-info">
        <div class="icon-info"><icon-mail/></div>
        <div>
          <text-base>{{alias}}</text-base>
          <title-caption>Имя пользователя VYMEX</title-caption>
        </div>
        <icon-copy/>
      </div>
      <div class="user-info">
        <div class="icon-info"><icon-phone/></div>
        <div>
          <text-base>{{phone}}</text-base>
          <title-caption>Телефон</title-caption>
        </div>
        <icon-copy/>
      </div>
      <div class="user-info">
        <div class="icon-info"><icon-letter/></div>
        <div>
          <text-base>{{email}}</text-base>
          <title-caption>Электронная почта</title-caption>
        </div>
        <icon-copy/>
      </div>
      <div class="user-info">
        <div class="icon-info"><icon-calendar/></div>
        <div>
          <text-base>{{birthday}}</text-base>
          <title-caption>День рождения</title-caption>
        </div>
        <icon-copy/>
      </div>
      <text-area v-model="textarea" :textAreaValue="about" :max-length="1000">
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
import {mapGetters, mapMutations} from "vuex";

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
      textarea: '',
      about: this.about || 'Короткий но емкий текст о том насколько я хорош, профессионален, и самое главное — скромен до глубины души.',
    }
  },
  updated() {
    console.log(this.textarea)
  },
  computed: {
    ...mapGetters({
      fullName: 'getUserFullName',
      birthday: 'getUserBirthday',
      alias: 'getUserAlias',
      phone: 'getUserTelephone',
      email: 'getUserEmail',
      about: 'getUserAbout',
      avatar: 'getUserAvatarData',
    }),
  },
  methods: {
    onNewRoute(value) {
      this.$emit('onNewRoute', value)
    },
    ...mapMutations({
      setRouterName: 'Messenger/setRouterName',
      setUserProfileData: 'setUserProfileData',
      setUserAvatar: 'setUserAvatar'
    }),
  },
}
</script>

<style lang="scss" scoped>
  .sidebar-router-personal{
    width: 100%;
    height: 100%;
    padding: 8px 0;
    box-sizing: border-box;
    overflow-y: scroll;
    .container-vx-name {
      margin-bottom: 36px;
    }
    .photo {
      margin: 0 auto 32px;
      height: 120px;
      width: 120px;
    }
    .facade-image-avatar{
      &::v-deep {
        .color {
          font-size: 24px;
        }
      }
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
    .user-info:hover {
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
    .facade-text-area {
      margin-top: 12px;
      ::v-deep {
        .textarea-container{
          padding-bottom: 24px;
        }
      }
    }
  }
</style>