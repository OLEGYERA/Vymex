<template>
  <div class="facade-image-upload-avatar">
    <div class="upload-avatar-body">
      <image-avatar :logo="logo" :color-code="colorCode"/>
      <button-upload @onUpload="handleUploadFile"/>
    </div>
    <modal-base :status="modalAvatarStatus" @onClose="modalAvatarStatus = false" @onOk="handlePressOk">
      <template #title><slot name="title"/></template>
      <template #description><slot name="description"/></template>
      <template #content>
        <image-cropper :imageResult="imageData.result" @onCropped="handleCroppedUpdate"/>
      </template>
      <template #button-accept>Сохранить</template>
    </modal-base>
  </div>
</template>

<script>
  import ImageAvatar from '@Facade/Image/Avatar'
  import ButtonUpload from '@Facade/Button/Upload'
  import ModalBase from '@Facade/Modal/Base'
  import ImageCropper from '@Facade/Image/Cropper'

  export default {
    name: 'Facade.Image.Avatar',
    components: {
      ImageAvatar,
      ButtonUpload,
      ModalBase,
      ImageCropper
    },
    props: {
      logo: String,
      colorCode: String,
    },
    data(){
      return {
        modalAvatarStatus: false,
        imageData: null,
        imageCropper: null
      }
    },
    methods: {
      handleUploadFile(data){
        this.modalAvatarStatus = true;
        this.imageData = data;
      },
      handleCroppedUpdate(cropper){
        this.imageCropper = cropper
      },
      handlePressOk(){
        this.modalAvatarStatus = false;
        this.imageCropper.toBlob(blob => {
          this.imageData.result = blob;
          this.$emit('onAvatarFile', this.imageData)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-image-upload-avatar{
    width: 92px;
    height: 92px;
    .upload-avatar-body{
      width: 100%;
      height: 100%;
      position: relative;
      .facade-image-avatar{
        ::v-deep{
          .avatar-body{
            font-size: rem(34);
          }
        }
      }
      .facade-button-upload{
        position: absolute;
        right: -14px;
        bottom: -14px;
      }
    }
  }
</style>