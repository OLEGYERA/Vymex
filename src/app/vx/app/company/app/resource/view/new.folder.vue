<template>
  <div class="resources-new-folder-view">
    <comeback @onClick="exit"/>
      <div class="header-text-group">
        <title-base>{{ chosenFolder.name }}</title-base>
        <icon-points-vertical/>
      </div>
      <input-search :placeholder="'Поиск'"/>

    <list-header title="папки" :title-count="chosenFolder.childFolders.length || ''" @onAction="ac"/>

    <modal-base :status="true"
                @onClose="modalStatus = false"
                class="modal-create-folder"
                @onOk="createFolder">
      <template #title>
        Создать новую папку
      </template>
      <template #description>
        В поле ниже укажите название папки
      </template>
      <template #content>
        <input-base :model="newFolder.name" @onInput="newFolder.name = $event" labeled placeholder="Название папки"/>
      </template>
      <template #button-accept>
        Сохранить
      </template>
    </modal-base>

    <div v-if="!!chosenFolder.childFolders.length" class="resources-folders">
      <folder-ui v-for="(folder, folderKey) in chosenFolder.childFolders"
                 :folder="folder" :key="folderKey"
                 @onClick="$router.push({name: 'vx.resource.empty.folder'})"/>
    </div>

    <div v-else class="background-plate background-plate-folder">
      <img class="image" src="@/assets/img/my/empty-folder.svg">
      Папок нет
    </div>

    <list-header :sort="chosenFolder.files.length > 1" title="Файлы" :title-count="chosenFolder.files.length || ''"/>
    <div  v-if="!!chosenFolder.files.length" class="resource-files">
      <file-ui v-for="(file, key) in chosenFolder.files" :file="file" :key="key" :actions="actions"/>
    </div>

    <div v-else class="background-plate">
      <img class="image" src="@/assets/img/my/empty-file.svg">
      Файлов нет
    </div>
  </div>
</template>

<script>
  import Comeback from "@Facade/Navigation/Comeback";
  import TitleBase from "@Facade/Title/Base"
  import InputSearch from "@Facade/Input/Search";
  import ListHeader from "@Facade/Navigation/ListHeader";
  import ModalBase from "@Facade/Modal/Base"
  import InputBase from "@Facade/Input/Base";

  import {FileUi, FolderUi} from '@Providers'
  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'vx.resource.new.folder',
    components: {
      FolderUi,
      Comeback,
      FileUi,
      TitleBase,
      InputSearch, InputBase,
      ListHeader, ModalBase
    },
    data() {
      return{
        actions: ['Редактировать', 'Открыть доступ', 'Переместить'],
        newFolder: {
          name: '',
          workerId: 7,
          parent: this.chosenFolder.id
        },
        modalStatus: false
      }
    },
    computed: {
      ...mapGetters({
        chosenFolder: 'Resources/getChosenFolder'
      }),
    },
    methods: {
      ...mapMutations({
        clearChosenFolder: 'Resources/clearChosenFolder',
      }),
      exit(){
        this.$router.back()
        this.clearChosenFolder()
      },
      createFolder(){
        if(!this.newFolder.name) {
          this.newFolder.name = 'Новая папка'
        }
        this.$core.execViaComponent('Resources', 'createFolder', this.newFolder)
        this.$notify({text: 'Папка успешно создана', type: 'success', duration: 3000, speed: 500})
        this.modalCreateStatus = false
        this.newFolder.name = ''
      },
      ac(){
        this.modalStatus = true
        console.log(1111112233, this.modalStatus)
      }
    },
    beforeCreate() {
      this.$core.execViaComponent('Resources', 'getFolder', this.$route.params.id)
    }
  }
</script>

<style lang="scss" scoped>
  .resources-new-folder-view {
    width: 100%;
    .header-text-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .icon-points-vertical {
        height: 16px;
        color: #fff;
        padding: 8px 10px;
        cursor: pointer;
      }
    }
    .facade-input-search {
      margin-bottom: rem(16);
    }
    .modal-create-folder{
      .facade-input-base{
        margin-bottom: 12px;
      }
    }
    .facade-navigation-list-header{
      padding: 8px 0;
      margin-bottom: 4px;
    }
    .resources-folders {
      margin-bottom: 20px;
    }
    .resource-file-ui {
      margin-bottom: 8px;
    }

    .background-plate {
      height: 160px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: $grey-scale-500;
      border-radius: 12px;
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      color: $grey-scale-300;
      &-folder {
        margin-bottom: rem(20);
      }
      .image {
        margin-bottom: 8px;
      }
    }
  }
</style>