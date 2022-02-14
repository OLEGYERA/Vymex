<template>
  <div class="resource-intangible-resources">
    <comeback @onClick="$router.push({name: 'vx.resource.structural.units'})"/>
    <div class="header-text-group">
      <title-base>Нематериальные ресурсы</title-base>
      <icon-points-vertical/>
    </div>
    <input-search :placeholder="'Поиск'"/>
    <header-add @create="$router.push({name: 'vx.resource.create.intangible.resource'})">
      <template #header-title>Объекты</template>
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
  name: 'vx.resource.intangible.resources',
  components: {
    Comeback,
    HeaderAdd,
    InputSearch,
    TitleBase
  },
}
</script>

<style lang="scss" scoped>
.resource-intangible-resources {
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
    .image {
      margin-bottom: 8px;
    }
  }
}
</style>