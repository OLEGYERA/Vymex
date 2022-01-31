<template>
  <div class="messenger-input-area">
    <div class="messenger-attach-button" @click="actionListStatus = !actionListStatus;">
      <icon-attach :class="{'attach-button-active': actionListStatus}"/>
      <transition name="fade">
        <action-list :items="items" v-if="actionListStatus"/>
      </transition>
    </div>
    <input-message v-model="messageInput" @onInput="handleInputModel"/>
    <div class="messenger-send-button">
      <icon-send-message :class="{active: messageInput}"/>
    </div>
  </div>
</template>

<script>
import InputMessage from "@Facade/Input/Message";
import IconAttach from '@Icon/Attach'
import IconSendMessage from '@Icon/SendMessage'
import ActionList from "@/LTE/Singletons/Messenger/facades/ActionList";

export default {
  name: 'Singleton.Messenger.InputArea',
  components: {
    InputMessage,
    IconAttach,
    IconSendMessage,
    ActionList,
  },
  data() {
    return {
      messageInput: '',
      items: ['Фото или видео', 'Файловое хранилище'],
      actionListStatus: false,
    }
  },
  // updated() {
  //   console.log(this.messageInput)
  // },
  methods: {
    handleInputModel(data) {
      this.messageInput = data
    },
  }
}
</script>

<style lang="scss" scoped>
.messenger-input-area {
  padding: 24px 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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
    transition: background-color .2s;
  }
  .icon-send-message {
    margin-left: 10px;
    color: $grey-scale-300;
    background-color: $grey-scale-400;
  }
  .active {
    color: #fff;
    background-color: $blue;
  }
}
.messenger-attach-button {
  position: relative;
  .singleton-messenger-action-list {
    position: absolute;
    top: -12px;
    transform: translateY(-100%);
  }
}
.attach-button-active {
  background-color: $grey-scale-300;
  transition: color .2s;
}
</style>