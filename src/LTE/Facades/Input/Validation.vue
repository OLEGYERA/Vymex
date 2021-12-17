<template>
  <div class="facade-input-validation" :class="{success: validationStatus === true, error: validationStatus === false}">
    <input-base
      :model="model"
      :placeholder="placeholder"
      :mask="mask"
      :img="img"
      :type="type"
      :labeled="labeled"
      :position="position"
      :disable="disable"
      :disableDebounce="disableDebounce"
      :hide="hide"
      ref="facade-input-validation-ref"
      @onInput="$emit('onInput', $event)"
      @onKeyEnter="$emit('onKeyEnter')"
      @onKeyTab="$emit('onKeyEnter')"
      @onFocus="showValidationAlert"
      @onBlur="hideValidationAlert"
    />
    <icon-success v-if="validationStatus === true" />
    <icon-error v-if="validationStatus === false" />

    <div class="validation-alert" v-if="validationText && validationStatus !== null">
      {{ validationText }}
    </div>
  </div>
</template>

<script>
import InputBase from '@Facade/Input/Base'
import IconSuccess from '@Icon/Success'
import IconError from '@Icon/Error'

export default {
  name: 'Facade.Input.Validation',
  components: {
    InputBase,
    IconSuccess,
    IconError
  },
  props: {
    model: {},
    placeholder: {},
    mask: {},
    img: {},
    type: {},
    labeled: {},
    position: {},
    disable: {},
    disableDebounce: {},
    hide: {},
    validationStatus: Boolean,
    validationText: String,
  },
  data() {
    return {
      validationAlertStatus: false
    }
  },
  methods: {
    showValidationAlert(){
      this.validationAlertStatus = true
    },
    hideValidationAlert(){
      if(this.validationStatus) this.validationAlertStatus = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .facade-input-validation{
    display: flex;
    position: relative;
    flex-direction: column;
    .icon-success, .icon-error{
      position: absolute;
      right: 7px;
      top: 20px;
    }
    .icon-success{
      color: $green;
    }
    .icon-error{
      color: $red;
    }
  
    .validation-alert{
      margin-top: 8px;
      text-align: left;
      font-size: 16px;
      line-height: 20px;
      height: 20px;
    }
  
  
    &.success{
      .facade-input-base{
        border-color: $green;
      }
      .validation-alert{
        color: $green;
      }
    }
    &.error{
      .facade-input-base{
        border-color: $red;
      }
      .validation-alert{
        color: $red;
      }
    }
  }
</style>