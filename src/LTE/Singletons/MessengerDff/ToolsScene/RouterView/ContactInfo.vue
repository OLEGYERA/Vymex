<template>
  <div class="router-contact-info-view">
    <div class="main-info">
      <name
          :name="`${contactInfo.name} ${contactInfo.lastname}`"
          @onClick="routerBack()"
          :actions="actions"
          del-title="Удалить из контактов"
          @onDelete="statusBase = true"
          @onList="$notify({text: 'Уведомления отключены', type: 'success', duration: 3000, speed: 500})"
          :type="'user'"/>

      <modal-base :status="statusBase" @onClose="statusBase = false" @onOk="deleteContact">
        <template #title>Удалить из контактов?</template>
        <template #description>
          Контакт будет удален вместе со всеми медиа данными без возможности восстановления
        </template>
        <template #button-accept>Удалить</template>
      </modal-base>

      <div class="photo">
        <image-avatar :logo="$core.traits.ImageLogo(contactInfo.avatar, contactInfo.name, contactInfo.lastname)" :color-code="$core.traits.ImageColorCode(contactInfo.id)"/>
      </div>
      <div class="info-block">
        <div class="group-top-block">
          <div class="user-info" v-if="contactInfo.alias" @click="copyInfo">
            <div class="icon-info"><icon-mail/></div>
            <div class="info-text-group">
              <text-base>{{contactInfo.alias}}</text-base>
              <title-caption>Имя пользователя VYMEX</title-caption>
            </div>
            <icon-copy/>
          </div>
          <div class="user-info" v-if="contactInfo.details.telephone" @click="copyInfo">
            <div class="icon-info"><icon-phone/></div>
            <div class="info-text-group">
              <text-base>{{contactInfo.details.telephone}}</text-base>
              <title-caption>Телефон</title-caption>
            </div>
            <icon-copy/>
          </div>
          <div class="user-info" v-if="contactInfo.details.email" @click="copyInfo">
            <div class="icon-info"><icon-letter/></div>
            <div class="info-text-group">
              <text-base>{{contactInfo.details.email}}</text-base>
              <title-caption>Электронная почта</title-caption>
            </div>
            <icon-copy/>
          </div>
          <div class="user-info" v-if="contactInfo.details.birthday" @click="copyInfo">
            <div class="icon-info"><icon-calendar/></div>
            <div class="info-text-group">
              <text-base>{{contactInfo.details.birthday}}</text-base>
              <title-caption>День рождения</title-caption>
            </div>
            <icon-copy/>
          </div>
        </div>
        <div v-if="contactInfo.details.about">
          <text-area :model="contactInfo.details.about" placeholder="О себе" disable labeled/>
        </div>
        <div class="button-msg-row">
          <title-sub>
            <button-base @onClick="sendContactMessage">Написать</button-base>
          </title-sub>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/

 import Name from "@/LTE/Singletons/MessengerDff/facade/Name";
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
 import ModalBase from '@Facade/Modal/Base'

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
      TitleSub,
      ModalBase
    },
    data() {
      return {
        actions: ['Отлючить уведомления'],
        statusBase: false
      }
    },
    updated() {
      console.log('mounted', this.contactInfo)
    },
    computed: {
      ...mapGetters({
        contactInfo: 'Messenger/getCurrentContact'
      }),
    },
    methods: {
      ...mapMutations({
        openMessenger: 'Messenger/openMessenger',
        routerBack: 'Messenger/ToolsScene/routerBack',
        setActiveChat: 'Messenger/setActiveChat'
      }),
      sendContactMessage(){
        this.setActiveChat(['searchedContacts', this.contactInfo.id])
        this.openMessenger()
      },
      updateRouter(value) {
        this.$emit('updateRouter', 'search')
      },
      copyInfo(){
        this.$notify({text: 'Данные скопированы', type: 'success', duration: 3000, speed: 500})
      },
      deleteContact(){
        this.statusBase = false
        this.$notify({text: 'Контакт удален', type: 'success', duration: 3000, speed: 500})
        this.routerBack()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .router-contact-info-view{
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
        .group-top-block{
          margin-bottom: 20px;
        }
        .facade-input-text-area::v-deep {
          .textarea-title{
            font-size: 12px;
          }
          .textarea-container{
            border-width: 1px;
            border-color: $grey-scale-400;
            padding: 0 0 24px ;
          }
          &[labeled] {
            textarea {
              padding-top: 12px;
            }
          }
          textarea{
            color: #fff;
          }
        }
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
          top: 24px;
          display: none;
          transition: all .2s;
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
      .user-info:active {
        .icon-copy {
          transform: scale(0.8);
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

      .button-msg-row{
        margin-top: 44px;
      }
    }
  }
</style>