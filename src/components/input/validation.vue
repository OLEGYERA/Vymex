<template>
  <div class="input-validation" :class="[{success: ValidationStatus === true, error: ValidationStatus === false}, InputName]">
    <input-base
      :placeholder="placeholder"
      :input-model="InputModel"
      :input-focus="InputFocus"
      :mask-pattern="MaskPattern"
      @onInput="$emit('onInput', $event)"
      @onFocus="showValidationAlert"
      @onBlur="hideValidationAlert"
    />
    <icon-success v-if="ValidationStatus === true" />
    <icon-error v-if="ValidationStatus === false" />


    <div class="validation-alert" v-if="ValidationText && validationAlertStatus">
      {{ ValidationText }}
    </div>
  </div>
</template>

<script>
  import InputBase from '@/components/input/base'
  import IconSuccess from '@/components/icon/success'
  import IconError from '@/components/icon/error'

  export default {
    name: 'input.validation.component',
    components: {
      InputBase,
      IconSuccess,
      IconError
    },
    props: {
      placeholder: String,
      InputModel: String,
      InputName: String,
      InputFocus: Boolean,
      MaskPattern: [String, Array],
      ValidationStatus: Boolean,
      ValidationText: String
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
        if(this.ValidationStatus) this.validationAlertStatus = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .input-validation{
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
      .input-base{
        border-color: $green;
      }
      .validation-alert{
        color: $green;
      }
    }
    &.error{
      .input-base{
        border-color: $red;
      }
      .validation-alert{
        color: $red;
      }
    }
  }
</style>