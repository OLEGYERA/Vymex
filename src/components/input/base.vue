<template>
  <div class="input-base"
       @click="focusInput"
       :class="[{selector: touch, 'position-center': position === 'center', disable: disable === true}, InputName]">
    <img :src="img" v-if="img">
    <input
      v-model="baseModel"
      :type="type || 'text'"
      ref="input-base-ref"
      :placeholder="placeholder"
      :disabled="touch || disable === true"
      @focus="$emit('onFocus')"
      @blur="$emit('onBlur')"
      @keydown.40="$emit('onKeyArrowDown')"
      @keydown.38="$emit('onKeyArrowUp')"
      @keydown.8="$emit('onKeyBackspace')"
      @keydown.enter="$emit('onKeyEnter')"
      @keydown.tab="$emit('onKeyTab')"
      v-mask="bindMaskPattern"
    >
  </div>
</template>

<script>

  import mask from '@/directives/mask'
  import debounce from "lodash/debounce";

  export default {
    name: 'input.base.component',
    directies: {
      mask
    },
    props: {
      SymbolBack: Boolean,
      InputFocus: Boolean,
      InputModel: String,
      InputName: String,
      MaskPattern: [String, Array],
      placeholder: String,
      img: String,
      type: String,
      touch: Boolean,
      disable: Boolean,
      position: String,
      disableDebounce: Boolean
    },
    created() {
      this.baseModel = this.InputModel
      this.debouncedEmittingOnInput = debounce(this.applicableCopyOfEmit, this.disableDebounce ? 0 : 200)
    },
    data() {
      return {
        baseModel: null
      }
    },
    computed: {
      bindMaskPattern(){
        return this.MaskPattern ? this.MaskPattern : ''
      }
    },
    methods: {
      focusInput(){
        if(this.touch){
          this.$emit('onTouch')
        } else {
          this.$refs['input-base-ref'].focus()
        }
      },
      symbolBack(){
        this.baseModel = this.baseModel.substring(0, this.baseModel.length - 1)
      },
      applicableCopyOfEmit(){
        this.$emit('onInput', this.baseModel)
      }
    },
    watch: {
      InputModel(to){
        if(to !== this.baseModel) this.baseModel = to;
      },
      SymbolBack(){
        this.symbolBack();
      },
      InputFocus(){
        this.focusInput()
      },
      baseModel(){
        this.debouncedEmittingOnInput()
      }
    }
  }
</script>


<style lang="scss" scoped>
  .input-base{
    width: 100%;
    height: 52px;
    border-bottom: 2px solid $grey-scale-300;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    img{
      display: flex;
      justify-content: center;
      align-content: center;
      margin-right: 12px;
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

    &.position- {
      &center {
        justify-content: center;
        input {
          text-align: center;
        }
      }
    }

    &:focus-within{
      border-color: $blue;
    }

    &.selector{
      cursor: pointer;
      input{
        cursor: pointer;
      }
    }

    &.disable{
      cursor: not-allowed;
      input{
        cursor: not-allowed;;
      }
    }
  }
</style>