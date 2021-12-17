<template>
  <input-validation
    input-name="input-alias"
    :input-model="InputModel"
    :input-focus="InputFocus"
    :placeholder="placeholder"
    :mask-pattern="generateMaskPattern"
    :validation-status="ValidationStatus"
    :validation-text="ValidationText"
    @onInput="$emit('onAlias', $event)"
  />
</template>

<script>
  import InputValidation from '@/components/input/validation'

  export default {
    name: 'input.alias.component',
    props: {
      placeholder: String,
      InputModel: String,
      ValidationStatus: Boolean,
      ValidationText: String,
      InputFocus: Boolean,
    },
    components: {
      InputValidation,
    },
    computed: {
      generateMaskPattern(){
        let maskPattern = ['@'];
        for(let i = 0; i < 32; i++) maskPattern.push(/[a-z0-9_]/)
        return maskPattern
      }
    },
  }
</script>

<style lang="scss" scoped>
  .input-alias{
    position: relative;
  }
</style>