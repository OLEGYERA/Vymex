<template>
  <div class="facade-image-cropper">
    <cropper
      class="cropper"
      :src="imageResult"
      :stencil-props="{
        aspectRatio: 1,
        previewClass: 'preview'
      }"

      image-restriction="stencil"
      stencil-component="circle-stencil"
      @change="change"
    />
  </div>
</template>

<script>
  /*eslint-disable*/
  import { Cropper } from 'vue-advanced-cropper'
  import 'vue-advanced-cropper/dist/style.css';

  export default {
    name: 'Facade.Image.Cropper',
    components: {
      Cropper
    },
    props: {
      imageResult: String
    },
    methods: {
      change({canvas}) {
        this.$emit('onCropped', canvas)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-image-cropper{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    ::v-deep{
      .preview {
        border: dashed 1px rgba(255,255,255, 0.25);
      }
    }
  }
</style>