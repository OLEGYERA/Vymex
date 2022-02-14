<template>
  <div class="facade-text-area">
    <title-caption class="textarea-title"><slot name="title"/></title-caption>
    <div class="textarea-container">
      <textarea
          class="textarea"
          v-model="currentValue"
          :maxlength="maxLength"
          rows="1"
          ref="textarea"
          @input="resize($event)"
          :placeholder="placeholder">
      </textarea>
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
    textAreaValue: String,
    placeholder: String,
    count: Boolean,
    maxLength: Number,
    labeled: Boolean
  },
  data () {
    return {
      currentValue: this.textAreaValue || '',
    }
  },
  methods: {
    resize(e) {
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`
    }
  },
  mounted() {
    setTimeout(() => this.$refs['textarea'].style.height = `${this.$refs['textarea'].scrollHeight}px`, 200)
    console.log(this.$refs['textarea'].scrollHeight)
  }
}
</script>

<style scoped lang="scss">
  .facade-text-area {
    padding: 8px 0 0;
    .textarea-title {
      margin-bottom: 4px;
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
  }
</style>