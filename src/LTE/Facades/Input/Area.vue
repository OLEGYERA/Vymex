<template>
  <div class="facade-input-area"
       tabindex="0"
       @click="focusInput"
       :labeled="labeled"
       :position="position"
       :disable="disable"
       :hide="hide">
    <textarea v-model="areaModel" ref="facade-input-area-ref" :rows="rows"
              :placeholder="placeholder"
    ></textarea>
    <label class="textarea-label" v-if="labeled">{{ placeholder }}</label>
<!--    <div class="textarea-counter">{{ areaModel.length }}/{{ areaModelBound }}</div>-->
  </div>
</template>
<!--    <input-->
<!--      :disabled="disable === true || hide === true"-->
<!--      @focus="$emit('onFocus')"-->
<!--      @blur="handleBlur"-->
<!--      @keydown.40="$emit('onKeyArrowDown')"-->
<!--      @keydown.38="$emit('onKeyArrowUp')"-->
<!--      @keydown.8="$emit('onKeyBackspace')"-->
<!--      @keydown.enter="$emit('onKeyEnter', $event)"-->
<!--      @keydown.tab.prevent="$emit('onKeyTab', $event)"-->
<!--      @keydown.delete="$emit('onKeyDelete', $event)"-->
<!--    >-->

<script>

import '@/directives/mask'
import debounce from "lodash/debounce";

export default {
  name: 'Facade.Input.Base',
  props: {
    model: {
      validator: function (value) {
        return value === null || typeof value === "string" || typeof value === "number";
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
    this.areaModel = this.model;
    this.modelDebounceFunction = debounce(() => this.applicableCopyOfEmit(), this.disableDebounce ? 0 : 200)
  },
  mounted() {
    this.areaRef = this.$refs['facade-input-area-ref'];
  },
  data: () => ({
    areaRef: null,
    areaModel: null,
    rows: 2,
    areaModelBound: 300
  }),
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
      if(!this.disable) this.$refs['facade-input-area-ref'].focus()
    },
    applicableCopyOfEmit(){
      this.$emit('onInput', this.areaModel)
    }
  },
  watch: {
    model(_m) {
      if (_m !== this.areaModel) this.areaModel = _m;
    },
    areaModel(_am, _amp) {
      if(_am.length <= this.areaModelBound) this.modelDebounceFunction()
      else this.areaModel = _amp
    },
  }
}

</script>

<style lang="scss" scoped>
  .facade-input-area{
    width: 100%;
    min-height: 52px;
    border-bottom: 2px solid $grey-scale-300;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    outline: none;
    margin-bottom: 15px;
    .textarea-label{
      padding: 0 2px;
      position: absolute;
      color: $grey-scale-200;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      cursor: text;
    }
    textarea{
      font-family: 'Iter', sans-serif;
      min-width: 100%;
      max-width: 100%;
      max-height: 122px;
      height: max-content;
      background-color: transparent;
      box-sizing: border-box;
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
    .textarea-counter{
      position: absolute;
      bottom: -15px;
      right: 0;
    }

    textarea:not(:placeholder-shown) + .textarea-label {
      top: 0;
    }

    &:focus-within{
      transition: all .2s ease-out;
      border-color: $blue;
    }

    &[labeled]{
      textarea{
        margin-top: 20px;
        &::placeholder{
          color: transparent;
        }
        &:focus + .textarea-label{
          top: 0;
        }
      }
    }
    &[hide]{
      border: transparent;
      .textarea-label {
        top: 0;
      }
    }

    &[disable]{
      outline: none;
      cursor: not-allowed;
      border-color: $grey-scale-300;
      .textarea-label{
        cursor: not-allowed;
      }
      textarea{
        color: $grey-scale-200;
        cursor: not-allowed;;
      }
    }
  }
</style>