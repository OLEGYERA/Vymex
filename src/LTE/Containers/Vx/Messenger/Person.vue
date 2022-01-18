<template>
  <div class="container-vx-person">
    <!--    <image-cropper :imageResult="'/wp-content/uploads/flamingo.jpg'" :color-code="2"/>-->
    <div class="private-info">
      <div class="dialog-image"></div>
      <div class="info-text">
        <div class="name">Виталий Боцман</div>
        <title-caption>@lable_kers</title-caption>
      </div>
    </div>
    <points-vertical/>
  </div>
</template>

<script>
// import ImageCropper from '@Facade/Image/Cropper'
import TitleCaption from '@Facade/Title/Caption'
import PointsVertical from '@Icon/PointsVertical'

export default {
  name: 'Container.Vx.Person',
  components: {
    // ImageCropper
    TitleCaption,
    PointsVertical,
  }
}
</script>

<style lang="scss" scoped>
  .container-vx-person {
    width: 100%;
    padding: rem(16) rem(12);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $grey-scale-400;
    border-radius: 12px;
    .private-info {
      display: inherit;
      align-items: center;
      .dialog-image {
        margin-right: 8px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background-color: #fff;
      }
      .name {
        font-weight: 600;
        font-size: rem(17);
        line-height: rem(22);
        color: #fff;
      }
    }
    .icon-points {
      padding: 10px;
      color: #fff;
      cursor: pointer;
    }
  }
</style>