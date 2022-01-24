<template>
  <div class="upload-avatar-ui">
    <div class="avatar-uploader-box">
      <div class="upload-avatar-body">
        <image-avatar :logo="avatar.logo" :color-code="avatar.colorCode"/>
        <button-upload :maxSize="sizeWarning.maxSize" :allowedTypes="sizeWarning.allowedTypes" @onUpload="handleUploadFile"/>
      </div>
      <modal-base :status="modalStatus" @onClose="modalStatus = false" @onOk="handlePressOk">
        <template #title>{{ title }}</template>
        <template #description>{{ description }}</template>
        <template #content>
          <image-cropper :imageResult="fileData.result" @onCropped="handleCroppedUpdate"/>
        </template>
        <template #button-accept>Сохранить</template>
      </modal-base>
    </div>
    <title-caption>{{sizeWarning.warning}}</title-caption>
  </div>
</template>

<script>
  import ImageAvatar from '@Facade/Image/Avatar'
  import ButtonUpload from '@Facade/Button/Upload'
  import ModalBase from '@Facade/Modal/Base'
  import ImageCropper from '@Facade/Image/Cropper'
  import TitleCaption from '@Facade/Title/Caption'

  export default {
    name: 'Providers.Setting.AvatarUpload.Ui',
    components: {ImageAvatar,ButtonUpload,ModalBase,ImageCropper,TitleCaption},
    props:{
      avatar: {
        type: Object,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: String,
      sizeWarning: {
        type: Object,
        required: true
      }
    },
    data: () => ({
      modalStatus: false,
      fileData: null,
      imageCropper: null
    }),
    methods: {
      /**
       * Активирует модальное окно и добавляет файл в реактивное состояние {fileData}.
       * @param {File} file
       */
      handleUploadFile(file){
        this.modalStatus = true;
        this.fileData = file;
      },
      /**
       * Получает Canvas обрезанного фото
       * @param {CanvasImageData} cropper
       */
      handleCroppedUpdate(cropper){
        this.imageCropper = cropper
      },
      /**
       * Конвертирует Canvas в Blob формат.
       * Вызывает {emit} - onUploadFile
       */
      handlePressOk(){
        this.modalStatus = false;
        this.imageCropper.toBlob(blob => {
          this.fileData.result = blob;
          this.$emit('onUploadFile', this.fileData)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .upload-avatar-ui{
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar-uploader-box{
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
    .facade-title-caption{
      margin: 18px 0 24px;
    }
  }
</style>