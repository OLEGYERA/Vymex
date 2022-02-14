<template>
  <div class="resources-empty-folder">
    <comeback @onClick="$router.push({name: 'vx.resource.new.folder'})"/>
    <div class="header-text-group">
      <title-base>Новая папка</title-base>
      <icon-points-vertical/>
    </div>
    <input-search :placeholder="'Поиск'"/>
    <header-add>
      <template #header-title>папки</template>
    </header-add>
    <div class="background-plate background-plate-folder">
      <img class="image" src="@/assets/img/my/empty-folder.svg">
      Папок нет
    </div>
    <header-add>
      <template #header-title>Файлы</template>
    </header-add>
    <div class="background-plate">
      <img class="image" src="@/assets/img/my/empty-file.svg">
      Файлов нет
    </div>
  </div>
</template>

<script>
  import Comeback from "@Facade/Navigation/Comeback";
  import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
  import InputSearch from "@Facade/Input/Search";
  import TitleBase from "@Facade/Title/Base"

  export default {
    name: 'vx.resource.empty.folder',
    components: {
      Comeback,
      HeaderAdd,
      InputSearch,
      TitleBase
    },
  }
</script>

<style lang="scss" scoped>
.resources-empty-folder {
  width: 100%;
  .header-text-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .icon-points {
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
    &-folder {
      margin-bottom: rem(20);
    }
    .image {
      margin-bottom: 8px;
    }
  }
}
</style>