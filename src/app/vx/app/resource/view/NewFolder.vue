<template>
  <div class="resources-new-folder-view">
    <comeback @onClick="$router.push({name: 'vx.resource.worker.files'})"/>
      <div class="header-text-group">
        <title-base>Новая папка</title-base>
        <icon-points-vertical/>
      </div>
      <input-search :placeholder="'Поиск'"/>
    <header-add>
      <template #header-title>папки</template>
      <template #header-amount>{{folders.length}}</template>
    </header-add>
    <div class="resources-folders">
      <folder v-for="(folder, folderKey) in folders" :folder="folder" :key="folderKey" @click.native="$router.push({name: 'vx.resource.empty.folder'})"/>
    </div>
    <header-add sort>
      <template #header-title>Файлы</template>
      <template #header-amount>{{files.length}}</template>
    </header-add>
    <file v-for="(file, key) in files" :file="file" :key="key" :items="items"/>
  </div>
</template>

<script>
  import Folder from "@/LTE/Singletons/Resources/facades/Folder";
  import Comeback from "@Facade/Navigation/Comeback";
  import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
  import File from "@/LTE/Singletons/Resources/facades/File"
  import TitleBase from "@Facade/Title/Base"
  import InputSearch from "@Facade/Input/Search";

  export default {
    name: 'vx.resource.new.folder',
    components: {
      Folder,
      Comeback,
      HeaderAdd,
      File,
      TitleBase,
      InputSearch
    },
    data() {
      return{
        items: ['Редактировать', 'Открыть доступ', 'Переместить', 'Удалить '],
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
    .facade-header-add {
      padding: rem(8) 0;
      margin-bottom: rem(4);
    }
    .resources-folders {
      margin-bottom: 20px;
    }
    .facade-resource-file {
      margin-bottom: 8px;
    }
  }
</style>