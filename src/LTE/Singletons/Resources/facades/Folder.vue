<template>
  <div class="facade-resource-folder">
    <img class="folder-image" src="@/assets/img/my/folder.svg">
    <div class="folder-info">
      <text-base><slot name="title">Ресурсы C.Е.</slot></text-base>
      <title-caption><slot name="folder-content"></slot></title-caption>
    </div>
  </div>
</template>

<script>
import TextBase from '@Facade/Text/Base'
import TitleCaption from '@Facade/Title/Caption'
export default {
  name: 'Facade.Resource.Folder',
  components: {
    TextBase,
    TitleCaption
  }
}
</script>

<style lang="scss" scoped>
  .facade-resource-folder {
    padding: 12px 0;
    display: flex;
    .folder-image {
      margin-right: 12px;
    }
    .facade-text-base {
      margin-bottom: 4px;
      color: #fff;
    }
  }
</style>