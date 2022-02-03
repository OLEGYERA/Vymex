<template>
  <div class="singleton-messenger-action-list" @click.stop>
    <div
        v-for="(item, itemKey) in items"
        class="action-item"
        :key="itemKey"
        :class="{delete: item.includes('Удалить')}"
        @click="showContext(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'Singleton.Messenger.ActionList',
  components: {},
  methods: {
    showContext(value) {
     // if(value === 'Скрыть виджет')
        this.$emit('show-context', value)
   //   if(value === 'Выдать доступ') this.$emit('grant-access')
    }
  },
  props: {
    items: Array,
  },
}
</script>

<style lang="scss" scoped>
.singleton-messenger-action-list {
  padding: 4px;
  background-color: $grey-scale-700;
  border-radius: 8px;
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