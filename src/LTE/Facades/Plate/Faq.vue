<template>
  <div class="facade-plate-faq">
    <div class="plate-faq-body">
      <div class="faq-avatar">
        <slot name="icon"/>
      </div>
      <div class="faq-column-box">
        <text-base class="faq-title"><slot name="title"/></text-base>
        <text-base class="faq-description"><slot name="description"/></text-base>
      </div>
      <div class="faq-player">
        <div class="control-player">
          <div class="control-player-body">
            <icon-control-play/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TextBase from '@Facade/Text/Base'
  import IconControlPlay from '@Icon/ControlPlay'

  export default {
    name: 'Facade.Plate.Faq',

    components: {
      TextBase,
      IconControlPlay,
    },
  }
</script>

<style lang="scss" scoped>
  .facade-plate-faq{
    border-radius: 12px;
    box-sizing: border-box;
    background: $grey-scale-400;
    .plate-faq-body{
      width: 100%;
      height: 100%;
      padding: 16px;
      display: flex;
      overflow: hidden;
      align-items: center;
      position: relative;
      box-sizing: border-box;
      .faq-avatar{
        flex-shrink: 0;
        width: 56px;
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 12px;
        border-radius: 20px;
        background-color: $grey-scale-300;
      }
      .faq-column-box{
        width: 100%;
        display: flex;
        flex-direction: column;
        .faq-title{
          color: #fff;
        }
        .faq-description{
          font-size: rem(12);
          line-height: rem(16);
        }
      }
      .faq-player{
        flex-shrink: 0;
        width: 16px;
        height: 100%;
        .control-player{
          top: 8px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          position: absolute;
          overflow: hidden;
          background: linear-gradient(135deg, #81FFEF 0%, #F067B4 100%);
          .control-player-body{
            color: #fff;
            height: 100%;
            display: flex;
            padding-bottom: 6px;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
          }
        }
      }
    }
  }
</style>