<template>
  <div class="resource-main-view">
    <navigation-close @onClick="closeResources"/>

    <header class="resource-main-header">
      <div class="header-group-text">
        <title-base>Ресурсы</title-base>
        <text-base>Тут хранятся все ваши и доступные вам файлы</text-base>
      </div>

      <disk-storage-ui :storage-space="mainInfo.storageSpace"/>
    </header>

    <main class="resource-folders">
      <folder-ui :folder="{name: 'Ресурсы C.Е.', childFoldersCount: 2}"
                 @onClick="getStructuralUnits"/>
      <folder-ui :folder="{name: 'Рабочие файлы', childFoldersCount: mainInfo.workingFolder.folders, filesCount: mainInfo.workingFolder.files}"
                 @onClick="getWorkFolder"/>
      <folder-ui :folder="{name: 'Доступные мне', childFoldersCount: mainInfo.sharedFiles.folders, filesCount: mainInfo.sharedFiles.files, isShared: true}"/>
      <folder-ui trash :folder="{name: 'Корзина', childFoldersCount: mainInfo.trash.folders, filesCount: mainInfo.trash.files}"
                 @onClick="getTrash"/>
    </main>
  </div>
</template>

<script>
  /*eslint-disable*/
  import NavigationClose from '@Facade/Navigation/Close'
  import TitleBase from '@Facade/Title/Base'
  import TextBase from '@Facade/Text/Base'
  import TitleCaption from '@Facade/Title/Caption'
  import ButtonBase from '@Facade/Button/Base'
  import {FolderUi, DiskStorageUi} from '@Providers'
  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'vx.resource.main',
    components: {
      NavigationClose,
      TitleBase,
      TextBase,
      TitleCaption,
      FolderUi,
      ButtonBase,
      DiskStorageUi
    },
    data() {
      return{
        modalStatus: false,
      }
    },
    computed:{
      ...mapGetters({
        mainInfo: 'Resources/getMainInfo',

        currentCompany: 'Company/getCurrentCompany',
        structure: 'Resources/getStructure',
      }),
      memoryPercentUsed() {
        return Math.round((this.mainInfo.storageSpace.used * 100) / this.mainInfo.storageSpace.total)
      },
    },
    methods: {
      ...mapMutations({
        changeStatus: 'Company/changeStatus'
      }),
      closeResources(){
        this.$router.push({name: 'vx.co'})
        this.changeStatus(0)
      },
      getTrash(){
        this.$router.push({name: 'vx.resource.trash.folder'})
      },
      getStructuralUnits(){
        this.$router.push({name: 'vx.resource.structural.units'})
      },
      getWorkFolder(){
        this.$router.push({name: 'vx.resource.worker.files'})

      }
    },
    beforeCreate() {
      this.$core.execViaComponent('Resources', 'getStructure', this.currentCompany.base.id);
    },
    created() {
      this.$core.execViaComponent('Resources', 'getInfo', 7)
    },
  }
</script>

<style lang="scss" scoped>
  .resource-main-view {
    position: relative;
    width: 100%;

    header.resource-main-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 48px;

      .facade-title-base {
        margin: 0 0 12px;
      }
    }
  }
</style>