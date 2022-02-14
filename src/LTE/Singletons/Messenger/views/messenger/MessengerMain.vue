<template>
  <div class="messenger-main-view" v-if="messengerStatus">
    <messenger-header/>
    <main class="messenger-main-plate">
      <messenger-date/>
      <message v-for="(message, key) in messages" :message="message" :key="key"/>
    </main>
    <input-area @sendMessage="sendMessage"/>
  </div>
</template>

<script>
import MessengerHeader from "@/LTE/Singletons/Messenger/facades/MessengerHeader";
import Message from "@/LTE/Singletons/Messenger/facades/Message";
import MessengerDate from "@/LTE/Singletons/Messenger/facades/MessengerDate";
import InputArea from "@/LTE/Singletons/Messenger/views/messenger/InputArea";
import {mapGetters} from "vuex";

export default {
  name: 'Singleton.Messenger.Views.Messenger.MessengerMain',
  components: {
    MessengerHeader,
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
    sendMessage(text) {
      const newMessage = {
        type: 'owner',
        time : '04:20',
        status: 'sent',
        text: text,
      }
      this.messages.push(newMessage)
    }
  },
  computed: {
    ...mapGetters({
      messengerStatus: 'Messenger/messengerStatus'
    })
  },
}
</script>

<style lang="scss" scoped>
  .messenger-main-view {
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