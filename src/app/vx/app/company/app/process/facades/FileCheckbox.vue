<template>
  <div class="facade-resource-file">
    <div class="file-main">
      <div class="file-image">
        <img v-if="file.type === 'zip'" src="@/assets/img/my/zip.svg">
        <img v-else src="@/assets/img/my/file.svg">
        <icon-group v-if="file.group"/>
      </div>
      <div>
        <text-base>{{file.title}}</text-base>
        <title-caption>{{content}}</title-caption>
      </div>
    </div>
    <checkbox :model="file.checked" @onClick="$emit('onClick', index)"/>
  </div>
</template>

<script>
import TextBase from '@Facade/Text/Base'
import TitleCaption from '@Facade/Title/Caption'
import IconGroup from '@Icon/Group'
import Checkbox from "@Facade/Input/Checkbox";

export default {
  name: 'Facade.Resource.File.Checkbox',
  components: {
    TextBase,
    TitleCaption,
    IconGroup,
    Checkbox
  },
  props: {
    file: Object,
    index: Number
  },
  computed: {
    content() {
      return `${this.file.content.size} MB ${this.file.content.date}`
    },
  },
}
</script>

<style lang="scss" scoped>
.facade-resource-file {
  position: relative;
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
    .file-image {
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
}
</style>