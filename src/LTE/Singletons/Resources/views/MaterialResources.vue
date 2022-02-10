<template>
  <div class="resources-material-resources-view">
    <comeback @click.native="$router.push({name: 'resources.structural.units'})"/>
    <resources-header>Материальные ресурсы</resources-header>
    <header-add :setting-slider="true" @onClick="showSidebar()" @create="$router.push({name: 'resources.create.resource'})">
      <template #header-title>объекты</template>
      <template #header-amount>10</template>
    </header-add>
    <material-object
        v-for="(object, index) in materialObjects"
        :object="object"
        :key="index"
        @click.native="$router.push({name: 'resources.resource.info', params: {id: object.id}})"
    />
    <sidebar-filter :status="sidebarFilterStatus"/>
  </div>
</template>

<script>
import ResourcesHeader from "@/LTE/Singletons/Resources/facades/ResourcesHeader";
import Comeback from "@Facade/Navigation/Comeback";
import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
import MaterialObject from "@/LTE/Singletons/Resources/facades/MaterialObject";
import SidebarFilter from "@/LTE/Singletons/Resources/views/sidebar/SidebarFilter";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'resources.material.resources',
  components: {
    ResourcesHeader,
    Comeback,
    HeaderAdd,
    MaterialObject,
    SidebarFilter
  },
  data() {
    return{
      materialObjects: [
        {
          id: 0,
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          user: 'Дмитрий Соколов',
          userLevel: 1,
          price: '3000$'
        },
        {
          id: 1,
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          user: 'Дмитрий Соколов',
          userLevel: 2,
          price: '3000$'
        },
        {
          id: 2,
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          user: 'Дмитрий Соколов',
          userLevel: 3,
          price: '3000$'
        },
        {
          id: 3,
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          user: 'Дмитрий Соколов',
          userLevel: 4,
          price: '3000$'
        },
        {
          id: 4,
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          user: 'Дмитрий Соколов',
          userLevel: 1,
          price: '3000$'
        },
        {
          id: 5,
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          user: 'Дмитрий Соколов',
          userLevel: 2,
          price: '3000$'
        },
        {
          id: 6,
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          user: 'Дмитрий Соколов',
          userLevel: 3,
          price: '3000$'
        },
        {
          id: 7,
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          user: 'Дмитрий Соколов',
          userLevel: 4,
          price: '3000$'
        },
      ]
    }
  },
  methods: {
    ...mapMutations({
      showSidebar: 'Resources/showSidebar',
    }),
  },
  computed: {
    ...mapGetters({
      sidebarFilterStatus: 'Resources/sidebarFilterStatus',
    })
  },
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