<template>
  <div class="facade-resource-intangible-object">
    <div class="object-main">
      <div class="object-icon">
        <img src="@/assets/img/my/notion.svg">
      </div>
      <div class="object-info">
        <text-base><slot name="title">{{object.name}}.</slot></text-base>
        <title-caption><slot name="folder-content">{{object.login}}</slot></title-caption>
      </div>
    </div>
    <icon-points-vertical @click.native="$emit('onClick')"/>
  </div>
</template>
@asset
<script>
  import TextBase from '@Facade/Text/Base'
  import TitleCaption from '@Facade/Title/Caption'
  import IconPointsVertical from "@Icon/PointsVertical"

  export default {
    name: 'Facade.Resource.Intangible.Object',
    components: {
      TextBase,
      TitleCaption,
      IconPointsVertical
    },
    props: {
      object: Object,
    },
  }
</script>
<style lang="scss" scoped>
  .facade-resource-intangible-object {
    width: 100%;
    box-sizing: border-box;
    padding: rem(8);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 12px;
    background-color: $grey-scale-400;
    transition: background-color .3s;
    cursor: pointer;
    &:hover{
      background-color: $grey-scale-300;
    }
    .object-main {
      display: inherit;
      align-items: inherit;
      .object-icon{
        height: 36px;
        width: 36px;
        background-color: $gray-scale-100;
        display: inherit;
        justify-content: center;
        align-items: center;
        margin-right: 12px;
        border-radius: 50%;
      }
      .object-info{
        .facade-text-base {
          color: #fff;
        }
      }
    }
    .icon-points-vertical {
      padding: rem(6);
      color: #fff;
      cursor: pointer;
    }
  }
</style>