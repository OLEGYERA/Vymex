<template>
  <div class="resources-material-resources-view">
    <comeback @click.native="$router.push({name: 'resources.structural.units'})"/>
    <resources-header>Материальные ресурсы</resources-header>
    <header-add>
      <template #header-title>объекты</template>
      <template #header-amount>10</template>
    </header-add>
    <material-object v-for="(object, key) in materialObjects" :object="object" :key="key"/>
  </div>
</template>

<script>
import ResourcesHeader from "@/LTE/Singletons/Resources/facades/ResourcesHeader";
import Comeback from "@Facade/Navigation/Comeback";
import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
import MaterialObject from "@/LTE/Singletons/Resources/facades/MaterialObject";

export default {
  name: 'resources.material.resources',
  components: {
    ResourcesHeader,
    Comeback,
    HeaderAdd,
    MaterialObject
  },
  data() {
    return{
      materialObjects: [
        {
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          user: 'Дмитрий Соколов'
        },
        {
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          user: 'Дмитрий Соколов'
        },
        {
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          user: 'Дмитрий Соколов'
        },
        {
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          user: 'Дмитрий Соколов'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.resources-material-resources-view {
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
  .facade-resource-material-object {
    margin-bottom: 8px;
  }
}
</style>