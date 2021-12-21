<template>
  <div class="facade-navigation-comeback">
    <title-caption @click.native="$emit('onClick')"><icon-arrow-left/>Назад</title-caption>
  </div>
</template>

<script>
import TitleCaption from "@/LTE/Facades/Title/Caption";
import IconArrowLeft from "@Icon/ArrowLeft";

export default {
  name: 'Facades.Navigation.Comeback',
  components: {
    TitleCaption,
    IconArrowLeft
  },
}
</script>

<style lang="scss" scoped>
  .facade-navigation-comeback{
    width: 100%;
    margin-bottom: rem(28);
    .facade-title-caption{
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      transition: .15s all linear;
      .icon-arrow-left{
        height: 14px;
        margin-right: 12px;
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