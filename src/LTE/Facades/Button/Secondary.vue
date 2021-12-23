<template>
  <div class="facade-button-secondary" @click="buttonSecondaryClick">
    <title-sub><slot/></title-sub>
  </div>
</template>

<script>
  import TitleSub from '@Facade/Title/Sub'
  export default {
    name: 'Facade.Button.Secondary',
    props: {
      disable: Boolean,
    },
    components: {
      TitleSub
    },
    methods: {
      buttonSecondaryClick(){
        if(!this.disable) this.$emit('onClick')
      }
    }
  }
</script>


<style lang="scss" scoped>
  .facade-button-secondary{
    border-radius: 30px;
    padding: 10px 30px;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: $blue-scale-700;
    cursor: pointer;
    .facade-title-sub{
      color: $blue;
    }

  }
</style>