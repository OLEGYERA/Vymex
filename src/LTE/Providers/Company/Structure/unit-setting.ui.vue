<template>
  <unit-ui v-bind="$props">
    <div class="structure-unit-setting">
      <icon-points-vertical @click.native="modalSettingList = true"/>
      <modal-action-list class="unit-setting-list"
                         :status="modalSettingList"
                         :actions="['Просмотр', 'Редактировать']"
                         @onDelete="deleteUnit"
                         @onClose="modalSettingList = false"/>
    </div>
  </unit-ui>
</template>

<script>
  import UnitUi from './unit.ui'
  import ModalActionList from '@Facade/Modal/ActionList'
  import Mixin from './mixin'

  export default {
    name: 'Providers.Company.Structure.UnitSetting.Ui',
    components: {UnitUi, ModalActionList},
    mixins: [Mixin],
    data: () => ({
      modalSettingList: false
    }),
    methods: {
      deleteUnit(){
        this.$emit('onDelete')
        this.modalSettingList = false
      }
    }
  }
</script>

