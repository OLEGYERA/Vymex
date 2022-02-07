<template>
  <div class="facade-input-area"
       tabindex="0"
       @click="focusInput"
       :labeled="labeled"
       :position="position"
       :disable="disable"
       :hide="hide">
    <div class="input-area-body">
      <textarea v-model="areaModel"
                @blur="handleBlur"
                ref="facade-input-area-ref"
                :rows="rows"
                :placeholder="placeholder"
      ></textarea>
      <label class="textarea-label" v-if="labeled">{{ placeholder }}</label>
    </div>
    <div class="textarea-counter">
      <span class="current-area-counter">{{ areaModel.length }}</span>/{{ bound }}
    </div>
  </div>
</template>

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
      bound: {
        type: Number,
        default: () => 300
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
    data: () => ({
      areaModel: '',
      rows: 2,
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
        this.$emit('onArea', this.areaModel)
      },
    },
    watch: {
      model(_m) {
        if (_m !== this.areaModel) this.areaModel = _m;
      },
      areaModel(_am, _amp) {
        if(_am.length <= this.bound) this.modelDebounceFunction()
        else this.areaModel = _amp
      },
    }
  }
</script>

<style lang="scss" scoped>
  .facade-input-area{
    width: 100%;
    position: relative;
    padding-bottom: 25px;
    .input-area-body{
      width: 100%;
      min-height: 52px;
      border-bottom: 2px solid $grey-scale-300;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      position: relative;
      outline: none;
    }

    .textarea-label{
      padding: 0 2px;
      position: absolute;
      color: $grey-scale-200;
      font-weight: 400;
      font-size: rem(14);
      line-height: rem(16);
      cursor: text;
    }
    textarea{
      font-family: 'Iter', sans-serif;
      min-width: 100%;
      max-width: 100%;
      max-height: 122px;
      min-height: 44px;
      height: max-content;
      background-color: transparent;
      box-sizing: border-box;
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

    .textarea-counter{
      right: 0;
      bottom: 0;
      font-size: rem(12);
      position: absolute;
      line-height: rem(16);
      color: $grey-scale-300;
      .current-area-counter{
        color: #fff;
      }
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