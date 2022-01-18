<template>
  <div class="container-vx-group-chat">
    <!--    <image-cropper :imageResult="'/wp-content/uploads/flamingo.jpg'" :color-code="2"/>-->
    <div class="dialog-image">
      <span><icon-group/></span>
    </div>
    <div class="info-text">
      <div class="top-part">
        <text-base><slot name="title">Поездка в Чернобыль</slot></text-base>
        <div class="message-info">
          <double-check/>
          <title-caption>15:30</title-caption>
        </div>
      </div>
      <div class="down-part">
        <div>
          <title-caption class="name"><slot name="name">Виталина</slot></title-caption>
          <title-caption><slot name="message">Ребята, общий сбор в 9:30</slot></title-caption>
        </div>
        <div class="message-count">2</div>
      </div>
    </div>
  </div>
</template>

<script>
// import ImageCropper from '@Facade/Image/Cropper'
import TitleCaption from '@Facade/Title/Caption'
import TextBase from '@Facade/Text/Base'
import DoubleCheck from "@Icon/DoubleCheck";
import IconGroup from "@Icon/Group"

export default {
  name: 'Container.Vx.PrivateDialog',
  components: {
    // ImageCropper
    TitleCaption,
    TextBase,
    DoubleCheck,
    IconGroup
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.container-vx-group-chat {
  width: 100%;
  padding: rem(12);
  display: flex;
  align-items: center;
  background-color: $grey;
  border-radius: 12px;
  &:hover {
    background-color: $grey-scale-500;
  }
  &:active {
    background-color: $grey-scale-400;
  }
  .dialog-image {
    position: relative;
    margin-right: 12px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: #fff;
    .icon-group {
      position: absolute;
      right: 0;
      bottom: 0;
      height: 17px;
    }
  }
  .info-text {
    min-width: 254px;
    .top-part {
      display: flex;
      justify-content: space-between;
      .facade-text-base {
        color: #fff;
      }
      .message-info {
        display: inherit;
        align-items: center;
        .icon-double-check {
          color: $blue;
          height: 16px;
          margin-right: 12px;
        }
      }
    }
    .down-part {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        color: $gray-scale-100;
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
  }
}

</style>