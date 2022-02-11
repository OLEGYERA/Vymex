<template>
  <div class="resources-working-files-view">
    <comeback @onClick="$router.push({name: 'resources'})"/>
    <resources-header>Рабочие файлы</resources-header>
    <header-add>
      <template #header-title>папки</template>
      <template #header-amount>1</template>
    </header-add>
    <folder @click.native="$router.push({name: 'resources.new.folder'})">
      <template #title>Новая папка</template>
      <template #folder-content>3 папки, 2 файла</template>
    </folder>
    <header-add sort="true">
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
  name: 'resources.working.files',
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
.resources-working-files-view {
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
  .facade-resource-folder {
    margin-bottom: rem(24);
  }
  .facade-header-add {
    margin-bottom: 8px;
  }
}
.facade-resource-file {
  margin-bottom: 8px;
}
</style>