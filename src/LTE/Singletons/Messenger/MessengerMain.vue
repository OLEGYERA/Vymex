<template>
  <div class="messenger-main">
    <group-header/>
    <main class="messenger-main-plate">
      <div class="messenger-time">
        22 апреля, 2022
      </div>
      <message v-for="(message, key) in messages" :message="message" :key="key"/>
    </main>
    <div class="messenger-input">
      <div class="messenger-attach-button">
        <icon-attach/>
      </div>
      <input-message/>
      <div class="messenger-send-button">
        <icon-send-message/>
      </div>
    </div>
  </div>
</template>

<script>
import GroupHeader from "@/LTE/Singletons/Messenger/GroupHeader";
import Message from "@/LTE/Singletons/Messenger/facades/message";
import InputMessage from "@Facade/Input/Message";
import IconAttach from '@Icon/Attach'
import IconSendMessage from '@Icon/SendMessage'

export default {
  name: 'Singleton.Messenger.MessengerMain',
  components: {
    GroupHeader,
    Message,
    InputMessage,
    IconAttach,
    IconSendMessage
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
  .messenger-main {
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
      .messenger-time{
        margin-bottom: 17px;
        font-size: rem(12);
        line-height: rem(12);
        text-align: center;
        color: #FFF;
        opacity: 0.4;
      }
    }
    .messenger-input {
      padding: 24px 20px;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      width: 100%;
      .icon {
        height: 36px;
        width: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        cursor: pointer;
      }
      .icon-attach {
        margin-right: 10px;
        color: #fff;
      }
      .icon-send-message {
        margin-left: 10px;
        color: $grey-scale-300;
        background-color: $grey-scale-400;
      }
    }
  }
</style>