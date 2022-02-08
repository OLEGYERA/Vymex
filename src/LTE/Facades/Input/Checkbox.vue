<template>
  <div class="facade-input-checkbox" tabindex="0"
       :checked="model" :disable="disable"
       @click="inputCheckboxClick">
    <icon-success v-if="model"/>
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
  .facade-input-checkbox{
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid $grey-scale-300;
    background-color: transparent;
    transition: .2s all ease;
    box-sizing: border-box;
    border-radius: 8px;
    cursor: pointer;

    &:hover{
      border-color: $blue;
    }

    &[disable]{
      cursor: default;
      border-color: $grey-scale-300;
    }

    &[checked]{
      background-color: $blue;
      border-color: $blue;
      .icon-success{
        color: #fff;
      }
    }
  }
</style>