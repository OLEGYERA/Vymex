<template>
  <div class="resources-structural-units-view">
    <comeback @click.native="$router.push({name: 'resources'})"/>
    <resources-header>Ресурсы С.Е.</resources-header>
    <header-add>
      <template #header-title>папки</template>
      <template #header-amount>2</template>
    </header-add>
    <folder @click.native="$router.push({name: 'resources.material.resources'})">
      <template #title>Материальные ресурсы</template>
      <template #folder-content>12 объектов</template>
    </folder>
    <folder>
      <template #title>Нематериальные ресурсы</template>
      <template #folder-content>4 объектов</template>
    </folder>
  </div>
</template>

<script>
import Folder from "@/LTE/Singletons/Resources/facades/Folder";
import ResourcesHeader from "@/LTE/Singletons/Resources/facades/ResourcesHeader";
import Comeback from "@Facade/Navigation/Comeback";
import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";

export default {
  name: 'resources.structural.units',
  components: {
    Folder,
    ResourcesHeader,
    Comeback,
    HeaderAdd,
  },
  data() {
    return{
      // materialObjects: [
      //   {
      //     name : 'Монитор HP Horus 27 inc.',
      //     number: 'ABK2921BDSFLBS',
      //     user: 'Дмитрий Соколов'
      //   },
      //   {
      //     name : 'Монитор HP Horus 27 inc.',
      //     number: 'ABK2921BDSFLBS',
      //     user: 'Дмитрий Соколов'
      //   },
      //   {
      //     name : 'Монитор HP Horus 27 inc.',
      //     number: 'ABK2921BDSFLBS',
      //     user: 'Дмитрий Соколов'
      //   },
      //   {
      //     name : 'Монитор HP Horus 27 inc.',
      //     number: 'ABK2921BDSFLBS',
      //     user: 'Дмитрий Соколов'
      //   },
      // ]
    }
  }
}
</script>

<style lang="scss" scoped>
.resources-structural-units-view {
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
    margin-bottom: 8px;
  }
}
</style>