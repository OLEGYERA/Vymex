<template>
  <div class="singleton-resources-app">
    <navigation-close/>
    <div class="resources-header">
      <div class="header-text">
        <title-base>Ресурсы</title-base>
        <text-base>Тут храняться все ваши и доступные вам файлы</text-base>
      </div>
      <disk-storage :memory-percent="45"/>
    </div>
    <folder @click.native="$router.push({name: 'resources.structural.units'})">
      <template #title>Ресурсы C.Е.</template>
      <template #folder-content>2 папки</template>
    </folder>
    <folder @click.native="$router.push({name: 'resources.working.files'})">
      <template #title>Рабочие файлы</template>
      <template #folder-content>1 папка, 12 файлов</template>
    </folder>
    <folder :group="true">
      <template #title>Доступные мне</template>
      <template #folder-content>1 папка, 2 файла</template>
    </folder>
    <folder :trash="true">
      <template #title>Корзина</template>
      <template #folder-content>Пусто</template>
    </folder>
    <router-view/>
  </div>
</template>

<script>
import Folder from "@/LTE/Singletons/Resources/facades/Folder";
import DiskStorage from "@/LTE/Singletons/Resources/facades/DiskStorage";
import TitleBase from "@Facade/Title/Base"
import TextBase from '@Facade/Text/Base'
import NavigationClose from '@Facade/Navigation/Close'

export default {
  name: 'Singleton.Resources.App',
  components: {
    Folder,
    DiskStorage,
    TitleBase,
    TextBase,
    NavigationClose,
  },
}
</script>

<style lang="scss" scoped>
  .singleton-resources-app {
    height: 100%;
    width: 100%;
    padding: 50px 0;
    box-sizing: border-box;
    .facade-resource-close-block {
      margin-bottom: rem(24);
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
  .facade-resource-file {
    margin-bottom: 8px;
  }

</style>