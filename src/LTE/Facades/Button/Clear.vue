<template>
  <div class="facade-button-clear" :disable="disable" @click="buttonAddClick">
    <icon-error/>
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
  .facade-button-clear{
    width: 24px;
    height: 24px;
    border: 2px solid $grey-scale-300;
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .icon-error{
      color: $grey-scale-200;
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