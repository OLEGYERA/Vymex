<template>
  <div class="singleton-resources-app">
    <close-block/>
    <div class="resources-header">
      <div class="header-text">
        <title-base>Ресурсы</title-base>
        <text-base>Тут храняться все ваши и доступные вам файлы</text-base>
      </div>
      <disk-storage :memory-percent="45"/>
    </div>
    <folder v-for="(folder, key) in folders" :folder="folder" :key="key"/>
    <div class="sep"></div>
    <resources-header/>
  </div>
</template>

<script>
import Folder from "@/LTE/Singletons/Resources/facades/Folder";
import DiskStorage from "@/LTE/Singletons/Resources/facades/DiskStorage";
import TitleBase from "@Facade/Title/Base"
import TextBase from '@Facade/Text/Base'
import CloseBlock from "@/LTE/Singletons/Resources/facades/CloseBlock";
import ResourcesHeader from "@/LTE/Singletons/Resources/facades/ResourcesHeader";

export default {
  name: 'Singleton.Resources.App',
  components: {
    Folder,
    DiskStorage,
    TitleBase,
    TextBase,
    CloseBlock,
    ResourcesHeader
  },
  data() {
    return{
      folders : [
        {
          title : 'Ресурсы C.Е.',
          content: '2 папки'
        },
        {
          title : 'Рабочие файлы',
          content: '1 папка, 12 файлов'
        },
        {
          title : 'Доступные мне',
          content: '1 папка, 2 файла',
          type: 'group'
        },
        {
          title : 'Корзина',
          content: 'Пусто',
          type: 'trash'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .singleton-resources-app {
    height: 100%;
    width: 100%;
    //top: 0;
    //left: 0;
    //position: absolute;
    background-color: #181F26;
    z-index: 10;
    padding: 50px 0;
    box-sizing: border-box;
    .facade-resource-close-block {
      margin-bottom: 24px;
    }
    .resources-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 48px;
      .facade-title-base {
        margin: 0 0 12px;
      }
    }
  }

  .sep {
    height: 40px;
  }
</style>