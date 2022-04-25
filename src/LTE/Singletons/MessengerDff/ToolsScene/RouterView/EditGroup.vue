<template>
  <div class="router-create-group-chat-view">
    <div class="main-info">
      <name
          :name="chat.title"
          type="user"
          @onClick="routerBack()"
      />
      <div class="group-chat-main-info">
        <div class="group-chat-avatar">
          <image-avatar :logo="$core.traits.ImageLogo(chat.avatar, chat.title)" :color-code="$core.traits.ImageColorCode(chat.id)"/>
          <div class="avatar-camera">
            <img src="@/assets/img/my/camera.svg">
          </div>
        </div>

        <input-base :model="chat.title" :placeholder="'Название группового чата'" labeled @onInput="chat.title = $event"/>

        <text-area :model="chat.description" :placeholder="'Информация о групповом чате'" labeled :max-length="250" @onInput="chat.description = $event"/>

        <div class="group-chat-contacts-block">
          <list-header title="участники чата" :title-count="chat.users.length + 1"/>

          <div class="chat-chosen-users">
            <person-owner :data="chat.owner"/>
            <person v-for="(contact, key) in chat.users"
                           :data="contact" :key="key"
                           modal-delete="Удалить из чата"
                           @deleteContact="deleteContact"
            />
          </div>

        </div>

        <button-secondary @onClick="statusBase = true">Удалить чат</button-secondary>
        <button-base>Сохранить</button-base>

        <modal-base :status="statusBase" @onClose="statusBase = false" @onOk="deleteChat">
          <template #title>Удалить чат без возможности востановления?</template>
          <template #description>
            Данные будут удалены вместе со всеми
            участниками чата
          </template>
          <template #button-accept>Удалить</template>
        </modal-base>
      </div>
    </div>
  </div>
</template>

<script>
  /*eslint-disable*/
  import Name from "@/LTE/Singletons/MessengerDff/facade/Name";
  import ImageAvatar from '@Facade/Image/Avatar'
  import InputBase from '@Facade/Input/Base'
  import TextArea from "@Facade/Input/TextArea";
  import TitleCaps from '@Facade/Title/Caps'
  import Person from "../../facade/Person";
  import ListHeader from "@Facade/Navigation/ListHeader";
  import ButtonBase from '@Facade/Button/Base'
  import ButtonSecondary from '@Facade/Button/Secondary'
  import ModalBase from '@Facade/Modal/Base'
  import PersonOwner  from "../../facade/PersonOwner";

  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'Singleton.Messenger.Views.Sidebar.RouterPersonal',
    components: {
      Name,
      ImageAvatar,
      InputBase,
      TextArea,
      TitleCaps,
      Person,
      ListHeader,
      ButtonBase,
      ButtonSecondary,
      ModalBase,
      PersonOwner
    },
    data(){
      return{
        statusBase: false
      }
    },
    computed: {
      ...mapGetters({
        chat: 'Messenger/activeChat'
      }),
    },
    methods: {
      ...mapMutations({
        routerBack: 'Messenger/ToolsScene/routerBack',
        routerNull: 'Messenger/ToolsScene/routerNull',
        closeMessenger: 'Messenger/closeMessenger'
      }),
      deleteContact(id){
        const i = this.chat.users.findIndex(user => user.id === id)
        this.chat.users.splice(i, 1)
        this.$notify({text: 'Участник удален', type: 'success', duration: 3000, speed: 500})
      },
      deleteChat(){
        this.routerNull()
        this.closeMessenger()
        this.$notify({text: 'Групповой чат удален', type: 'success', duration: 3000, speed: 500})
      }
    },
  }
</script>

<style lang="scss" scoped>
  .router-create-group-chat-view{
    width: 100%;
    height: 100%;
    padding: 8px 0 24px;
    box-sizing: border-box;
    overflow-y: scroll;
    .facade-messenger-name {
      margin-bottom: 26px;
    }
    .group-chat-main-info {
      padding: 0 20px;
      .group-chat-avatar{
        position: relative;
        margin: 0 auto 34px;
        height: 88px;
        width: 88px;
        cursor: pointer;
        .avatar-camera{
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          right: -4px;
          bottom: -4px;
          width: 30px;
          height: 30px;
          background-color: $blue;
          border: #181F26 solid 4px;
          border-radius: 50%;
        }
      }
      .facade-input-base::v-deep{
        margin-bottom: 24px;
        border-width: 1px;
        .input-label{
          font-size: 12px;
        }
      }
      .facade-input-text-area::v-deep {
        .textarea-title{
          font-size: 12px;
        }
        .textarea-container{
          border-width: 1px;
          min-height: 104px;
        }
      }
      .group-chat-contacts-block{
        margin: 24px 0 44px;
        .facade-navigation-list-header{
          margin-bottom: 12px;
        }
      }
      .facade-button-secondary{
        height: 52px;
        margin-bottom: 24px;
      }
    }

  }
</style>