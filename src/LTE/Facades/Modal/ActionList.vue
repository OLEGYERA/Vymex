<template>
  <div id="menu" class="facade-modal-action-list" v-if="actionListStatus">
    <div v-for="(item, itemKey) in items"
        class="action-item"
        :key="itemKey"
        :class="{delete: item.includes('Удалить')}"
         @click="$emit('onClick', {key: itemKey})">
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
  methods: {
    // sendKey(key) {
    //   this.$emit('onClick', key)
    // }
  }
}
</script>

<style lang="scss" scoped>
  .facade-modal-action-list {
    position: absolute;
    padding: 4px;
    background-color: $grey-scale-700;
    border-radius: 8px;
    box-sizing: border-box;
    width: max-content;
    box-shadow: 0px 0px 65px 3px rgba(0, 0, 0, 0.5);
    z-index: 2;
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