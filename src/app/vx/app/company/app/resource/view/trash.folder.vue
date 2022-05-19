<template>
  <div class="resource-trash-folder-view">
    <comeback @onClick="$router.back()"/>
    <div class="header-text-group">
      <title-base>Корзина</title-base>
      <title-caps class="clear-trash-button" @click.native="modalStatusDeleteTrash=true">Очистить корзину</title-caps>

      <modal-base :status="modalStatusDeleteTrash" @onClose="modalStatusDeleteTrash=false" @onOk="clearTrash">
        <template #title>Удалить навсегда?</template>
        <template #description>Все объекты в корзине будут удалены без возможности их восстановления</template>
        <template #button-accept>Удалить</template>
      </modal-base>
    </div>

    <input-search :placeholder="'Поиск'"/>

    <div class="trash-main-content" v-if="trash.folders.length || trash.files.length">

      <list-header :add="false" title="папки" :title-count="trash.folders.length"/>

      <div class="resources-folders">
        <folder-ui v-for="(folder, folderKey) in trash.folders"
                   :folder="folder"
                   :key="folderKey"
                   @onClick="$router.push({name: 'vx.resource.new.folder', params: {id: folder.id}})"
        />
      </div>

      <list-header :add="false" :sort="trash.files.length > 1" class="files-header" @onSort="modalStatusSort= true" title="Файлы" :title-count="trash.files.length"/>

      <modal-base :status="modalStatusSort" @onClose="modalStatusSort=false" @onOk="sortFiles">
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

      <file-ui
          v-for="(file, fileKey) in trash.files"
          :file="file" :key="fileKey"
          :actions="actions"
          @getActiveValue="actionListChange"
          @deleteFile="modalStatusDeleteFile=true"
          @getChosenFile="activeFile = fileKey">
        <template>Удалить безвозвратно</template>
      </file-ui>

<!--      <modal-base :status="modalStatusRestoreYourself" @onClose="modalStatusRestoreYourself=false" @onOk="modalStatusRestoreYourself=false">-->
<!--        <template #title>Восстановление файла</template>-->
<!--        <template #description>Файлы будет востановлен и доступен вам</template>-->
<!--        <template #content>-->
<!--          <file :file="files[activeFile]"/>-->
<!--        </template>-->
<!--        <template #button-accept>Востановить</template>-->
<!--      </modal-base>-->
<!--      <modal-base :status="modalStatusRestoreOwner" @onClose="modalStatusRestoreOwner=false" @onOk="modalStatusRestoreOwner=false">-->
<!--        <template #title>Восстановление файла</template>-->
<!--        <template #description>Файлы будет востановлен и доступен вам и владельцу</template>-->
<!--        <template #content>-->
<!--          <file :file="files[activeFile]"/>-->
<!--        </template>-->
<!--        <template #button-accept>Востановить</template>-->
<!--      </modal-base>-->
<!--      <modal-base :status="modalStatusDeleteFile" @onClose="modalStatusDeleteFile=false" @onOk="modalStatusDeleteFile=false">-->
<!--        <template #title>Удаление файла</template>-->
<!--        <template #description>Файл будет удален, это действие безвозвратно</template>-->
<!--        <template #content>-->
<!--          <file :file="files[activeFile]"/>-->
<!--        </template>-->
<!--        <template #button-accept>Удалить</template>-->
<!--      </modal-base>-->
    </div>

    <div class="empty-trash" v-else>
      <title-caps class="empty-trash-subtitle">Объекты</title-caps>
      <div class="background-plate">
        <img class="empty-trash-image" src="@/assets/img/my/empty-trash.svg">
        <title-caps>Ваша корзина пуста</title-caps>
      </div>
    </div>
  </div>
</template>

<script>
  import Comeback from "@Facade/Navigation/Comeback";
  import InputSearch from "@Facade/Input/Search";
  import TitleBase from "@Facade/Title/Base"
  import TitleCaps from '@Facade/Title/Caps'
  import ModalBase from "@Facade/Modal/Base"
  import ButtonCheckbox from "@Facade/Button/Checkbox"
  import ListHeader from "@Facade/Navigation/ListHeader";

  import {FileUi, FolderUi} from '@Providers'
  import {mapGetters} from "vuex";

  export default {
    name: 'vx.resource.trash.folder',
    components: {
      Comeback,
      InputSearch,
      TitleBase,
      TitleCaps,
      FolderUi,
      FileUi,
      ModalBase,
      ButtonCheckbox,
      ListHeader
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
        actions: ['Восстановить (себе)', 'Восстановить (владельцу)'],
      }
    },
    computed: {
      ...mapGetters({
        trash: 'Resources/getTrash',

        structure: 'Resources/getStructure',
      }),
    },
    methods:{
      setNewValue(id) {
        this.activeButton = id
      },
      // changePage({id}) {
      //   if(id === 1){
      //     this.$router.push({name: 'vx.resource.new.folder'})
      //   }
      // },
      actionListChange(key) {
        if(key === 0){
          this.modalStatusRestoreYourself=true
        }
        if(key === 1){
          this.modalStatusRestoreOwner=true
        }
      },
      sortFiles(){
        this.modalStatusSort=false;
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
      clearTrash(){
        this.$core.execViaComponent('Resources', 'clearWorkerTrash', 7)
        this.modalStatusDeleteTrash = false
        this.$notify({text: 'Файлы удалены!', type: 'success', duration: 3000, speed: 500})
      },
    },
    created() {
      this.$core.execViaComponent('Resources', 'getTrash', [this.structure.self[0].id])
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
    .trash-main-content{
      .facade-navigation-list-header{
        height: 36px;
        margin-bottom: 4px;
      }
      .resources-folders {
        margin-bottom: 20px;
      }
      .resource-file-ui {
        margin-bottom: 8px;
      }
    }
    .empty-trash{
      .empty-trash-subtitle{
        padding: 8px 0;
        margin-bottom: rem(4);
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
        .empty-trash-image {
          margin-bottom: 8px;
        }
      }
    }
  }
</style>