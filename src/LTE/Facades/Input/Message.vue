<template>
  <div class="facade-input-message">
    <input-base :placeholder="placeholder"/>
  </div>
</template>

<script>
import InputBase from "@Facade/Input/Base"
export default {
  name: 'Facade.Input.Message',
  components: {
    InputBase
  },
  data(){
    return {
      baseModel: '',
      placeholder: 'Введите сообщение'
    }
  },
}
</script>

<style lang="scss" scoped>
.facade-input-message {
  width: 100%;
  box-sizing: border-box;
  .facade-input-base  {
    height: 38px;
    border-radius: 51px;
    border: $grey-scale-300 solid 1px;
    color: #fff;
    background-color: $grey;
    &::v-deep {
      input{
        padding: 0 22px;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}

</style>