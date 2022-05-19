<template>
  <div class="resource-worker-files-view">
    <comeback @onClick="$router.back()"/>
    <div class="header-text-group">
      <title-base>Рабочие файлы</title-base>
      <icon-points-vertical/>
    </div>
    <input-search :placeholder="'Поиск'"/>

    <list-header title="папки" :title-count="folders.length" @onAction="modalCreateStatus = true"/>

    <modal-base :status="modalCreateStatus"
                @onClose="modalCreateStatus = false"
                class="modal-create-folder"
                @onOk="createFolder">
      <template #title>
        Создать новую папку
      </template>
      <template #description>
        В поле ниже укажите название папки
      </template>
      <template #content>
        <input-base :model="newFolder.name" @onInput="newFolder.name = $event" labeled :placeholder="'Название папки'"/>
      </template>
      <template #button-accept>
        Сохранить
      </template>
    </modal-base>

    <div class="resource-folders" v-if="folders.length">
      <folder-ui
          v-for="(folder, folderKey) in folders"
          :folder="folder"
          :key="folderKey"
          @onClick="changePage(folder.id)"/>
    </div>

    <div v-else class="background-plate background-plate-folder">
      <img class="image" src="@/assets/img/my/empty-folder.svg">
      Папок нет
    </div>

    <list-header :sort="files.length > 1" title="Файлы" :title-count="files.length" @onSort="modalSortStatus = true"/>

    <modal-base :status="modalSortStatus" @onClose="modalSortStatus = false" @onOk="sortFiles">
      <template #title>Сортировка</template>
      <template #content>
        <button-checkbox
            v-for="(value, valueKey) in modalValues"
            :key="valueKey"
            :title="value"
            :selected="activeButton === valueKey"
            @onCheckbox="setNewValue(valueKey)"/>
      </template>
      <template #button-accept>Применить</template>
    </modal-base>

    <div v-if="!!files.length">
      <file-ui v-for="(file, key) in files" :file="file" :key="key" :actions="actions" @getActiveValue="actionListChange"/>
    </div>

    <div v-else class="background-plate">
      <img class="image" src="@/assets/img/my/empty-file.svg">
      Файлов нет
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
  import Comeback from "@Facade/Navigation/Comeback";
  import InputSearch from "@Facade/Input/Search";
  import TitleBase from "@Facade/Title/Base"
  import ModalBase from "@Facade/Modal/Base"
  import ButtonCheckbox from "@Facade/Button/Checkbox"
  import InputBase from "@Facade/Input/Base";
  import ListHeader from "@Facade/Navigation/ListHeader";

  import {FileUi, FolderUi} from '@Providers'
  // import ModalActionList from "@Facade/Modal/ActionList"

  import {mapGetters} from "vuex";

  export default {
    name: 'vx.resource.worker.files',
    components: {
      FolderUi,
      Comeback,
      FileUi,
      TitleBase,
      InputSearch,
      ModalBase,
      ButtonCheckbox,
      InputBase,
      ListHeader
      // ModalActionList
    },

    data() {
      return{
        modalSortStatus: false,
        modalCreateStatus: false,
        modalValues: ['По дате (сначала новое)', 'По дате (сначала старое)', 'По размеру файлов'],
        activeButton: 2,
        actions: ['Редактировать', 'Открыть доступ', 'Переместить'],
        // files: [],
        newFolder: {
          name: '',
          workerId: 7,
          parent: null
        },

      }
    },
    computed: {
      ...mapGetters({
        workFolder: 'Resources/getWorkFolder',

        structure: 'Resources/getStructure',
      }),
      folders(){
        return this.workFolder.folders
      },
      files() {
        return this.workFolder.files
      }
    },
    methods:{
      changePage(id) {
        this.$core.execViaComponent('Resources', 'getFolder', id)
        this.$router.push({name: 'vx.resource.new.folder'})
      },
      actionListChange(key) {
        console.log(key)
        this.actionListStatus = false;
        if(key === 1){
          this.showSidebar()
        }
      },
      setNewValue(id) {
        this.activeButton = id
      },
      sortFiles(){
        this.modalStatus=false;
        if(this.activeButton===0){
          this.files.sort((a, b)=> +b.content.date.split('.').reverse().join('') - +a.content.date.split('.').reverse().join(''))
        }
        if(this.activeButton===1){
          this.files.sort((a, b)=> +a.content.date.split('.').reverse().join('') - +b.content.date.split('.').reverse().join(''))
        }
        if(this.activeButton===2){
          this.files.sort((a, b)=> a.content.size.replace(',', '.') - b.content.size.replace(',', '.'))
        }
      },
      createFolder(){
        if(!this.newFolder.name) {
          this.newFolder.name = 'Новая папка'
        }
        this.modalCreateStatus = false
        this.$core.execViaComponent('Resources', 'createFolder', this.newFolder)

        this.newFolder.name = ''
      },
      // create() {
      //   console.log(this.modalCreateStatus)
      //   this.modalCreateStatus = true
      //   console.log(this.modalCreateStatus)
      // }
    },
    created(){
      this.$core.execViaComponent('Resources', 'getWorkFolder', 7)
    },
    mounted() {
      console.log(this.modalCreateStatus, this.modalValues)
    }
  }
</script>

<style lang="scss" scoped>
  .resource-worker-files-view {
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
    .resource-folders{
      margin-bottom: rem(20);
    }
    .facade-navigation-list-header {
      height: 36px;
      margin-bottom: 4px;
    }
    .resource-file-ui {
      margin-bottom: 8px;
    }
    .modal-create-folder{
      .facade-input-base{
        margin-bottom: 12px;
      }
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