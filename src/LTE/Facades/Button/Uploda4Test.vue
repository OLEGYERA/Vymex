<template>
  <div class="facade-button-upload-4-test">
    <label class="button-upload-body" for="assetsFieldHandle4test">
      <icon-camera/>
      <input class="button-upload-input" ref="uploadedFile4Test"
             type="file" id="assetsFieldHandle4test"
             @change="onChange"/>
    </label>
  </div>
</template>

<script>
import IconCamera from '@Icon/Camera'

export default {
  name: 'Facade.Button.Upload4Test',
  components: {
    IconCamera
  },
  props: {
    disable: Boolean,
  },
  methods: {
    onChange() {
      this.$core.execViaComponent('Uploader', 'init',[
        this.$refs.uploadedFile4Test.files[0],
        this.handleUploadOnprogress, null,
        this.handleUploaderOnload
      ])
    },
  },
}
</script>

<style lang="scss" scoped>
  .facade-button-upload-4-test{
    width: 46px;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $grey-scale-500;
    border-radius: 50%;
    .button-upload-body{
      cursor: pointer;
      width: 70%;
      height: 70%;
      display: flex;
      align-items: inherit;
      justify-content: inherit;
      background-color: $blue;
      border-radius: 50%;
      overflow: hidden;
      .icon-camera{
        color: #fff;
        height: 16px;
      }
      .button-upload-input{
        display: none;
      }
    }
    &.coverBy{
      position: relative;
      &:before{
        z-index: 1;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>