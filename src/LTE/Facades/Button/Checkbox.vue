<template>
  <div>
    <div class="disable-time"
         v-for="(value, valueKey) in values"
         :key="valueKey"
         @click="$emit('getValue', {key: valueKey})"
         :class="{active: valueKey === selectedOption}">
      <text-base>{{ value }}</text-base>
      <div class="radiobutton"></div>
    </div>
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
      values: Array,
      selectedOption: Number
    },
    mounted() {
      console.log(this.selectedOption)
    }
  }
</script>

<style lang="scss" scoped>
  .disable-time {
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