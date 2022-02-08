<template>
  <div class="facade-plate-checkbox" :disable="disable">
    <div class="plate-checkbox-body" @click="checkboxHandler">
      <text-base>{{title}}</text-base>
      <input-checkbox :model="model" :disable="disable"/>
    </div>
  </div>
</template>

<script>
  import TextBase from '@Facade/Text/Base'
  import InputCheckbox from '@Facade/Input/Checkbox'

  export default {
    name: 'Facade.Plate.Checkbox',
    props: {
      title: {
        type: String,
        required: true
      },
      model: Boolean,
      disable: Boolean
    },
    components: {TextBase, InputCheckbox},
    methods: {
      checkboxHandler(){
        if(!this.disable) this.$emit('onChecked', !this.model);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-plate-checkbox{
    border-radius: 12px;
    background: $grey-scale-400;
    .plate-checkbox-body{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      padding: 26px 16px;
      box-sizing: border-box;
      cursor: pointer;
      .facade-text-base{
        color: #fff;
      }
    }
    &[disable]{
      opacity: .5;
      cursor: default;
      .plate-checkbox-body{
        cursor: default;
      }
    }
  }

</style>