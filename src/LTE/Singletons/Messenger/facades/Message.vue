<template>
  <div class="facade-message" :class="{'owner-message': message.type === 'owner'}" @click.right.prevent="status = true">
    <div class="message-header">
      <div class="message-name" v-if="message.type==='response'">{{message.name}}</div>
      <div class="message-time">{{message.time}}</div>
      <double-check v-if="message.status === 'delivered'"/>
      <single-check v-if="message.status === 'sent'"/>
    </div>
    <text-base>{{message.text}}</text-base>
    <modal-action-list
        :actions="actions"
        :status="status"
        @onClose="status = false"
        @onDelete="$notify({text: 'Сообщение удалено', type: 'success', duration: 3000, speed: 500})"
        @onList="chooseAction"
    />

  </div>
</template>

<script>
  import TextBase from '@Facade/Text/Base'
  import DoubleCheck from '@Icon/DoubleCheck'
  import SingleCheck from '@Icon/SingleCheck'
  import ModalActionList from "@Facade/Modal/ActionList";

  export default {
    name: 'Singleton.Messenger.Facades.Message',
    components: {
      TextBase,
      DoubleCheck,
      SingleCheck,
      ModalActionList
    },
    data(){
      return{
        status: false,
        actions: ['Редактировать ', 'Копировать']
      }
    },
    props: {
      message: Object
    },
    methods:{
      chooseAction(id){
        if (id === 0) {
          this.$notify({text: 'Редактирование невозможно', type: 'error', duration: 3000, speed: 500})
        }
        if (id === 1){
          this.$notify({text: 'Сообщение скопировано', type: 'success', duration: 3000, speed: 500})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-message {
    position: relative;
    margin-bottom: 12px;
    padding: rem(12);
    background-color: $grey-scale-400;
    border-radius: 2px 12px 12px 12px;
    width: max-content;
    max-width: 468px;
    .message-header{
      display: flex;
      align-items: center;
      font-size: rem(11);
      line-height: rem(12);
      margin-bottom: 4px;
      color: rgba(255, 255, 255, 0.4);
      .message-name {
        margin-right: 2px;
      }
      .message-time {
        align-self: center;
        margin-right: 4px;
      }
    }
    .facade-text-base {
      color: #fff;
    }
  }
  .owner-message {
    background-color: $blue;
    border-radius: 12px 2px 12px 12px;
    margin: 0 0 12px auto;
  }
</style>