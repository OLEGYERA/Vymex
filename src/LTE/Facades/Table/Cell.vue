<template>
  <div class="facade-table-cell" :position="position" :no-touch="noTouch" :key-select="selectCursor" :style="{height: `${height}px`}">
    <div v-for="(subgroup, keySubgroup) in structure" class="cell-group" :class="`group-num-${keySubgroup}`" :key="keySubgroup">
      <div v-for="(slot, keySlot) in subgroup" :class="slot" :key="keySlot">
        <slot :name="keySlot"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Facades.Table.Cell',
    props: {
      structure: {
        type: Array,
        required: true
      },
      height: Number,
      selectCursor: Boolean,
      position: String,
      noTouch: Boolean
    }
  }
</script>

<style lang="scss" scoped>
  .facade-table-cell{
    width: 100%;
    display: flex;
    padding: 0 rem(14);
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    overflow: hidden;
    color: #fff;
    .cell-group{
      display: flex;
      align-items: center;
    }

    &[position="between"]{
      justify-content: space-between;
    }

    &[position="center"]{
      justify-content: center;
    }

    &:hover{
      background-color: $grey-scale-500;
      transition: .15s all linear;
    }

    &[key-select]{
      background-color: $grey-scale-300;
      transition: .15s all linear;
    }

    &[no-Touch]{
      cursor: default;
      background-color: transparent;
    }

  }
</style>