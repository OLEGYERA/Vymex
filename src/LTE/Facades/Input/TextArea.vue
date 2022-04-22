<template>
  <div class="facade-input-text-area"
       tabindex="0"
       @click="focusInput"
       :disable="disable"
       :labeled="labeled">
    <div class="textarea-container">
      <textarea
          class="textarea"
          :maxlength="maxLength"
          rows="1"
          ref="facade-input-text-area-ref"
          @input="resize($event)"
          v-model="baseModel"
          :placeholder="placeholder">
      </textarea>
      <label class="textarea-title" v-if="labeled">{{ placeholder }}</label>
    </div>
    <title-caption v-if="maxLength" class="textarea-text-length">
      <span :class="{'textarea-count': baseModel}">{{baseModel.length}}</span>/{{maxLength}}
    </title-caption>
  </div>
</template>

<script>
  import TitleCaption from '@Facade/Title/Caption'
  import debounce from "lodash/debounce";

  export default {
    name: 'Facade.Input.TextArea',
    components: {
      TitleCaption
    },
    props: {
      model: {
        validator: function (value) {
          return value === null || typeof value === "string" || typeof value === "number";
        }
      },
      placeholder: String,
      maxLength: Number,
      disable: Boolean,
      labeled: Boolean
    },
    data () {
      return {
        baseModel: this.model
      }
    },
    methods: {
      resize(e) {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`
      },
      focusInput(){
        if(!this.disable) this.$refs['facade-input-text-area-ref'].focus()
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
    },
    mounted() {
      // setTimeout(() => this.$refs['facade-input-text-area-ref'].style.height = `${this.$refs['facade-input-text-area-ref'].scrollHeight}px`, 300)
      console.log(this.$refs['facade-input-text-area-ref'].scrollHeight)
    },
    created() {
      this.modelDebounceFunction = debounce(() => this.applicableCopyOfEmit(), this.disableDebounce ? 0 : 200)
    },
  }
</script>

<style scoped lang="scss">
  .facade-input-text-area {
    position: relative;
    cursor: text;
    padding: 8px 0 0;
    .textarea-title {
      top: 20px;
      left: 0;
      font-size: rem(14);
      padding: 0 2px;
      position: absolute;
      color: $grey-scale-200;
      font-weight: 400;
      line-height: rem(16);
      cursor: text;
    }

    .textarea-container {
      width: 100%;
      box-sizing: border-box;
      padding: 0 0 2px;
      border-bottom: 2px solid $grey-scale-300;
      &:focus-within{
        transition: all .2s ease-out;
        border-color: $blue;
      }
      textarea {
        width: 100%;
        resize: none;
        border: none;
        outline: none;
        background-color: transparent;
        color: #fff;
        font-weight: 400;
        font-size: rem(15);
        line-height: rem(20);
        font-family: Inter, sans-serif;
        box-sizing: border-box;
        padding: 0 2px;

        &::placeholder {
          color: $grey-scale-200;
        }
      }
    }
    .textarea-text-length {
      text-align: right;
      margin-top: 8px;
      .textarea-count {
        color: #fff;
      }
    }


    &[labeled]{
      textarea{
        padding-top: 20px;
        &::placeholder{
          color: transparent;
        }
        &:focus + .textarea-title{
          top: 0;
        }
      }

      textarea:not(:placeholder-shown) + .textarea-title {
        top: 0;
      }
    }

    &[disable]{
      outline: none;
      cursor: not-allowed;
      border-color: $grey-scale-300;
      .textarea-title{
        cursor: not-allowed;
      }
      textarea{
        color: $grey-scale-200;
        cursor: not-allowed;
      }
    }
  }
</style>