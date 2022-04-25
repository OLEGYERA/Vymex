<template>
  <div class="container-periodicity-processes" v-if="status">
    <div class="periodicity-processes-body">
      <div v-for="(action, actionKey) in actions" :key="actionKey" class="periodicity-item"
           @click="handleClickOnItem(actionKey)">
        {{ action.title }}
        <checkbox :viewType="2"
                  :model="action.checked"
                  :disable="action.checked"
                  @onClick="handleClickOnItem(actionKey)"/>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'processes.periodicity.processes',
  components: {
    Checkbox: () => import('@Facade/Input/Checkbox')
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
    handleClickOnItem(id) {
      this.$emit('onList', id);
    }
  }
}
</script>

<style lang="scss" scoped>
.container-periodicity-processes {
  position: relative;

  .periodicity-processes-body {
    color: $grey-scale-200;
    background: $grey-scale-700;
    border-radius: 8px;
    margin-top: -6px;
    position: absolute;
    width: 100%;
    margin-bottom: 4px;
    z-index: 2;
    font-weight: 400;
    font-size: rem(15);
    line-height: rem(20);
    .periodicity-item {
      display: flex;
      justify-content: space-between;
      margin-top: 4px;
      padding: 12px 16px;
      &:hover {
        font-weight: 600;
        font-size: rem(15);
        line-height: rem(20);
        color: #FFF;
      }
    }
  }
}
</style>