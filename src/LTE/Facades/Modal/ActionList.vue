<template>
  <div class="facade-modal-action-list" v-if="status">
    <div class="action-list-substrate" @click="handleClose"></div>
    <div class="action-list-body">
      <div v-for="(action, actionKey) in actions" :key="actionKey" class="action-item" @click="handleClickOnItem(actionKey)">
        {{ action }}
      </div>
      <div class="action-item action-item-del" @click="handleClickOnDelete">
        <slot name="del-title">Удалить</slot>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Facade.Modal.ActionList',
    components: {
    },
    props: {
      actions: {
        type: Array,
        required: true
      },
      status: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      handleClickOnItem(id){
        this.$emit('onList', id);
        this.handleClose();
      },
      handleClickOnDelete(){
        this.$emit('onDelete');
        this.handleClose();
      },
      handleClose(){
        this.$emit('onClose');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-modal-action-list {
    position: absolute;
    .action-list-substrate{
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: fixed;
      //background-color: #73D13D;
      z-index: 2;
    }
    .action-list-body{
      position: absolute;
      width: max-content;
      border-radius: 8px;
      overflow: hidden;
      box-sizing: border-box;
      background-color: $grey-scale-700;
      box-shadow: 0 0 65px 3px rgba(0, 0, 0, 0.5);
      z-index: 3;
      .action-item {
        color: #fff;
        padding: 12px;
        font-size: rem(15);
        line-height: rem(20);
        cursor: pointer;
        transition: .1s all ease;
        background-color: transparent;
        &.action-item-del{
          color: $red;
        }

        &:hover {
          background-color: $grey-scale-400;
          &.action-item-del{
            background-color: $grey-scale-500;
          }
        }
      }
    }

  }
</style>