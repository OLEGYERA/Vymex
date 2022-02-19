<template>
  <div class="router-personal-view">
    <div class="main-info">
      <name :name="`${contactInfo.name} ${contactInfo.lastname}`" @updateRouter="updateRouter" :type="type"/>
      <div class="photo">
        <image-avatar :logo="$core.traits.ImageLogo(contactInfo.avatar, contactInfo.name, contactInfo.lastname)" :color-code="$core.traits.ImageColorCode(contactInfo.id)"/>
      </div>
      <div class="info-block">
        <div class="user-info" v-if="contactInfo.alias">
          <div class="icon-info"><icon-mail/></div>
          <div class="info-text-group">
            <text-base>{{contactInfo.alias}}</text-base>
            <title-caption>Имя пользователя VYMEX</title-caption>
          </div>
          <icon-copy/>
        </div>
        <div class="user-info" v-if="contactInfo.details.telephone">
          <div class="icon-info"><icon-phone/></div>
          <div class="info-text-group">
            <text-base>{{contactInfo.details.telephone}}</text-base>
            <title-caption>Телефон</title-caption>
          </div>
          <icon-copy/>
        </div>
        <div class="user-info" v-if="contactInfo.details.email">
          <div class="icon-info"><icon-letter/></div>
          <div class="info-text-group">
            <text-base>{{contactInfo.details.email}}</text-base>
            <title-caption>Электронная почта</title-caption>
          </div>
          <icon-copy/>
        </div>
        <div class="user-info" v-if="contactInfo.details.birthday">
          <div class="icon-info"><icon-calendar/></div>
          <div class="info-text-group">
            <text-base>{{contactInfo.details.birthday}}</text-base>
            <title-caption>День рождения</title-caption>
          </div>
          <icon-copy/>
        </div>
        <div class="button-msg-row">
          <title-sub>
            <button-base @onClick="sendContactMessage">Написать</button-base>
          </title-sub>
        </div>
<!--        <text-area v-model="textarea" :model="contactInfo.about" placeholder="О себе" disable/>-->
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/

 import Name from "@/LTE/Singletons/Messenger/facades/Name";
 import ImageAvatar from "@Facade/Image/Avatar";
 import TextBase from "@Facade/Text/Base";
 import TitleCaption from "@Facade/Title/Caption";
 import IconMail from "@Icon/Mail";
 import IconPhone from "@Icon/Phone";
 import IconLetter from "@Icon/Letter";
 import IconCalendar from "@Icon/Calendar";
 import IconCopy from "@Icon/Copy";
 import TextArea from "@Facade/Input/TextArea";
 import ButtonBase from '@Facade/Button/Base'
 import TitleSub from '@Facade/Title/Sub'
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'Singleton.Messenger.Views.Sidebar.RouterPersonal',
  components: {
    Name,
    ImageAvatar,
    TextBase,
    TitleCaption,
    IconMail,
    IconPhone,
    IconLetter,
    IconCalendar,
    IconCopy,
    TextArea,
    ButtonBase,
    TitleSub
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
      type: 'Messenger/personalRouterType',
      contactInfo: 'Messenger/getCurrentContact'
    }),
  },
  methods: {
    ...mapMutations({
      openMessenger: 'Messenger/openMessenger'
    }),
    sendContactMessage(){
      console.log(243234231)
      this.openMessenger()
    },
    updateRouter(value) {
      this.$emit('updateRouter', 'search')
    }
  }
}
</script>

<style lang="scss" scoped>
  .router-personal-view{
    width: 100%;
    height: 100%;
    padding: 8px 0;
    box-sizing: border-box;
    overflow: hidden;
    .main-info {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      .container-vx-name {
        margin-bottom: 36px;
      }
      .photo {
        margin: 0 auto 32px;
        height: 120px;
        width: 120px;
      }
      .facade-image-avatar ::v-deep {
        .color {
          font-size: 24px;
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
          color: $blue;
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
        margin: 12px 0 44px;
        ::v-deep {
          .textarea-container{
            padding-bottom: 24px;
          }
        }
      }
      .button-msg-row{
        margin-top: 24px;
      }
    }
  }
</style>