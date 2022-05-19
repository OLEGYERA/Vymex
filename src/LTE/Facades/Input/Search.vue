<template>
  <div class="facade-input-search" :disable="disable"
       tabindex="0" @click.prevent="focusInput">
    <input
      v-model="baseModel"
      :placeholder="placeholder"
      :type="'text'"
      ref="facade-input-search-ref"
      :disabled="disable"
      @focus="$emit('onFocus')"
      @blur="handleBlur"
      @keydown.40="$emit('onKeyArrowDown')"
      @keydown.38="$emit('onKeyArrowUp')"
      @keydown.enter="$emit('onKeyEnter', $event)"/>
    <icon-search/>
    <icon-error v-if="exit || (baseModel && baseModel.length)"
                :class="{cleaningActive: baseModel && baseModel.length}"
                @click.native="clearInput"/>
  </div>
</template>

<script>
  import debounce from "lodash/debounce";

  export default {
    name: 'Facade.Input.Search',
    props: {
      model: {
        validator: function (value) {
          return value === null || typeof value === "string" || typeof value === "number";
        }
      },
      placeholder: String,
      disable: Boolean,
      disableDebounce: Boolean,
      exit: Boolean,
    },
    created() {
      this.modelDebounceFunction = debounce(() => this.applicableCopyOfEmit(), this.disableDebounce ? 0 : 200);
    },
    mounted() {
      this.$emit('onMounted', {focusInput: this.focusInput})
    },
    data(){
      return {
        baseModel: this.model
      }
    },
    methods: {
      handleBlur(e){
        if(!(e.relatedTarget && e.relatedTarget.contains(e.target))) this.$emit('onBlur');
      },
      focusInput(){
        if(!this.disable) this.$refs['facade-input-search-ref']?.focus()
      },
      clearInput(){
        console.log(1)
        if(this.baseModel.length){
          this.baseModel = '';
        } else if(this.exit){
          this.$emit('onExit')
        }

      },
      applicableCopyOfEmit(){
        this.$emit('onSearch', this.baseModel)
      }
    },
    watch: {
      model(_model) {
        console.log('load model')
        if (_model !== this.baseModel) this.baseModel = _model;
      },
      baseModel() {
        this.modelDebounceFunction()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-input-search {
    position: relative;
    width: 100%;
    height: 42px;
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 30px;
    background-color: transparent;
    transition: border .2s ease-out;
    border: 1px solid $grey-scale-300;

    input {
      width: 100%;
      height: 100%;
      padding: 10px 40px;
      border-radius: 30px;
      box-sizing: border-box;
      border: unset;
      background: transparent;
      color: #fff;
      font-size: 15px;
      line-height: 20px;
      outline: none;
      &::placeholder {
        color: $grey-scale-200;
      }
    }
    .icon{
      position: absolute;
      color: $grey-scale-200;
      &-search{
        top: 12px;
        left: 12px;
        height: rem(16);
      }
      &-error{
        top: 9px;
        right: 9px;
        height: rem(22);
        width: rem(22);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border-radius: 50%;
        transition: .2s all ease-out;
        &.cleaningActive{
          color: #fff;
        }

        &:hover{
          color: #fff;
          background-color: $grey-scale-400;
          &.cleaningActive{
            background-color: $blue;
          }
        }
      }
    }

    &:focus-within{
      border-color: $blue;
    }

    &[disable]{
      border-color: $grey-scale-300;
      cursor: not-allowed;
      input{
        cursor: not-allowed;;
      }
    }

  }
</style>