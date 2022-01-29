<template>
  <div class="messenger-input-area">
    <div class="messenger-attach-button">
      <icon-attach/>
    </div>
    <input-message/>
    <div class="messenger-send-button">
      <icon-send-message/>
    </div>
  </div>
</template>

<script>
import InputMessage from "@Facade/Input/Message";
import IconAttach from '@Icon/Attach'
import IconSendMessage from '@Icon/SendMessage'

export default {
  name: 'Singleton.Messenger.InputArea',
  components: {
    InputMessage,
    IconAttach,
    IconSendMessage,
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
  }
  .icon-send-message {
    margin-left: 10px;
    color: $grey-scale-300;
    background-color: $grey-scale-400;
  }
}
</style>