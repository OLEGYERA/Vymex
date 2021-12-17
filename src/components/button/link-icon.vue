<template>
  <div class="button-link-icon" @click="buttonLinkIconClick">
    <div class="icon-box"><slot name="icon"/></div>
    <div class="link-title"><slot name="title"/></div>
  </div>
</template>

<script>
  export default {
    name: 'button.link.icon.component',
    props: {
      linkName: String,
    },
    methods: {
      buttonLinkIconClick(){
        if(this.linkName)
          this.$router.push({name: this.linkName})
      }
    }
  }
</script>


<style lang="scss" scoped>
  .button-link-icon{
    display: flex;
    align-items: center;
    color: $grey-scale-200;
    padding: 12px 18px;
    box-sizing: border-box;
    cursor: pointer;
    transition: .1s all linear;
    border-radius: 8px;
    .icon-box{
      margin-right: 10px;
    }
    .link-title{
      font-size: 15px;
      line-height: 20px;
      font-weight: 400;
    }

    &:hover{
      background-color: $grey-scale-500;
    }
  }
</style>