<template>
  <div class="router-create-group-chat-view">
    <div class="main-info">
      <name
          :name="chat.title"
          type="user"
          @onClick="routerBack()"
          @onList="chooseAction"
          :actions="actions"
          :disableDelete="disable"
          del-title="Выйти из чата"
          @onDelete="deleteChat"
      />
      <div class="group-chat-main-info">
        <div class="group-chat-avatar">
          <image-avatar :logo="$core.traits.ImageLogo(chat.avatar, chat.title)" :color-code="$core.traits.ImageColorCode(chat.id)"/>
          <div class="avatar-camera">
            <img src="@/assets/img/my/camera.svg">
          </div>
        </div>

        <input-base :model="chat.title" :placeholder="'Название группового чата'" labeled/>

        <text-area v-if="chat.description" :model="chat.description" :placeholder="'Информация о групповом чате'" labeled :max-length="250"/>

        <div class="group-chat-contacts-block">
          <list-header title="участники чата" :title-count="chat.users.length + 1"/>

          <div class="chat-chosen-users">
            <person-owner :data="chat.owner"/>
            <person-search v-for="(contact, key) in chat.users"
                    :data="contact" :key="key"
            />
          </div>

        </div>

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
  import PersonSearch from "../../facade/PersonSearch";
  import ListHeader from "@Facade/Navigation/ListHeader";

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
      PersonSearch,
      ListHeader,
      PersonOwner
    },
    data(){
      return{
        actionsOwner: ['Отключить уведомления', 'Отметить непрочитанным', 'Редактировать'],
        actionsUser: ['Отключить уведомление', 'Отметить непрочитанным'],
      }
    },
    computed: {
      ...mapGetters({
        chat: 'Messenger/activeChat',
        id: 'getUserID'
      }),
      actions(){
        if(this.id === this.chat.owner.id){
          return this.actionsOwner
        }
        return this.actionsUser
      },
      disable(){
        return this.id === this.chat.owner.id
      },
    },
    methods: {
      ...mapMutations({
        routerBack: 'Messenger/ToolsScene/routerBack',
        routerNext: 'Messenger/ToolsScene/routerNext',
        routerNull: 'Messenger/ToolsScene/routerNull',
        closeMessenger: 'Messenger/closeMessenger'
      }),
      chooseAction(id){
        if(id === 0){
          this.$notify({text: 'Уведомления отключены', type: 'success', duration: 3000, speed: 500})
        }
        if (id === 1){
          this.$notify({text: ' Отмечено как не прочитанное ', type: 'success', duration: 3000, speed: 500})
        }
        if(id === 2){
          this.routerNext({name: 'edit-group'})
        }
      },
      deleteChat(){
        this.routerNull()
        this.closeMessenger()
        this.$notify({text: 'Групповой чат был удален', type: 'success', duration: 3000, speed: 500})
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
        margin-top: 24px;
        .facade-navigation-list-header{
          margin-bottom: 12px;
        }
      }
    }

  }
</style>