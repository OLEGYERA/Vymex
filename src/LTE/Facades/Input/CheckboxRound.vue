<template>
  <div class="facade-input-checkbox-round" tabindex="0"
       :checked="model" :disable="disable"
       @click="inputCheckboxClick">
  </div>
</template>

<script>
  export default {
    name: 'Facade.Input.Checkbox',
    props: {
      model: Boolean,
      disable: Boolean,
    },
    methods: {
      inputCheckboxClick(){
        if(!this.disable) this.$emit('onClick')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-input-checkbox-round{
    width: 24px;
    height: 24px;
    border: 2px solid $grey-scale-300;
    background-color: transparent;
    transition: .2s all ease;
    box-sizing: border-box;
    border-radius: 50%;
    cursor: pointer;

    &:hover{
      border-color: $blue;
    }

    &[disable]{
      cursor: default;
      border-color: $grey-scale-300;
    }

    &[checked]{
      background-color: #fff;
      border: $blue solid 6px;
    }
  }
</style>