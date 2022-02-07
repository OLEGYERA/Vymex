<template>
  <div class="facade-resource-folder">
    <div class="folder-image">
      <img v-if="trash" src="@/assets/img/my/trash.svg">
      <img v-else src="@/assets/img/my/folder.svg">
      <icon-group v-if="group"/>
    </div>
    <div class="folder-info">
      <text-base><slot name="title"/></text-base>
      <title-caption><slot name="folder-content"/></title-caption>
    </div>
  </div>
</template>

<script>
import TextBase from '@Facade/Text/Base'
import TitleCaption from '@Facade/Title/Caption'
import IconGroup from '@Icon/Group'
export default {
  name: 'Facade.Resource.Folder',
  components: {
    TextBase,
    TitleCaption,
    IconGroup
  },
  props: {
    group: Boolean,
    trash: Boolean,
  }
}
</script>

<style lang="scss" scoped>
  .facade-resource-folder {
    padding: 12px 0;
    display: flex;
    align-items: center;
    border-bottom: rgba($grey-scale-400, .5) solid 1px;
    cursor: pointer;
    .folder-image {
      margin-right: 12px;
      position: relative;
      .icon-group {
        position: absolute;
        color: $grey-scale-300;
        bottom: -4px;
        left: 16px;
      }
    }
    .facade-text-base {
      margin-bottom: 4px;
      color: #fff;
    }
  }
</style>