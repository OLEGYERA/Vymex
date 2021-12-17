<template>
  <div class="input-search">
    <icon-search/>
    <input type="text" :placeholder="placeholder" v-model="searchModel">
  </div>
</template>

<script>
  import debounce from 'lodash/debounce';
  import IconSearch from '@/components/icon/search'

  export default {
    name: 'input.search.component',
    props: {
      placeholder: String
    },
    components: {IconSearch},
    data(){
      return{
        searchModel: null
      }
    },
    watch: {
      searchModel: debounce(function(newVal){
        this.$emit('onSearch', newVal)
      }, 200)
    }
  }
</script>


<style lang="scss" scoped>
  .input-search{
    width: 100%;
    height: 40px;
    border-radius: 30px;
    border: 1px solid $grey-scale-300;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    .icon-search{
      height: 100%;
      width: 40px;
      min-width: 40px;
      color: $grey-scale-200;
    }
    input{
      width: 100%;
      height: 100%;
      padding: 12px 12px 12px 0;
      box-sizing: border-box;
      background-color: transparent;
      border: 0;
      outline: none;
      font-size: 16px;
      line-height: 20px;
      color: #fff;
      font-weight: 400;
      &::placeholder{
        color: $grey-scale-200;
      }
    }
  }
</style>