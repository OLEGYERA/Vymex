<template>
  <div class="facade-input-message">
    <textarea rows="1" :placeholder="placeholder" @input="resize($event)"></textarea>
  </div>
</template>

<script>
// import TextArea from "@Facade/Input/TextArea";
export default {
  name: 'Facade.Input.Message',
  components: {
    // TextArea
  },
  data(){
    return {
      baseModel: '',
      placeholder: 'Введите сообщение'
    }
  },
  methods: {
    resize(e) {
      const area = document.querySelector('.facade-input-message')
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`
      if(e.target.scrollHeight > 36) {
        area.style.height = 'auto'
        area.style.padding = '11px 26px 11px 22px'
        area.style.borderRadius = '16px'
      } else {
        area.style.borderRadius = '51px'
        area.style.padding  = '7px 26px 7px 22px'
        area.style.height = '36px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.facade-input-message {
  width: 100%;
  padding: 7px 26px 7px 22px;
  height: 36px;
  border-radius: 51px;
  box-sizing: border-box;
  border: $grey-scale-300 solid 1px;
  &:focus-within{
    transition: border-color .2s ease-out;
    border-color: $blue;
  }
  textarea {
    width: 100%;
    color: #fff;
    resize: none;
    max-height: 136px;
    background-color: $grey;
    box-sizing: border-box;
    font-family: Inter;
    outline: none;
    font-size: 14px;
    line-height: 20px;
    border: none;
    padding: 0;
    &::placeholder {
      color: $grey-scale-200;
    }

    &::-webkit-scrollbar {
      width: 0;
    }
  }
}

</style>