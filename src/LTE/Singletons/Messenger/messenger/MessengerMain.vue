<template>
  <div class="singleton-messenger-main">
    <messenger-header/>
    <main class="messenger-main-plate">
      <messenger-date/>
      <message v-for="(message, key) in messages" :message="message" :key="key"/>
    </main>
    <input-area/>
  </div>
</template>

<script>
import MessengerHeader from "@/LTE/Singletons/Messenger/facades/messenger-header";
import Message from "@/LTE/Singletons/Messenger/facades/message";
import MessengerDate from "@/LTE/Singletons/Messenger/facades/messenger-date";
import InputArea from "@/LTE/Singletons/Messenger/messenger/InputArea";

export default {
  name: 'Singleton.Messenger.MessengerMain',
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
          text: 'Норм, а чтор по задачам?'
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
        status: 'read',
        text: 'Да всё нормас, давайте сразу подумаем, как будем покупать акваланг, я в этом нуб...'
        },
        {
          type: 'owner',
          time : '04:20',
          status: 'read',
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
          text: 'Норм, а чтор по задачам?'
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
      ],
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .singleton-messenger-main {
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