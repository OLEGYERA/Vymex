<template>
  <div class="facade-button-add" :disable="disable" @click="buttonAddClick">
    <icon-add/>
  </div>
</template>

<script>
export default {
  name: 'Facade.Button.Add',
  props: {
    disable: Boolean,
  },
  methods: {
    buttonAddClick(){
      if(!this.disable) this.$emit('onClick')
    }
  }
}
</script>


<style lang="scss" scoped>
  .facade-button-add{
    width: 24px;
    height: 24px;
    border-radius: 8px;
    background-color: $grey-scale-400;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .icon-add{
      height: 16px;
      color: #fff;
    }

    //&:hover{
    //  background-color: $blue-scale-300;
    //}
    //
    //&[disable]{
    //  cursor: not-allowed;
    //  background-color: $grey-scale-500;
    //  color: $grey-scale-300;
    //}
  }
</style>