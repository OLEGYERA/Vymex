<template>
  <div class="facade-button-checkbox" @click="$emit('onCheckbox')" :class="{active: selected}">
    <text-base>{{ title }}</text-base>
    <div class="radiobutton"></div>
  </div>
</template>

<script>
  import TextBase from "@Facade/Text/Base";

  export default {
    name: '',
    components: {
      TextBase
    },
    props: {
      title: {
        type: String,
        required: true
      },
      selected: Boolean
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .facade-button-checkbox {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    padding: 12px 16px;
    border-radius: 8px;
    background-color: $grey-scale-500;
    cursor: pointer;
    &:hover {
      background-color: rgba($grey-scale-400, .4);
    }
    .radiobutton {
      width: 20px;
      height: 20px;
      box-sizing: border-box;
      border-radius: 50%;
      border: $grey-scale-200 solid 2px;
      background-color: transparent;
    }

    &.active{
      background-color: $grey-scale-400;
      .facade-text-base {
        color: #fff;
        font-weight: 600;
      }
      .radiobutton{
        border: $blue-scale-300 solid 5px;
        background-color: #fff;
      }
    }
  }
</style>