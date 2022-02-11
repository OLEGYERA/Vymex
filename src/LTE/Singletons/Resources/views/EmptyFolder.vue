<template>
  <div class="resources-empty-folder-view">
    <comeback @onClick="$router.push({name: 'resources.new.folder'})"/>
    <resources-header>Новая папка</resources-header>
    <header-add>
      <template #header-title>папки</template>
    </header-add>
    <div class="background">
      <img class="image" src="@/assets/img/my/empty-folder.svg">
      Папок нет
    </div>
    <header-add>
      <template #header-title>Файлы</template>
    </header-add>
    <div class="background">
      <img class="image" src="@/assets/img/my/empty-file.svg">
      Файлов нет
    </div>
  </div>
</template>

<script>
import ResourcesHeader from "@/LTE/Singletons/Resources/facades/ResourcesHeader";
import Comeback from "@Facade/Navigation/Comeback";
import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
export default {
  name: 'resources.empty.folder',
  components: {
    ResourcesHeader,
    Comeback,
    HeaderAdd,
  },
}
</script>

<style lang="scss" scoped>
.resources-empty-folder-view {
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
  .background {
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

</style>