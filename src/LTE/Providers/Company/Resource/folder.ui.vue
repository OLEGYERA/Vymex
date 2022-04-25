<template>
<!--  @click.left="$emit('chooseAction', {id: folder.id})"-->
  <div class="resource-folder-ui" @click.right.prevent="openModal" @click.left.stop="$emit('onClick', {id: folder.id})">
    <div class="folder-image">
      <img v-if="folder.trash" src="@/assets/img/my/trash.svg">
      <img v-else src="@/assets/img/my/folder.svg">
      <icon-group v-if="folder.group"/>
    </div>
    <div class="folder-text-group">
      <text-base>{{folder.title}}</text-base>
      <title-caption>{{content}}</title-caption>
    </div>
    <modal-action-list :status="modalStatus" :actions="modalValues" @onClose="onClose"/>
  </div>
</template>

<script>
  import TextBase from '@Facade/Text/Base'
  import TitleCaption from '@Facade/Title/Caption'
  import IconGroup from '@Icon/Group'
  import ModalActionList from "@Facade/Modal/ActionList"

  export default {
    name: 'Providers.Company.Resource.Folder.Ui',
    components: {
      TextBase,
      TitleCaption,
      IconGroup,
      ModalActionList
    },
    data(){
      return{
        modalValues: ['Переименовать', 'Открыть доступ'],
        modalStatus: false,
      }
    },
    props: {
      folder: {
        type: Object,
        required: true
      }
    },
    methods:{
      openModal(){
        this.modalStatus = true;
      },
      onClose(e){
        e.preventDefault();
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
          if(this.folder.content.objects >4 && this.folder.content.objects < 21){
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
          if(this.folder.content.folders >4 && this.folder.content.folders < 21){
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
          if(this.folder.content.files >4 && this.folder.content.files < 21) {
            files = `${this.folder.content.files} файлов`
          }else if (Number(String(this.folder.content.files).slice(-1)) === 1) {
            files = `${this.folder.content.files} файл`
          } else if (Number(String(this.folder.content.files).slice(-1)) < 5){
            files = `${this.folder.content.files} файла`
          } else {
            files = `${this.folder.content.files} файлов`
          }
        }
        return folders && files ? `${folders}, ${files}` : `${folders} ${files}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  .resource-folder-ui {
    position: relative;
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
    .folder-text-group{
      .facade-text-base {
        margin-bottom: 4px;
        color: #fff;
      }
    }
    .facade-modal-action-list::v-deep {
      right: 15px;
      .action-list-body{
        transform: translateX(-100%);
      }
    }
  }
</style>