<template>
  <div class="button-base"
       :class="[BtnName, {disabled: !status}]"
       @click="buttonBaseClick"
  >
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'button.base.component',
    props: {
      BtnName: String,
      status: Boolean,
    },
    methods: {
      buttonBaseClick(){
        if(this.status)
          this.$emit('onClick')
      }
    }
  }
</script>


<style lang="scss" scoped>
  .button-base{
    width: 100%;
    border-radius: 30px;
    padding: 16px 0;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: $blue;
    color: #fff;
    line-height: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: .2s all linear;
    
    &:hover{
      background-color: $blue-scale-200;
    }

    &.disabled{
      cursor: not-allowed;
      background-color: $grey-scale-500;
      color: $grey-scale-300;
    }
  }
</style>