<template>
  <div class="sender-scene-app" v-if="messengerStatus">
    <messenger-group-header v-if="chat.type === 'group'" :chat="chat" @onClick="routerNext({name: 'group-info'})"/>
    <messenger-dialog-header v-else :chat="chat"/>
    <main class="messenger-main-plate" ref="messageArea">
      <messenger-date/>
      <message v-for="(message, key) in messages" :message="message" :key="key"/>
    </main>
    <input-area @sendMessage="sendMessage"/>
  </div>
</template>

<script>
  import MessengerGroupHeader from "@/LTE/Singletons/MessengerDff/facade/MessengerGroupHeader";
  import MessengerDialogHeader from "@/LTE/Singletons/MessengerDff/facade/MessengerDialogHeader";
  import Message from "@/LTE/Singletons/Messenger/facades/Message";
  import MessengerDate from "@/LTE/Singletons/Messenger/facades/MessengerDate";
  import InputArea from "@/LTE/Singletons/Messenger/views/messenger/InputArea";
  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'Singleton.Messenger.Views.Messenger.MessengerMain',
    components: {
      MessengerGroupHeader,
      MessengerDialogHeader,
      Message,
      MessengerDate,
      InputArea
    },
    data() {
      return {
        messages: [
          {
            type: 'response',
            name: 'Нина Меркулова,',
            time : '04:20',
            text: 'Норм, а что по задачам?'
          },
          {
            type: 'response',
            name: 'Нина Меркулова,',
            time : '04:20',
            text: 'Всё четко, смотри, файлик...'
          },
          {
            type: 'owner',
            time : '04:20',
            status: 'delivered',
            text: 'Да всё нормас, давайте сразу подумаем, как будем покупать акваланг, я в этом нуб...'
          },
          {
            type: 'owner',
            time : '04:20',
            status: 'delivered',
            text: 'да и в целом всё гуд'
          },
          {
            type: 'owner',
            time : '04:20',
            status: 'delivered',
            text: 'А ты как там? Гоу тусить?'
          },
          {
            type: 'response',
            name: 'Нина Меркулова,',
            time : '04:20',
            text: 'Норм, а что по задачам?'
          },
          {
            type: 'response',
            name: 'Нина Меркулова,',
            time : '04:20',
            text: 'Всё четко, смотри, файлик...'
          },
          {
            type: 'owner',
            time : '04:20',
            status: 'delivered',
            text: 'Да всё нормас, давайте сразу подумаем, как будем покупать акваланг, я в этом нуб...'
          },
          {
            type: 'owner',
            time : '04:20',
            status: 'sent',
            text: 'да и в целом всё гуд'
          },
          {
            type: 'owner',
            time : '04:20',
            status: 'sent',
            text: 'А ты как там? Гоу тусить?'
          },
          {
            type: 'response',
            name: 'Нина Меркулова,',
            time : '04:20',
            text: 'Норм, а что по задачам?'
          },
          {
            type: 'response',
            name: 'Нина Меркулова,',
            time : '04:20',
            text: 'Всё четко, смотри, файлик...'
          },
          {
            type: 'owner',
            time : '04:20',
            status: 'sent',
            text: 'Да всё нормас, давайте сразу подумаем, как будем покупать акваланг, я в этом нуб...'
          },
          {
            type: 'owner',
            time : '04:20',
            status: 'sent',
            text: 'да и в целом всё гуд'
          },
        ],
      }
    },
    methods: {
      ...mapMutations({
        routerNext: 'Messenger/ToolsScene/routerNext'
      }),
      sendMessage(text) {
        const time = new Date().toLocaleTimeString().slice(0,-3)
        const newMessage = {
          type: 'owner',
          time,
          status: 'sent',
          text: text,
        }
        this.messages.push(newMessage)
      },
    },
    computed: {
      ...mapGetters({
        messengerStatus: 'Messenger/messengerStatus',
        chat: 'Messenger/activeChat'
      })
    },
    updated() {
      this.$refs.messageArea.scrollBy(0, this.$refs.messageArea.scrollHeight);
    },
    mounted() {
      this.$refs.messageArea.scrollBy(0, this.$refs.messageArea.scrollHeight);
    },
  }
</script>

<style lang="scss">
  .sender-scene-app{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    background-color: $grey;
    border-right: $grey-scale-700 solid 1px;

    .messenger-main-plate {
      padding: 12px 20px 0;
      overflow-y: scroll;
      .facade-messenger-date{
        margin-bottom: 17px;
      }
    }
  }
</style>