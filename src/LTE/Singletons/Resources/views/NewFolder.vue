<template>
  <div class="resources-new-folder-view">
    <comeback @click.native="$router.push({name: 'resources.working.files'})"/>
    <resources-header>Новая папка</resources-header>
    <header-add>
      <template #header-title>папки</template>
      <template #header-amount>3</template>
    </header-add>
    <folder @click.native="$router.push({name: 'resources.empty.folder'})">
      <template #title>Новая папка</template>
      <template #folder-content>Пусто</template>
    </folder>
    <folder @click.native="$router.push({name: 'resources.empty.folder'})">
      <template #title>Новая папка (2)</template>
      <template #folder-content>Пусто</template>
    </folder>
    <folder @click.native="$router.push({name: 'resources.empty.folder'})">
      <template #title>Новая папка (3)</template>
      <template #folder-content>Пусто</template>
    </folder>
    <header-add>
      <template #header-title>Файлы</template>
      <template #header-amount>{{files.length}}</template>
    </header-add>
    <file v-for="(file, key) in files" :file="file" :key="key"/>
  </div>
</template>

<script>
import Folder from "@/LTE/Singletons/Resources/facades/Folder";
import ResourcesHeader from "@/LTE/Singletons/Resources/facades/ResourcesHeader";
import Comeback from "@Facade/Navigation/Comeback";
import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
import File from "@/LTE/Singletons/Resources/facades/File"

export default {
  name: 'resources.new.folder',
  components: {
    Folder,
    ResourcesHeader,
    Comeback,
    HeaderAdd,
    File,
  },
  data() {
    return{
      files: [
        {
          title : 'doc.vmx',
          content: '2,1 MB 02.03.2020'
        },
        {
          title : 'doc.vmx',
          content: '2,1 MB 02.03.2020',
          group: true,
        },
        {
          title : 'doc.zip',
          content: '2,1 MB 02.03.2020',
          type: 'zip'
        },
        {
          title : 'doc.vmx',
          content: '2,1 MB 02.03.2020',
        },
        {
          title : 'doc.zip',
          content: '2,1 MB 02.03.2020',
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
  height: 100%;
  width: 100%;
  padding: 24px 0;
  box-sizing: border-box;
  .facade-navigation-comeback {
    margin-bottom: rem(24);
  }
  .facade-resource-header {
    margin-bottom: rem(20);
  }

  .facade-header-add {
    margin: rem(24) 0 rem(8);
  }
}
.facade-resource-file {
  margin-bottom: 8px;
}
</style>