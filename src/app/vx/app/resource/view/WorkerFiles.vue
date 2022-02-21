<template>
  <div class="resource-worker-files-view">
    <comeback @onClick="$router.push({name: 'vx.resource'})"/>
    <div class="header-text-group">
      <title-base>Рабочие файлы</title-base>
      <icon-points-vertical/>
    </div>
    <input-search :placeholder="'Поиск'"/>
    <header-add>
      <template #header-title>папки</template>
      <template #header-amount>{{folders.length}}</template>
    </header-add>
    <div class="resource-folders">
      <folder v-for="(folder, folderKey) in folders" :folder="folder" :key="folderKey" @getId="changePage"/>
    </div>
    <header-add :sort="true" @sortFiles="modalStatus= true">
      <template #header-title>Файлы</template>
      <template #header-amount>{{files.length}}</template>
    </header-add>
    <modal-base :status="modalStatus" @onClose="modalStatus=false" @onOk="modalStatus=false">
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
    <file v-for="(file, key) in files" :file="file" :key="key" :items="items" @getActiveValue="actionListChange"/>
  </div>
</template>

<script>
  import Folder from "@/LTE/Singletons/Resources/facades/Folder";
  import Comeback from "@Facade/Navigation/Comeback";
  import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
  import File from "@/LTE/Singletons/Resources/facades/File";
  import InputSearch from "@Facade/Input/Search";
  import TitleBase from "@Facade/Title/Base"
  import ModalBase from "@Facade/Modal/Base"
  import ButtonCheckbox from "@Facade/Button/Checkbox"
  import {mapMutations} from "vuex";

  export default {
    name: 'vx.resource.worker.files',
    components: {
      Folder,
      Comeback,
      HeaderAdd,
      File,
      TitleBase,
      InputSearch,
      ModalBase,
      ButtonCheckbox
    },
    data() {
      return{
        modalStatus: false,
        modalValues: ['По дате (сначала новое)', 'По дате (сначала старое)', 'По размеру файлов'],
        activeButton: 2,
        items: ['Редактировать', 'Открыть доступ', 'Переместить', 'Удалить '],
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
              size: '2,1',
              date: '02.03.2020'
            },
            type: null,
            group: null,
          },
          {
            title : 'doc.vmx',
            content: {
              size: '2,1',
              date: '02.03.2020'
            },
            type: null,
            group: true,
          },
          {
            title : 'doc.zip',
            content: {
              size: '2,1',
              date: '02.03.2020'
            },
            type: 'zip',
            group: null,
          },
          {
            title : 'doc.vmx',
            content: {
              size: '2,1',
              date: '02.03.2020'
            },
            type: null,
            group: null,
          },
          {
            title : 'doc.zip',
            content: {
              size: '2,1',
              date: '02.03.2020'
            },
            type: 'zip',
            group: true,
          },
        ],
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
      }
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
    .facade-header-add {
      padding: rem(8) 0;
      margin-bottom: 4px;
    }
    .facade-modal-base::v-deep {
      .modal-base-body {
        height: max-content;
      }
    }
    .facade-resource-file {
      margin-bottom: 8px;
    }
  }
</style>