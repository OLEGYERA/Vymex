<template>
  <div class="container-vx-private-dialog">
<!--    <image-cropper :imageResult="'/wp-content/uploads/flamingo.jpg'" :color-code="2"/>-->
    <div class="private-info">
      <div class="dialog-image"></div>
      <div class="info-text">
        <title-caption>Личные диалоги</title-caption>
        <text-base>Александр Ким</text-base>
      </div>
    </div>
    <div class="message-count">2</div>
  </div>
</template>

<script>
// import ImageCropper from '@Facade/Image/Cropper'
   import TitleCaption from '@Facade/Title/Caption'
   import TextBase from '@Facade/Text/Base'

export default {
  name: 'Container.Vx.PrivateDialog',
  components: {
    // ImageCropper
    TitleCaption,
    TextBase,
  }
}
</script>

<style lang="scss" scoped>
  .container-vx-private-dialog {
    width: 100%;
    padding: rem(12) rem(20);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $grey-scale-500;
    .private-info {
      display: inherit;
      align-items: center;
      color: #fff;
      .dialog-image {
        margin-right: 12px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background-color: #fff;
      }
      .facade-title-caption {
        color: $gray-scale-100;
      }
      .facade-text-base{
        color: #fff;
      }
    }
    .message-count {
      height: 24px;
      width: 24px;
      border-radius: 8px;
      background-color: $blue;
      color: #fff;
      font-weight: 600;
      font-size: rem(12);
      line-height: rem(24);
      text-align: center;
    }
  }
</style>