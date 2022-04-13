<template>
  <div class="resource-intangible-object-ui" @click="$emit('onClick')">
    <div class="object-main-plate">
      <div class="object-icon">
        <img src="@/assets/img/my/notion.svg">
      </div>
      <div class="object-text-group">
        <text-base>{{object.name}}</text-base>
        <title-caption>{{object.login}}</title-caption>
      </div>
    </div>
    <icon-points-vertical @click.native="$emit('onClick')"/>
  </div>
</template>

<script>
  import TextBase from '@Facade/Text/Base'
  import TitleCaption from '@Facade/Title/Caption'

  export default {
    name: 'Providers.Company.Resource.IntangibleObject.Ui',

    components: {
      TextBase,
      TitleCaption,
    },
    props: {
      object: Object,
    },
  }
</script>
<style lang="scss" scoped>
  .resource-intangible-object-ui {
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
    .object-main-plate {
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
      .object-text-group{
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