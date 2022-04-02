<template>
  <div class="facade-messenger-name">
    <div class="name-part">
      <div @click="$emit('onClick')"><arrow-left/></div>
      <div class="block">{{name}}</div>
    </div>
    <points-vertical v-if="type==='user'" @click.native="statusAction = true"/>
    <modal-action-list :status="statusAction"
                       :actions="actions"
                       @onList="$notify({text: 'Уведомления отключены', type: 'success', duration: 3000, speed: 500})"
                       @onClose="statusAction = false"
                       @onDelete="statusBase = true">
      <template #del-title>Удалить из контактов</template>
    </modal-action-list>
    <modal-base :status="statusBase" @onClose="statusBase = false" @onOk="deleteContact">
      <template #title>Удалить из контактов?</template>
      <template #description>
        Контакт будет удален вместе со всеми медиа данными без возможности восстановления
      </template>
      <template #button-accept>Удалить</template>
    </modal-base>
  </div>
</template>

<script>
import ArrowLeft from '@Icon/ArrowLeftBold'
import PointsVertical from '@Icon/PointsVertical'
import ModalActionList from '@Facade/Modal/ActionList'
import ModalBase from '@Facade/Modal/Base'
import {mapMutations} from "vuex";

export default {
  name: 'Singleton.Messenger.Facades.Name',
  components: {
    ArrowLeft,
    PointsVertical,
    ModalActionList,
    ModalBase
  },
  data(){
    return{
      statusAction: false,
      actions: ['Отлючить уведомления'],
      statusBase: false
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    type: String
  },
  methods: {
    ...mapMutations({
      routerBack: 'Messenger/ToolsScene/routerBack',
    }),
    deleteContact(){
      this.statusBase = false
      this.$notify({text: 'Контакт удален', type: 'success', duration: 3000, speed: 500})
      this.routerBack()
    }
  },
  mounted() {
    console.log(1111111)
  }
}
</script>

<style lang="scss" scoped>
  .facade-messenger-name {
    width: 100%;
    padding: 8px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: transparent;
    box-sizing: border-box;
    margin-bottom: 36px;
    //cursor: pointer;
    .icon-arrow-left-bold {
      margin-right: 12px;
      height: 18px;
      padding: 5px 8px;
      cursor: pointer;
    }
    .name-part {
      display: inherit;
      align-items: center;
    }
    .block {
      font-weight: 600;
      font-size: rem(17);
      line-height: rem(22);
    }
    .icon-points-vertical {
      height: 16px;
      padding: 5px 10px;
      cursor: pointer;
    }
    .facade-modal-action-list::v-deep{
      .action-list-body{
        top: 24px;
        left: 100px;
      }
    }
  }
</style>