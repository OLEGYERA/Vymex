<template>
  <div class="facade-resource-folder" @click="$emit('getId', {id: folder.id})">
    <div class="folder-image">
      <img v-if="folder.trash" src="@/assets/img/my/trash.svg">
      <img v-else src="@/assets/img/my/folder.svg">
      <icon-group v-if="folder.group"/>
    </div>
    <div class="folder-info">
      <text-base>{{folder.title}}</text-base>
      <title-caption>{{content}}</title-caption>
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
    folder: {
      type: Object,
      required: true
    }
  },
  computed: {
    content() {
      let folders = '';
      let files = '';
      if(!this.folder.content.folders && !this.folder.content.files && !this.folder.content.objects){
        return 'Пусто'
      }
      if(this.folder.content.objects) {
        if(this.folder.content.objects >10 && this.folder.content.objects < 21){
          return `${this.folder.content.objects} объектов`
        }
        if (Number(String(this.folder.content.objects).slice(-1)) === 1) {
          return `${this.folder.content.objects} объект`
        }
        if (Number(String(this.folder.content.objects).slice(-1)) < 5){
          return `${this.folder.content.objects} объекта`
        }
          return `${this.folder.content.objects} объектов`
      }
      if (this.folder.content.folders){
        if(this.folder.content.folders >10 && this.folder.content.folders < 21){
          folders = `${this.folder.content.folders} папок`
        } else if (Number(String(this.folder.content.folders).slice(-1)) === 1) {
          folders = `${this.folder.content.folders} папка`
        } else if (Number(String(this.folder.content.folders).slice(-1)) < 5){
          folders = `${this.folder.content.folders} папки`
        } else {
          folders = `${this.folder.content.folders} папок`
        }
      }
      if(this.folder.content.files) {
        if(this.folder.content.files >10 && this.folder.content.files < 21) {
          files = `${this.folder.content.files} папок`
        }else if (Number(String(this.folder.content.files).slice(-1)) === 1) {
          files = `${this.folder.content.files} файл`
        } else if (Number(String(this.folder.content.files).slice(-1)) < 5){
          files = `${this.folder.content.files} файла`
        } else {
          files = `${this.folder.content.files} файлов`
        }
      }
      if(this.folder.content.processes) {
        if (Number(String(this.folder.content.processes).slice(-1)) === 1) {
          files = `${this.folder.content.processes} процесс`
        } else if (this.folder.content.processes > 5 && this.folder.content.processes < 21){
          files = `${this.folder.content.processes} процессов`
        } else if (Number(String(this.folder.content.processes).slice(-1)) < 5){
          files = `${this.folder.content.processes} процессa`
        } else {
          files = `${this.folder.content.processes} процессов`
        }
      }
      return folders && files ? `${folders}, ${files}` : `${folders} ${files}`
    }
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