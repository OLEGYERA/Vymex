<template>
  <div class="facade-navigation-close">
    <title-caption @click.native="$emit('onClick')">Закрыть <icon-error/></title-caption>
  </div>
</template>

<script>
  import TitleCaption from '@Facade/Title/Caption'
  import IconError from '@Icon/Error'

  export default {
    name: 'Facades.Navigation.Close',
    components: {
      TitleCaption,
      IconError
    },

  }
</script>

<style lang="scss" scoped>
  .facade-navigation-close{
    width: 100%;
    margin-bottom: rem(28);
    text-align: right;
    .facade-title-caption{
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      transition: .15s all linear;
      .icon-error{
        height: 14px;
        margin-left: 12px;
        ::v-deep svg{
          width: 10px;
          height: 10px;
        }
      }
      &:hover{
        color: #fff;
      }
    }
  }
</style>