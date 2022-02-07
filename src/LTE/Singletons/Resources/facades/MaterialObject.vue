<template>
  <div class="facade-resource-material-object">
    <div class="object-main">
      <div class="object-info">
        <text-base><slot name="title">{{object.name}}.</slot></text-base>
        <title-caption><slot name="folder-content">{{object.number}}</slot></title-caption>
      </div>
      <div class="object-user">{{object.user}}</div>
    </div>
    <icon-points-vertical/>
  </div>
</template>

<script>
import TextBase from '@Facade/Text/Base'
import TitleCaption from '@Facade/Title/Caption'
import IconPointsVertical from "@Icon/PointsVertical"

export default {
  name: 'Facade.Resource.Folder',
  components: {
    TextBase,
    TitleCaption,
    IconPointsVertical
  },
  props: {
    object: Object,
  }
}
</script>

<style lang="scss" scoped>
.facade-resource-material-object {
  padding: 12px 6px 12px 16px;
  display: flex;
  justify-content: space-between;
  border-radius: 12px;
  background-color: $grey-scale-400;
  .object-main {
    display: inherit;
    .object-info{
      width: 232px;
      margin-right: 12px;
      .facade-text-base {
        color: #fff;
        margin-bottom: 4px;
      }
    }
    .object-user{
      font-size: 11px;
      line-height: 12px;
      height: max-content;
      color: $grey;
      padding: 2px 8px;
      border-radius: 8px;
      background-color: #F2CBF8;
    }
  }
  .icon-points {
    padding: 0 10px 10px;
    color: #fff;
    cursor: pointer;
  }
}
</style>