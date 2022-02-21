<template>
  <input-validation
    :model="model"
    :placeholder="placeholder"
    :mask="generateMaskPattern"
    :img="img"
    :type="type"
    :labeled="labeled"
    :position="position"
    :disable="disable"
    :disableDebounce="disableDebounce"
    :hide="hide"
    ref="facade-input-alias-ref"
    :validation-status="validationStatus"
    :validation-text="validationText"
    @onInput="$emit('onAlias', $event)"
    @onBlur="$emit('onBlur')"
    @onKeyEnter="$emit('onKeyEnter')"
    @onKeyTab="$emit('onKeyTab')"
  />
</template>

<script>
  import InputValidation from '@Facade/Input/Validation'

  export default {
    name: 'Facade.Input.Alias',
    props: {
      model: {},
      placeholder: {},
      img: {},
      type: {},
      labeled: {},
      position: {},
      disable: {},
      disableDebounce: {},
      hide: {},
      validationStatus: {},
      validationText: {},
    },
    components: {
      InputValidation,
    },
    computed: {
      generateMaskPattern(){
        let maskPattern = ['@'];
        for(let i = 0; i < 32; i++) maskPattern.push(/[a-z0-9_]/)
        return maskPattern;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .input-alias{
    position: relative;
  }
</style>