<template>
  <div class="facade-button-base" :disable="disable" @click="buttonBaseClick"><slot/></div>
</template>

<script>
  export default {
    name: 'Facade.Button.Base',
    props: {
      disable: Boolean,
    },
    methods: {
      buttonBaseClick(){
        if(!this.disable) this.$emit('onClick')
      }
    }
  }
</script>


<style lang="scss" scoped>
  .facade-button-base{
    width: 100%;
    border-radius: 30px;
    padding: 16px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $blue;
    color: #fff;
    line-height: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: .2s all ease;
    &:hover{
      background-color: $blue-scale-200;
    }
  
    &[disable]{
      cursor: not-allowed;
      background-color: $grey-scale-500;
      color: $grey-scale-300;
    }
  }
</style>