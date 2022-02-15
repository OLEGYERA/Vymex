<template>
  <div class="facade-text-area"
       tabindex="0"
       @click="focusInput"
       :disable="disable"
       :labeled="labeled">
    <div class="textarea-container">
      <textarea
          class="textarea"
          v-model="currentValue"
          :maxlength="maxLength"
          rows="1"
          ref="facade-input-text-area-ref"
          @input="resize($event)"
          :placeholder="placeholder">
      </textarea>
      <title-caption class="textarea-title" v-if="labeled">{{placeholder}}</title-caption>
    </div>
    <title-caption v-if="count" class="textarea-text-length">
      <span :class="{'textarea-count': currentValue}">{{currentValue.length}}</span>/{{maxLength}}
    </title-caption>
  </div>
</template>

<script>
  import TitleCaption from '@Facade/Title/Caption'

  export default {
    name: 'Facade.Input.TextArea',
    components: {
      TitleCaption
    },
    props: {
      model: String,
      placeholder: String,
      count: Boolean,
      maxLength: Number,
      disable: Boolean,
      labeled: Boolean
    },
    data () {
      return {
        currentValue: this.model || '',
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
    },
    created() {
      setTimeout(() => this.$refs['facade-input-text-area-ref'].style.height = `${this.$refs['facade-input-text-area-ref'].scrollHeight}px`, 200)
    }
  }
</script>

<style scoped lang="scss">
  .facade-text-area {
    position: relative;
    cursor: text;
    padding: 8px 0 0;
    .textarea-title {
      top: 20px;
      position: absolute;
    }

    .textarea-container {
      width: 100%;
      box-sizing: border-box;
      padding: 0 0 4px;
      border-bottom: 1px solid $grey-scale-300;
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
        font-family: Inter, sans-serif;
        font-size: 15px;
        line-height: 20px;
        box-sizing: border-box;
        padding: 0;

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