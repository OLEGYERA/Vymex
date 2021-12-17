<template>
  <div class="modal-dropdown" :class="`position-${position}`" v-if="status">
    <template v-for="(item, keyItem) in DropdownItems">
      <div class="dropdown-item"
           :key="keyItem"
           :class="{active: DropdownCursor === keyItem}"
           @click="selectDropdownItemByClick(keyItem)"
      >
        {{item.value}}
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'modal.dropdown.component',
  props: {
    status: Boolean,
    DropdownCursor: Number,
    DropdownItems: Array,
    position: String
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    selectDropdownItemByClick(keyItem){
      this.$emit('onClick', keyItem)
    }
  }
}
</script>


<style lang="scss" scoped>
  .modal-dropdown{
    margin-top: 6px;
    width: 100%;
    min-height: 26px;
    padding: 2px;
    position: absolute;
    box-sizing: border-box;
    background-color: $grey-scale-500;
    box-shadow: 0 3px 12px rgba(0, 0, 0, .5);

    .dropdown-item{
      color: #fff;
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      padding: 4px 6px;
      cursor: pointer;
      border-radius: 4px;
      width: 100%;
      box-sizing: border-box;

      &:hover{
        background-color: rgba(0, 0, 0, .15);
      }

      &.active{
        background-color: rgba(0, 0, 0, .3);
      }
    }

    &.position-{
      &start{
        .dropdown-item{
          text-align: left;
        }
      }
    }
  }
</style>