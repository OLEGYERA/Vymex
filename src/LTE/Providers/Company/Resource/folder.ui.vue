<template>
  <div class="resource-folder-ui"
       @click.right.prevent.stop="statusAction = true;"
       @click.left.stop="$emit('onClick')">

    <div class="folder-image">
      <img v-if="trash" src="@/assets/img/my/trash.svg">
      <img v-else src="@/assets/img/my/folder.svg">
      <icon-group v-if="folder.isShared"/>
    </div>

    <div class="folder-text-group">
      <text-base>{{folder.name}}</text-base>
      <title-caption>{{content}}</title-caption>
    </div>

    <modal-action-list :status="statusAction"
                       :actions="modalValues"
                       v-if="folder.id"
                       @onDelete="deleteFolder"
                       @onList="performAction"
                       @onClose="statusAction = false"/>

    <modal-base :status="statusBaseRename"
                @onClose="statusBaseRename = false"
                class="modal-create-folder"
                @onOk="renameFolder">
        <template #title>
          Переименовать папку
        </template>
        <template #description>
          В поле ниже укажите новое название папки
        </template>
        <template #content>
          <input-base :model="folder.name" @onInput="folder.name = $event" labeled :placeholder="'Название папки'"/>
        </template>
        <template #button-accept>
          Сохранить
        </template>
    </modal-base>

    <sidebar-folder-access-ui v-if="folder.id" :status="statusSidebar" :folder-id="folder.id" />
  </div>
</template>

<script>
  import TextBase from '@Facade/Text/Base'
  import TitleCaption from '@Facade/Title/Caption'
  import IconGroup from '@Icon/Group'
  import ModalActionList from "@Facade/Modal/ActionList"
  import ModalBase from "@Facade/Modal/Base"
  import InputBase from "@Facade/Input/Base";
  import {SidebarFolderAccessUi} from '@Providers'

  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'Providers.Company.Resource.Folder.Ui',
    components: {
      TextBase,
      TitleCaption,
      IconGroup,
      ModalActionList,
      ModalBase,
      InputBase,
      SidebarFolderAccessUi
    },
    data(){
      return{
        modalValues: ['Переименовать', 'Открыть доступ'],
        statusAction: false,
        statusBaseRename: false
      }
    },
    props: {
      folder: {
        type: Object,
        required: true
      },
      trash: {
        type: Boolean,
        default:() => false
      },
    },
    computed: {
      ...mapGetters({
        statusSidebar: 'Resources/sidebarFolderAccessStatus',
      }),
      content() {
        let folders = '';
        let files = '';
        if(!this.folder.childFoldersCount && !this.folder.filesCount && !this.folder.objects){
          return 'Пусто'
        }
        if(this.folder.objects) {
          if(this.folder.objects >4 && this.folder.objects < 21){
            return `${this.folder.objects} объектов`
          }
          if (Number(String(this.folder.objects).slice(-1)) === 1) {
            return `${this.folder.objects} объект`
          }
          if (Number(String(this.folder.objects).slice(-1)) < 5){
            return `${this.folder.objects} объекта`
          }
          return `${this.folder.objects} объектов`
        }
        if (this.folder.childFoldersCount){
          if(this.folder.childFoldersCount >4 && this.folder.childFoldersCount < 21){
            folders = `${this.folder.childFoldersCount} папок`
          } else if (Number(String(this.folder.childFoldersCount).slice(-1)) === 1) {
            folders = `${this.folder.childFoldersCount} папка`
          } else if (Number(String(this.folder.childFoldersCount).slice(-1)) < 5){
            folders = `${this.folder.childFoldersCount} папки`
          } else {
            folders = `${this.folder.childFoldersCount} папок`
          }
        }
        if(this.folder.filesCount) {
          if(this.folder.filesCount >4 && this.folder.filesCount < 21) {
            files = `${this.folder.filesCount} файлов`
          }else if (Number(String(this.folder.filesCount).slice(-1)) === 1) {
            files = `${this.folder.filesCount} файл`
          } else if (Number(String(this.folder.filesCount).slice(-1)) < 5){
            files = `${this.folder.filesCount} файла`
          } else {
            files = `${this.folder.filesCount} файлов`
          }
        }
        return folders && files ? `${folders}, ${files}` : `${folders} ${files}`
      }
    },
    methods:{
      ...mapMutations({
        showSidebar: 'Resources/showSidebarFolderAccess',
      }),
      onClose(e){
        e.preventDefault();
      },
      deleteFolder(){
        this.$core.execViaComponent('Resources', 'moveToTrashFolder', this.folder.id)
        this.$core.execViaComponent('Resources', 'getWorkFolder', 7)
        this.$notify({text: 'Папка удалена', type: 'success', duration: 3000, speed: 500})
      },
      performAction(key){
        if (key === 0) {
          this.statusBaseRename = true
        }
        if (key === 1) {
          this.$core.execViaComponent('Resources', 'getFolderParticipants', this.folder.id)
          this.showSidebar()
        }
      },
      renameFolder() {
        this.$core.execViaComponent('Resources', 'editFolder', {name: this.folder.name, folderId: this.folder.id})
        this.statusBaseRename = false
        this.$notify({text: 'Папка переименована', type: 'success', duration: 3000, speed: 500})
      }
    },

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