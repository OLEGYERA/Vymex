<template>
  <div class="facade-messenger-name">
    <div class="name-part">
      <div @click="$emit('onClick')"><arrow-left/></div>
      <div class="block">{{name}}</div>
    </div>
    <points-vertical v-if="type==='user'" @click.native="statusAction = true"/>
    <modal-action-list :status="statusAction"
                       v-if="actions || disableDelete"
                       :actions="actions"
                       :disable-delete="disableDelete"
                       @onList="chooseAction"
                       @onClose="statusAction = false"
                       @onDelete="$emit('onDelete')">
      <template v-if="delTitle" #del-title>{{delTitle}}</template>
    </modal-action-list>
  </div>
</template>

<script>
  import ArrowLeft from '@Icon/ArrowLeftBold'
  import PointsVertical from '@Icon/PointsVertical'
  import ModalActionList from '@Facade/Modal/ActionList'

  export default {
    name: 'Singleton.Messenger.Facades.Name',
    components: {
      ArrowLeft,
      PointsVertical,
      ModalActionList,
    },
    data(){
      return{
        statusAction: false,
      }
    },
    props: {
      name: {
        type: String,
        required: true
      },
      type: String,
      actions: Array,
      delTitle: String,
      disableDelete: Boolean
    },
    methods: {
      chooseAction(id) {
        this.$emit('onList', id)
      }
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