<template>
  <div class="facade-input-search">
    <input type="text" :placeholder="placeholder" v-model="baseModel">
    <icon-search/>
  </div>
</template>

<script>
  import IconSearch from '@Icon/Search'
  export default {
    name: 'Facade.Input.Search',
    components: {
      IconSearch
    },
    data(){
      return {
        baseModel: ''
      }
    },
    props: {
      placeholder: String,
    },
    methods: {
      applicableCopyOfEmit(){
        this.$emit('onInput', this.baseModel)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-input-search {
    position: relative;
    width: 100%;
    height: 40px;
    input {
      width: 100%;
      height: 100%;
      padding: 10px 12px 10px 44px;
      box-sizing: border-box;
      border-radius: 30px;
      border: #4A5A6A solid 1px;
      color: #fff;
      background-color: $grey;
      font-size: 15px;
      line-height: 20px;
      outline: none;
      &::placeholder {
        color: $grey-scale-200;
      }
    }
    .icon-search {
      position: absolute;
      left: 12px;
      height: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: $grey-scale-200
    }
  }
</style>