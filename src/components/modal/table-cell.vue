<template>
  <div class="modal-table-cell" :class="[`position-${position}`, {noTouch: noTouch}]">
    <div v-for="(subgroup, keySubgroup) in group" class="cell-group" :class="`group-num-${keySubgroup}`" :key="keySubgroup">
      <div v-for="(slot, keySlot) in subgroup" :class="slot" :key="keySlot">
        <slot :name="keySlot"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modal.table.cell.component',
    props: {
      group: Array,
      position: String,
      noTouch: Boolean
    }
  }
</script>

<style lang="scss" scoped>
  .modal-table-cell{
    margin: 2px 0;
    width: 100%;
    min-height: 30px;
    padding: 14px 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    cursor: pointer;
    overflow: hidden;
    border-radius: 12px;
    transition: .15s all linear;
    .cell-group{
      display: flex;
      align-items: center;
    }

    &.position-{
      &between{
        justify-content: space-between;
      }
      &full{
        .cell-group{
          width: 100%;
        }
      }
    }

    &:hover{
      background-color: rgba(0, 0, 0, .15);
    }

    &.active{
      background-color: rgba(0, 0, 0, .3);
    }

    &.noTouch{
      cursor: default;
      background-color: transparent;
    }

  }
</style>