<template>
  <div class="facade-message" :class="{'owner-message': message.type === 'owner'}">
    <div class="message-header">
      <div class="message-name" v-if="message.type==='response'">{{message.name}}</div>
      <div class="message-time">{{message.time}}</div>
      <double-check
          v-if="message.status === 'delivered' || message.status === 'read'"
      />
      <single-check v-if="message.status === 'sent'"/>
    </div>
    <text-base>{{message.text}}</text-base>
  </div>
</template>

<script>
import TextBase from '@Facade/Text/Base'
import DoubleCheck from '@Icon/DoubleCheck'
import SingleCheck from '@Icon/SingleCheck'

export default {
  name: 'Singleton.Messenger.Facades.OwnerMessage',
  components: {
    TextBase,
    DoubleCheck,
    SingleCheck
  },
  props: {
    message: Object
  }
}
</script>

<style lang="scss" scoped>
  .facade-message {
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