<template>
  <div class="facade-modal-action-list" v-if="actionListStatus">
    <div
        v-for="(item, itemKey) in items"
        class="action-item"
        :key="itemKey"
        :class="{delete: item.includes('Удалить')}"
        @click="$emit('changeStatus')">
      {{item}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'Facade.Modal.ActionList',
  components: {
  },
  props: {
    items: Array,
    actionListStatus: Boolean,
  },
}
</script>

<style lang="scss" scoped>
  .facade-modal-action-list {
    padding: 4px;
    background-color: $grey-scale-700;
    border-radius: 8px;
    box-sizing: border-box;
    width: max-content;
    .action-item {
      padding: 12px;
      background-color: transparent;
      color: #fff;
      cursor: pointer;
      transition: color .2s;
      &:hover {
        color: $grey-scale-200;
      }
    }
    .delete {
      color: $red;
    }
  }
</style>