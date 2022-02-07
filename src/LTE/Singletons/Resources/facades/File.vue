<template>
  <div class="facade-resource-file">
    <div class="file-main">
      <div class="folder-image">
        <img v-if="file.type === 'zip'" src="@/assets/img/my/zip.svg">
        <img v-else src="@/assets/img/my/file.svg">
        <icon-group v-if="file.group"/>
      </div>
      <div class="folder-info">
        <text-base><slot name="title">{{file.title}}.</slot></text-base>
        <title-caption><slot name="folder-content">{{file.content}}</slot></title-caption>
      </div>
    </div>
    <icon-points-vertical/>
  </div>
</template>

<script>
import TextBase from '@Facade/Text/Base'
import TitleCaption from '@Facade/Title/Caption'
import IconGroup from '@Icon/Group'
import IconPointsVertical from "@Icon/PointsVertical"

export default {
  name: 'Facade.Resource.Folder',
  components: {
    TextBase,
    TitleCaption,
    IconGroup,
    IconPointsVertical
  },
  props: {
    file: Object,
  }
}
</script>

<style lang="scss" scoped>
.facade-resource-file {
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  background-color: $grey-scale-400;
  cursor: pointer;
  .file-main {
    display: inherit;
    align-items: inherit;
    .folder-image {
      height: 36px;
      margin-right: 12px;
      position: relative;
      .icon-group {
        position: absolute;
        color: $grey-scale-300;
        height: 16px;
        bottom: 0;
        right: 0;
      }
    }
    .facade-text-base {
      color: #fff;
    }
  }
  .icon-points {
    padding: 0 10px;
    color: #fff;
    height: 16px;
  }
}
</style>