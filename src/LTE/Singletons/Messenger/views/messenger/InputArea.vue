  <template>
  <div class="messenger-input-area-view">
    <div class="messenger-attach-button" @click="statusAction = true">
      <icon-attach :class="{'attach-button-active': statusAction}"/>
    </div>
    <transition name="fade">
      <modal-action-list disableDelete :actions="actions" :status="statusAction" @onClose="statusAction = false"/>
    </transition>
    <input-message @onInput="handleInputModel" :model="messageInput"/>
    <div class="messenger-send-button" @click="sendMessage">
      <icon-send-message :class="{active: messageInput}"/>
    </div>
  </div>
</template>

<script>
import InputMessage from "@Facade/Input/Message";
import IconAttach from '@Icon/Attach'
import IconSendMessage from '@Icon/SendMessage'
import ModalActionList from "@Facade/Modal/ActionList";

export default {
  name: 'Singleton.Messenger.Views.Messenger.InputArea',
  components: {
    InputMessage,
    IconAttach,
    IconSendMessage,
    ModalActionList,
  },
  data() {
    return {
      messageInput: '',
      actions: ['Фото или видео', 'Файловое хранилище'],
      statusAction: false,
    }
  },
  methods: {
    handleInputModel(data) {
      this.messageInput = data
    },
    sendMessage() {
      if(this.messageInput) {
        this.$emit('sendMessage', this.messageInput)
      }
      this.messageInput = '';
    }
  },
  updated() {
    console.log(this.messageInput)
  }
}
</script>

<style lang="scss" scoped>
  .messenger-input-area-view {
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
    .facade-modal-action-list::v-deep{
      .action-list-body{
        top: -48px;
        left: 0;
        transform: translateY(-100%);
      }
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
  .attach-button-active {
    background-color: $grey-scale-300;
    transition: color .2s;
  }
</style>