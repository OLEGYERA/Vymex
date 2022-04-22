<template>
  <div class="facade-input-price"
       tabindex="0"
       @click="focusInput"
       :labeled="labeled"
       :position="position"
       :disable="disable"
       :hide="hide">
    <div class="change-currency">
      <title-caps><slot>UAH</slot></title-caps>
      <icon-dropdown/>
    </div>
    <input
        v-model="baseModel"
        v-mask="bindInputMask"
        :placeholder="placeholder"
        :type="type || 'text'"
        ref="facade-input-base-ref"
        :disabled="disable === true || hide === true"
        @focus="$emit('onFocus')"
        @blur="handleBlur"
        @keydown.40="$emit('onKeyArrowDown')"
        @keydown.38="$emit('onKeyArrowUp')"
        @keydown.8="$emit('onKeyBackspace')"
        @keydown.enter="$emit('onKeyEnter', $event)"
        @keydown.tab.prevent="$emit('onKeyTab', $event)"
        @keydown.delete="$emit('onKeyDelete', $event)"
    >
    <label class="input-label" v-if="labeled">{{ placeholder }}</label>
  </div>
</template>

<script>
  import '@/directives/mask'
  import debounce from "lodash/debounce";
  import TitleCaps from "@Facade/Title/Caps"
  import IconDropdown from "@Icon/DropdownArrow"

  export default {
    name: 'Facade.Input.Price',
    components: {
      TitleCaps,
      IconDropdown
    },
    props: {
      model: {
        validator: function (value) {
          return value === null || typeof value === "number" || typeof value === "string" ;
        }
      },
      placeholder: String,
      mask: [String, Array],
      img: String,
      type: String,
      labeled: Boolean,
      position: String,
      disable: Boolean,
      disableDebounce: Boolean,
      hide: Boolean
    },
    created() {
      this.modelDebounceFunction = debounce(() => this.applicableCopyOfEmit(), this.disableDebounce ? 0 : 200)
    },
    data(){
      return {
        baseModel: this.model
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
        if(!this.disable) this.$refs['facade-input-base-ref'].focus()
      },
      applicableCopyOfEmit(){
        this.$emit('onInput', this.baseModel)
      }
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
  .facade-input-price{
    width: 100%;
    height: 52px;
    border-bottom: 1px solid $grey-scale-300;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    outline: none;
    &:focus-within{
      transition: all .2s ease-out;
      border-color: $blue;
    }
    .change-currency {
      display: inherit;
      align-items: inherit;
      margin-right: rem(24);
      padding: rem(2) 0;
      border-right: 1px solid $grey-scale-300;
      cursor: pointer;
      .icon-dropdown-arrow::v-deep {
        align-self: center;
        color: #fff;
        height: 16px;
        padding: 0 rem(5) 0 rem(7);
      }
    }

    .input-label{
      padding: 0 2px;
      position: absolute;
      color: $grey-scale-200;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
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
      font-size: rem(15);
      line-height: rem(20);
      &::placeholder{
        color: $grey-scale-200;
      }
    }

    input:not(:placeholder-shown) + .input-label {
      top: 0;
    }

    &[position="center"]{
      justify-content: center;
      input {
        text-align: center;
      }
    }
    &[labeled]{
      input{
        padding-top: 20px;
        &::placeholder{
          color: transparent;
        }
        &:focus + .input-label{
          top: 0;
        }
      }
    }
    &[hide]{
      border: transparent;
      .input-label {
        top: 0;
      }
    }

    &[disable]{
      outline: none;
      cursor: not-allowed;
      border-color: $grey-scale-300;
      .input-label{
        cursor: not-allowed;
      }
      input{
        color: $grey-scale-200;
        cursor: not-allowed;;
      }
    }
  }
</style>