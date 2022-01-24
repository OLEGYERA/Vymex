<template>
  <div class="facade-text-area">
    <title-caption class="textarea-title"><slot name="title"/></title-caption>
    <textarea
        class="textarea"
        :type="'text'"
        v-model="currentValue"
        :style="inputStyle"
        maxlength="1000"
        :placeholder="placeholder">
    </textarea>
    <textarea class="shadow" v-model="currentValue" ref="shadow" tabindex="0"></textarea>
    <title-caption class="textarea-length"><slot name="count"/></title-caption>
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
    type: String,
    placeholder: String
  },
  data () {
    return {
      currentValue: this.type,
      inputHeight: '0'
    }
  },
  watch: {
    currentValue () {
      this.resize()
      this.$emit('input', this.currentValue)
    }
  },
  computed: {
    inputStyle () {
      return {
        'min-height': this.inputHeight
      }
    }
  },
  mounted () {
    this.resize()
    this.currentValue += type;
  },
  methods: {
    resize () {
      this.inputHeight = `${this.$refs.shadow.scrollHeight - 8}px`
    }
  }
}
</script>

<style scoped lang="scss">
  .facade-text-area {
    width: 100%;
    box-sizing: border-box;
    position: relative;
    .textarea-title {
      margin-bottom: 4px;
    }
    textarea {
      width: 100%;
      resize: none;
      border: none;
      outline: none;
      overflow: hidden;
      margin-bottom: 8px;
      background-color: transparent;
      color: #fff;
      font-weight: 400;
      font-family: Inter;
      font-size: 15px;
      line-height: 20px;
      border-bottom: 1px solid $grey-scale-300;
      padding: 4px 0;
      height: 0;
      &:focus{
        transition: all .2s ease-out;
        border-color: $blue;
        padding-bottom: 20px;
      }
      &.shadow {
        height: 0;
        pointer-events: none;
        opacity: 0;
        border: none;
        position: absolute;
      }
    }
    .textarea-length {
      text-align: right;
    }
  }
</style>