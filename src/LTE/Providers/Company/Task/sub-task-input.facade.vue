<template>
  <div class="company-sub-task-input-facade" :hide="!subTaskActive">
    <input-base :model="model"
                :hide="!subTaskActive"
                ref="sub-task-input-ref"
                @onInput="$emit('onInput', $event)"
                @onBlur="toggleHideSubTask(false)"
                @click.native="toggleHideSubTask(true)"/>
    <button-clear/>
  </div>
</template>

<script>
  /*eslint-disable*/
  import InputBase from '@Facade/Input/Base'
  import ButtonClear from '@Facade/Button/Clear'

  export default {
    name: 'Providers.Company.Task.SubTaskInput.Facade',
    components: {
      InputBase, ButtonClear
    },
    props: {
      model: {
        validator: function (value) {
          return value === null || typeof value === "string" || typeof value === "number";
        }
      },
    },
    mounted() {
      this.subTaskActive = this.model.length === 0
    },
    data: () => ({
      subTaskActive: false
    }),
    methods: {
      toggleHideSubTask(status){
        if(status && this.subTaskActive) return true;
        this.subTaskActive = status;
        console.log(status)
        if(status){
          setTimeout(() => this.$refs['sub-task-input-ref'].$refs['facade-input-base-ref'].focus(), 50)
        }

      }
    }

  }
</script>

<style lang="scss" scoped>
  .company-sub-task-input-facade{
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    .facade-button-clear{
      position: absolute;
      right: 2px;
    }

    &[hide]{
      .facade-input-base {
        ::v-deep input{
          cursor: text;
        }
      }
    }
  }
</style>
