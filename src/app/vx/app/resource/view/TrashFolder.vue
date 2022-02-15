<template>
  <div class="resource-trash-folder-view">
    <comeback @onClick="$router.push({name: 'vx.resource'})"/>
    <div class="header-text-group">
      <title-base>Корзина</title-base>
      <title-caps class="clear-trash-button" @click.native="modalStatusDeleteTrash=true">Очистить корзину</title-caps>
      <modal-base :status="modalStatusDeleteTrash" @onClose="modalStatusDeleteTrash=false" @onOk="modalStatusDeleteTrash=false">
        <template #title>Удалить навсегда?</template>
        <template #description>Все объекты в корзине будут удалены без возможности их восстановления</template>
        <template #button-accept>Удалить</template>
      </modal-base>
    </div>
    <input-search :placeholder="'Поиск'"/>
    <header-add>
      <template #header-title>папки</template>
      <template #header-amount>{{folders.length}}</template>
    </header-add>
    <div class="resources-folders">
      <folder v-for="(folder, folderKey) in folders" :folder="folder" :key="folderKey"/>
    </div>
    <header-add sort class="files-header" @sortFiles="modalStatusSort= true">
      <template #header-title>Файлы</template>
      <template #header-amount>{{files.length}}</template>
    </header-add>
    <modal-base :status="modalStatusSort" @onClose="modalStatusSort=false" @onOk="modalStatusSort=false">
      <template #title>Сортировка</template>
      <template #content>
        <button-checkbox
            v-for="(value, valueKey) in modalSortValues"
            :key="valueKey"
            :title="value"
            :selected="activeButton === valueKey"
            @onCheckbox="setNewValue(valueKey)"/>
      </template>
      <template #button-accept>Применить</template>
    </modal-base>
    <file
        v-for="(file, fileKey) in files"
        :file="file" :key="fileKey"
        :items="modalActiveValues"
        @getActiveValue="actionListChange"
        @getChosenFile="activeFile = fileKey"/>
    <modal-base :status="modalStatusRestoreYourself" @onClose="modalStatusRestoreYourself=false" @onOk="modalStatusRestoreYourself=false">
      <template #title>Восстановление файла</template>
      <template #description>Файлы будет востановлен и доступен вам</template>
      <template #content>
        <file :file="files[activeFile]"/>
      </template>
      <template #button-accept>Востановить</template>
    </modal-base>
    <modal-base :status="modalStatusRestoreOwner" @onClose="modalStatusRestoreOwner=false" @onOk="modalStatusRestoreOwner=false">
      <template #title>Восстановление файла</template>
      <template #description>Файлы будет востановлен и доступен вам и владельцу</template>
      <template #content>
        <file :file="files[activeFile]"/>
      </template>
      <template #button-accept>Востановить</template>
    </modal-base>
    <modal-base :status="modalStatusDeleteFile" @onClose="modalStatusDeleteFile=false" @onOk="modalStatusDeleteFile=false">
      <template #title>Удаление файла</template>
      <template #description>Файлы будет удален, это действие безвозвратно</template>
      <template #content>
        <file :file="files[activeFile]"/>
      </template>
      <template #button-accept>Удалить</template>
    </modal-base>
  </div>
</template>

<script>
  import Comeback from "@Facade/Navigation/Comeback";
  import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
  import InputSearch from "@Facade/Input/Search";
  import TitleBase from "@Facade/Title/Base"
  import TitleCaps from '@Facade/Title/Caps'
  import Folder from "@/LTE/Singletons/Resources/facades/Folder";
  import File from "@/LTE/Singletons/Resources/facades/File"
  import ModalBase from "@Facade/Modal/Base"
  import ButtonCheckbox from "@Facade/Button/Checkbox"

  export default {
    name: 'vx.resource.trash.folder',
    components: {
      Comeback,
      HeaderAdd,
      InputSearch,
      TitleBase,
      TitleCaps,
      Folder,
      File,
      ModalBase,
      ButtonCheckbox
    },
    data(){
      return{
        modalStatusSort: false,
        modalStatusRestoreYourself: false,
        modalStatusRestoreOwner: false,
        modalStatusDeleteFile: false,
        modalStatusDeleteTrash: false,
        modalSortValues: ['По дате (сначала новое)', 'По дате (сначала старое)', 'По размеру файлов'],
        activeButton: 2,
        activeFile: null,
        modalActiveValues: ['Восстановить (себе)', 'Восстановить (владельцу)', 'Удалить безвозвратно'],
        folders: [
          {
            id: 1,
            title: 'Новая папка',
            content: {
              folders: null,
              files: null
            },
            group: null,
            trash: null
          },
          {
            id: 2,
            title: 'Новая папка (2)',
            content: {
              folders: null,
              files: null,
            },
            group: null,
            trash: null
          },
          {
            id: 3,
            title: 'Новая папка (3)',
            content: {
              folders: null,
              files: null
            },
            group: null,
            trash: null,
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
            group: true,
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
            group: true,
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
            group: true,
          },
        ],
      }
    },
    methods:{
      setNewValue(id) {
        this.activeButton = id
      },
      changePage({id}) {
        if(id === 1){
          this.$router.push({name: 'vx.resource.new.folder'})
        }
      },
      actionListChange(key) {
        if(key === 0){
          this.modalStatusRestoreYourself=true
        }
        if(key === 1){
          this.modalStatusRestoreOwner=true
        }
        if(key === 2){
          this.modalStatusDeleteFile=true
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .resource-trash-folder-view {
    width: 100%;
    .header-text-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .clear-trash-button{
        cursor: pointer;
        transition: color .3s;
        &:hover{
          color: $red;
        }
      }
    }
    .facade-input-search {
      margin-bottom: rem(16);
    }
    .facade-header-add {
      padding: rem(8) 0;
      margin-bottom: rem(4);
    }
    .resources-folders {
      margin-bottom: 20px;
    }
    .facade-modal-base::v-deep {
      .icon-points-vertical{
        display: none;
      }
    }
    .facade-resource-file {
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
      .image {
        margin-bottom: 8px;
      }
    }
  }
  .files-header.facade-header-add::v-deep{
    .icon-add{
      display: none;
    }
  }
</style>