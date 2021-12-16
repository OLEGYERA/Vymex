<template>
  <div class="facade-input-simple"
       tabindex="0"
       @click="focusInput"
       :labeled="labeled"
       :labeled-active="labeled && baseModel && baseModel.length !== 0"
       :position="position"
       :disable="disable"
       :hide="hide"
       :class="[{selector: touch}, InputName]">
    <label class="input-label" v-if="labeled">{{ placeholder }}</label>
    <transition name="slide-down">
      <img :src="img" v-if="img">
    </transition>
    <input
      v-model="baseModel"
      v-mask="bindInputMask"
      :placeholder="labeled ? '' : placeholder"
      :type="type || 'text'"
      ref="facade-input-simple-ref"
      :disabled="touch || disable === true || hide === true"
      @focus="$emit('onFocus')"
      @blur="handleBlur"
      @keydown.40="$emit('onKeyArrowDown')"
      @keydown.38="$emit('onKeyArrowUp')"
      @keydown.8="$emit('onKeyBackspace')"
      @keydown.enter="$emit('onKeyEnter', $event)"
      @keydown.tab="$emit('onKeyTab', $event)"
      @keydown.delete="$emit('onKeyDelete', $event)"
    >
  </div>
</template>

<script>

import '@/directives/mask'
import debounce from "lodash/debounce";

export default {
  name: 'Facade.Input.Base',
  props: {
    model: String,
    placeholder: {
      type: String,
    },
    mask: [String, Array],
    InputName: String, //??
    img: String,
    type: String,
    touch: Boolean, //??
    labeled: Boolean,
    position: String,
    disable: Boolean,
    disableDebounce: Boolean,
    hide: Boolean
  },
  created() {
    this.baseModel = this.model
    this.debouncedEmittingOnInput = debounce(this.applicableCopyOfEmit, this.disableDebounce ? 0 : 200)
  },
  data(){
    return {
      baseModel: null
    }
  },
  computed: {
    bindInputMask(){
      return this.mask ? this.mask : ''
    }
  },
  methods: {
    handleBlur(e){
      if (!(e.relatedTarget && e.relatedTarget.contains(e.target))) this.$emit('onBlur');
    },
    focusInput(){
      if(this.touch){
        this.$emit('onTouch')
      } else {
        this.$refs['facade-input-simple-ref'].focus()
      }
    },
    applicableCopyOfEmit(){
      this.$emit('onInput', this.baseModel)
    }
  },
  watch: {
    baseModel(){
      this.debouncedEmittingOnInput()
    }
  }
}
</script>


<style lang="scss" scoped>
.facade-input-simple{
  width: 100%;
  height: 52px;
  border-bottom: 2px solid $grey-scale-600;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  .input-label{
    padding: 0 2px;
    position: absolute;
    color: $grey-scale-200;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    cursor: text;
  }

  img{
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 0 12px 0 6px;
    width: 28px;
    height: 28px;
  }
  input{
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    color: #fff;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    &::placeholder{
      color: $grey-scale-200;
    }
  }

  &:focus-within{
    transition: all .2s ease-out;
    border-color: $blue;
    .input-label{
      top: 0;
    }
  }

  &.selector{
    cursor: pointer;
    input{
      cursor: pointer;
    }
  }

  &[disable]{
    cursor: not-allowed;
    .input-label{
      cursor: not-allowed;
    }
    input{
      cursor: not-allowed;;
    }
  }

  &[position="center"]{
    justify-content: center;
    input {
      text-align: center;
    }
  }
  &[labeled]{
    input{
      padding-top: 16px;
    }
  }
  &[labeled-active]{
    .input-label{
      top: 0;
    }
  }
  &[hide]{
    border: transparent;
    .input-label {
      top: 0;
    }
  }
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all .07s ease;
  max-width: 28px;
  max-height: 28px;
}

.slide-down-enter, .slide-down-leave-to {
  opacity: 0;
  max-width: 0;
  max-height: 0;
}
</style>