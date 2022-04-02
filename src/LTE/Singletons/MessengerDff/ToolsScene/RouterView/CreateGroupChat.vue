<template>
  <div class="router-create-group-chat-view">
    <div class="main-info">
      <name :name="'Групповой чат'" @onClick="routerBack()"/>
      <div class="group-chat-main-info">
        <div class="group-chat-avatar">
          <image-avatar :logo="newGroupChat.avatar" :color-code="$core.traits.ImageColorCode(id)"/>
          <div class="avatar-camera">
            <img src="@/assets/img/my/camera.svg">
          </div>
        </div>

        <input-base :model="newGroupChat.title" :placeholder="'Название группового чата'" labeled @onInput="newGroupChat.title = $event"/>

        <text-area :model="newGroupChat.description" :placeholder="'Информация о групповом чате'" labeled :max-length="250"/>

        <div class="button-next" v-if="contacts.length===0">
          <button-base @onClick="routerNext({name: 'add-users'})" :disable="!newGroupChat.title.trim()">Далее</button-base>
        </div>

        <div v-else class="group-chat-contacts-block">
          <title-caps>
            участники чата
            <span class="list-title-counter">{{ contacts.length }}</span>
          </title-caps>
          <div class="chat-chosen-users">
            <person v-for="(contact, key) in contacts"
                    :data="contact" :key="key"
                    modal-delete="Удалить из чата"
                    @deleteContact="deleteContact"
            />
          </div>

          <button-secondary @onClick="routerBack()">Добавить участников</button-secondary>
          <button-base>Создать чат</button-base>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  /*eslint-disable*/
  import Name from "@/LTE/Singletons/MessengerDff/facade/Name";
  import ImageAvatar from '@Facade/Image/Avatar'
  import ButtonBase from '@Facade/Button/Base'
  import InputBase from '@Facade/Input/Base'
  import TextArea from "@Facade/Input/TextArea";
  import TitleCaps from '@Facade/Title/Caps'
  import Person from "../../facade/Person";
  import ButtonSecondary from '@Facade/Button/Secondary'

  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'Singleton.Messenger.Views.Sidebar.RouterPersonal',
    components: {
      Name,
      ButtonBase,
      ImageAvatar,
      InputBase,
      TextArea,
      TitleCaps,
      Person,
      ButtonSecondary,
    },
    data(){
      return{
      }
    },
    computed: {
      ...mapGetters({
        id: 'getUserID',
        contacts: 'Messenger/ToolsScene/chosenContacts',
        newGroupChat: 'Messenger/ToolsScene/newGroupChat'
      }),
    },
    methods: {
      ...mapMutations({
        routerBack: 'Messenger/ToolsScene/routerBack',
        routerNext: 'Messenger/ToolsScene/routerNext',
        deleteSelectedContact: 'Messenger/ToolsScene/deleteSelectedContact'
      }),
      deleteContact(id){
        this.deleteSelectedContact(id)
      },
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
          //padding: 0 0 44px ;
        }
      }
      .button-next{
        margin-top: 44px;
      }
      .facade-button-base{

      }
      .group-chat-contacts-block{
        .facade-button-secondary{
          height: 52px;
          margin-bottom: 24px;
        }
        .facade-title-caps{
          padding: 8px 0;
          margin: 24px 0 12px;
          .list-title-counter{
            color: $blue;
          }
        }
        .chat-chosen-users{
          margin-bottom: 40px;
        }
      }
    }

  }
</style>