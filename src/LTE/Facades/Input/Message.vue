<template>
  <div class="facade-input-message">
    <textarea
        rows="1"
        v-model="baseModel"
        :placeholder="placeholder"
        @input="resize($event)"
        @focus="onFocus($event)"
        @focusout="onFocusOut($event)"
    ></textarea>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
export default {
  name: 'Facade.Input.Message',
  components: {
  },
  data(){
    return {
      baseModel: this.model,
      placeholder: 'Введите сообщение'
    }
  },
  props: ['model'],
  methods: {
    resize(e) {
      const area = document.querySelector('.facade-input-message')
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`
      if(e.target.scrollHeight > 22) {
        area.style.height = 'auto'
        area.style.padding = '11px 21px'
        area.style.borderRadius = '16px'
      } else {
        area.style.borderRadius = '51px'
        area.style.padding  = '0 21px'
        area.style.height = '36px'
      }
    },
    onFocus(e) {
      e.target.style.margin = '-1px'
    },
    onFocusOut(e) {
      e.target.style.margin = '0'
    },
    applicableCopyOfEmit(){
      this.$emit('onInput', this.baseModel)
    }
  },
  created() {
    this.modelDebounceFunction = debounce(() => this.applicableCopyOfEmit(), this.disableDebounce ? 0 : 200)
  },
  watch: {
    model(_model) {
      if (_model !== this.baseModel) this.baseModel = _model;
    },
    baseModel() {
      this.modelDebounceFunction()
    }
  }
}
</script>

<style lang="scss" scoped>
  .facade-input-message {
    width: 100%;
    padding: 0 21px;
    height: 36px;
    border-radius: 51px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border: $grey-scale-300 solid 1px;
    &:focus-within{
      transition: border-color .2s ease-out;
      border: $blue solid 2px;
    }
    textarea {
      width: 100%;
      color: #fff;
      resize: none;
      max-height: 116px;
      background-color: $grey;
      box-sizing: border-box;
      font-family: Inter, sans-serif;
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