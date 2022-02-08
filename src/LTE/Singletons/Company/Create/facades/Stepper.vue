<template>
  <div class="facade-stepper">
    <div class="stepper-counterTitle">
      <title-caps>Шаг <span class="step-title-counter">{{step}}</span></title-caps>
    </div>
    <div class="stepper-stateMap">
      <div class="stateMap-point" :class="{active: step === 1, success: step > 1}"><div class="point-body"><icon-success/></div></div>
      <span class="stateMap-bridge"></span>
      <div class="stateMap-point" :class="{active: step === 2, success: step > 2}"><div class="point-body"><icon-success/></div></div>
      <span class="stateMap-bridge"></span>
      <div class="stateMap-point" :class="{active: step === 3}"><div class="point-body"><icon-success/></div></div>
    </div>
    <div class="stepper-title">
      <title-semi v-html="info.title"/>
      <text-base v-html="info.description"/>
    </div>
  </div>
</template>

<script>
  import TitleCaps from '@Facade/Title/Caps'
  import TitleSemi from '@Facade/Title/Semi'
  import TextBase from '@Facade/Text/Base'

  export default {
    name: 'Singleton.Messenger.Facades.Stepper',
    components: {TitleCaps, TitleSemi, TextBase},
    props: {
      step: {
        type: Number,
        required: true
      },
      info: {
        type: Object,
        required: true
      },
    }
  }
</script>

<style lang="scss" scoped>
  .facade-stepper{
    width: 100%;
    padding: 20px;
    border-radius: 16px;
    background-color: $grey-scale-500;
    position: relative;
    box-sizing: border-box;
    margin-bottom: 32px;
    .stepper-counterTitle{
      position: absolute;
      top: 20px;
      left: 20px;
      .step-title-counter{
        color: $blue;
      }
    }
    .stepper-stateMap{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
      .stateMap-point{
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        .point-body{
          display: inherit;
          justify-content: inherit;
          align-items: inherit;
          width: 40%;
          height: 40%;
          background-color: $grey-scale-300;
          border-radius: 50%;
          .icon-success{
            display: none;
            color: #fff;
          }
        }

        &.active{
          .point-body{
            width: 70%;
            height: 70%;
            background-color: $blue;
          }
        }
        &.success{
          .point-body{
            width: 100%;
            height: 100%;
            background-color: $green;
            .icon-success{
              display: block;
            }
          }
        }
      }
      .stateMap-bridge{
        width: 40px;
        height: 4px;
        border-radius: 2px;
        background-color: $grey-scale-300;
        margin: 0 4px;
      }
    }
    .stepper-title{
      .facade-title-semi{
        text-align: center;
        margin-bottom: 8px;
      }
      .facade-text-base{
        text-align: center;
      }
    }
  }
</style>