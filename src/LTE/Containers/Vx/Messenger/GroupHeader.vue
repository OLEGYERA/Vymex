<template>
  <div class="container-vx-group-header">
    <!--    <image-cropper :imageResult="'/wp-content/uploads/flamingo.jpg'" :color-code="2"/>-->
    <div class="private-info">
      <div class="dialog-image"></div>
      <div class="info-text">
        <text-base><slot>Илон Маск зовет на Марс</slot></text-base>
        <title-caption><slot>4 участника</slot></title-caption>
      </div>
      <points-vertical/>
    </div>
    <icon-error/>
  </div>
</template>

<script>
  // import ImageCropper from '@Facade/Image/Cropper'
  import TitleCaption from '@Facade/Title/Caption'
  import TextBase from '@Facade/Text/Base'
  import PointsVertical from '@Icon/PointsVertical'
  import IconError from '@Icon/Error'

  export default {
    name: 'Container.Vx.GroupHeader',
    components: {
      // ImageCropper
      TitleCaption,
      TextBase,
      PointsVertical,
      IconError
    }
  }
</script>

<style lang="scss" scoped>
  .container-vx-group-header {
    width: 100%;
    padding: 12px 10px 12px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $grey-scale-500;
    .private-info {
      display: inherit;
      align-items: center;
      .dialog-image {
        margin-right: 12px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background-color: #fff;
      }
      .facade-text-base {
        margin-right: 24px;
        color: #fff;
      }
      .icon-points {
        padding: 10px;
        color: $grey-scale-200;
        cursor: pointer;
      }
    }
    .icon-error{
      color: $grey-scale-200;
      padding: 10px;
      cursor: pointer;
    }
  }
</style>