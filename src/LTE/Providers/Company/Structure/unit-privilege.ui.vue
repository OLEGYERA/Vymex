<template>
  <unit-ui v-bind="$props">
    <icon-watcher v-if="privilegeType === 1"/>
    <icon-editor v-if="privilegeType === 2"/>
    <icon-setting v-if="privilegeType === 3"/>
  </unit-ui>
</template>

<script>
  import UnitUi from './unit.ui'
  import Mixin from './mixin'

  export default {
    name: 'Providers.Company.Structure.UnitSetting.Ui',
    components: {UnitUi},
    mixins: [Mixin],
    props: {
      privilegeType: {
        type: Number,
        required: true,
        validator: (val) => {
          return val >= 0 && val < 4
        }
      }
    },
    data: () => ({
      modalSettingList: false
    })
  }
</script>

<style lang="scss" scoped>
  .icon{
    margin-right: 10px;
    color: $blue;
    height: 16px;
  }
</style>

