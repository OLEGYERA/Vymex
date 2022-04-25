<template>
  <div class="resource-worker-files-view">
    <comeback @onClick="$router.push({name: 'vx.resource'})"/>
    <div class="header-text-group">
      <title-base>Рабочие файлы</title-base>
      <icon-points-vertical/>
    </div>
    <input-search :placeholder="'Поиск'"/>

    <header-add @create="modalCreateStatus=true">
      <template #header-title>папки</template>
      <template #header-amount>{{folders.length}}</template>
    </header-add>

    <modal-base :status="modalCreateStatus"
                @onClose="modalCreateStatus=false"
                class="modal-create-folder"
                @onOk="createFolder">
      <template #title>
        Создать новую папку
      </template>
      <template #description>
        В поле ниже укажите название папки
      </template>
      <template #content>
        <input-base :model="newFolder.title" @onInput="saveFolderName($event)" labeled :placeholder="'Название папки'"/>
      </template>
      <template #button-accept>
        Сохранить
      </template>
    </modal-base>

    <div class="resource-folders">
      <folder-ui
          v-for="(folder, folderKey) in folders"
          :folder="folder"
          :key="folderKey"
          @onClick="changePage"/>
    </div>
    <header-add sort @sortFiles="modalStatus= true">
      <template #header-title>Файлы</template>
      <template #header-amount>{{files.length}}</template>
    </header-add>

    <modal-base :status="modalStatus" @onClose="modalStatus=false" @onOk="sortFiles">
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

    <file-ui v-for="(file, key) in files" :file="file" :key="key" :actions="actions" @getActiveValue="actionListChange"/>
  </div>
</template>

<script>
  import Comeback from "@Facade/Navigation/Comeback";
  import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd"; //// костыль
  import InputSearch from "@Facade/Input/Search";
  import TitleBase from "@Facade/Title/Base"
  import ModalBase from "@Facade/Modal/Base"
  import ButtonCheckbox from "@Facade/Button/Checkbox"
  import InputBase from "@Facade/Input/Base";
  import {FileUi, FolderUi} from '@Providers'
  // import ModalActionList from "@Facade/Modal/ActionList"

  import {mapMutations} from "vuex";

  export default {
    name: 'vx.resource.worker.files',
    components: {
      FolderUi,
      Comeback,
      HeaderAdd,
      FileUi,
      TitleBase,
      InputSearch,
      ModalBase,
      ButtonCheckbox,
      InputBase,
      // ModalActionList
    },
    data() {
      return{
        modalStatus: false,
        modalCreateStatus: false,
        modalValues: ['По дате (сначала новое)', 'По дате (сначала старое)', 'По размеру файлов'],
        activeButton: 2,
        actions: ['Редактировать', 'Открыть доступ', 'Переместить'],
        folders: [
          {
            id: 1,
            title: 'Новая папка',
            content: {
              folders: 3,
              files: 2
            }
          },
        ],
        files: [
          {
            title : 'doc.vmx',
            content: {
              size: '3,4',
              date: '15.10.2019'
            },
            type: null,
            group: true,
          },
          {
            title : 'doc.vmx',
            content: {
              size: '2,1',
              date: '02.09.2000'
            },
            type: null,
            group: true,
          },
          {
            title : 'doc.zip',
            content: {
              size: '4',
              date: '14.12.2022'
            },
            type: 'zip',
            group: true,
          },
          {
            title : 'doc.vmx',
            content: {
              size: '5,6',
              date: '01.04.2019'
            },
            type: null,
            group: true,
          },
          {
            title : 'doc.zip',
            content: {
              size: '0,9',
              date: '30.09.2016'
            },
            type: 'zip',
            group: true,
          },
        ],
        newFolder: {
          id: null,
          title: null,
          content: {
            folders: null,
            files: null,
          }
        }
      }
    },
    methods:{
      ...mapMutations({
        showSidebar: 'Resources/showSidebarFolderAccess',
      }),
      changePage({id}) {
        if(id === 1){
          this.$router.push({name: 'vx.resource.new.folder'})
        }
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
        this.modalCreateStatus = false
        // let newFolders = 0;
        if(!this.newFolder.title){
          // this.folders.forEach(folder => {
          //   if(folder.includes('Новая папка')){
          //     newFolders++
          //   }
          // })
          this.newFolder.title = `Новая папка`
        }
        this.folders.push(this.newFolder)
      },
      saveFolderName(data){
        this.newFolder.title = data
      }
    },
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
    .facade-header-add {
      padding: rem(8) 0;
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
  }
</style>