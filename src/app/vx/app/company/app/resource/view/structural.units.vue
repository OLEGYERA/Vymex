<template>
  <div class="resource-structural-units-view">
    <comeback @onClick="$router.back()"/>
    <div class="header-text-group">
      <title-base>Ресурсы С.Е.</title-base>
      <icon-points-vertical/>
    </div>
    <input-search :placeholder="'Поиск'"/>

    <list-header title="папки" :title-count="2" :add="false"/>

    <folder-ui :folder="{name: 'Материальные ресурсы', objects: materialResources.length}"
               @onClick="$router.push({name: 'vx.resource.material.resources'})"/>
    <folder-ui :folder="{name: 'Нематериальные ресурсы', objects: intangibleResources.length}"
               @onClick="$router.push({name: 'vx.resource.intangible.resources'})"/>
  </div>
</template>

<script>
  import Comeback from "@Facade/Navigation/Comeback";
  import InputSearch from "@Facade/Input/Search";
  import TitleBase from "@Facade/Title/Base"
  import ListHeader from "@Facade/Navigation/ListHeader";

  import {FolderUi} from '@Providers'
  import {mapGetters} from "vuex";

  export default {
    name: 'vx.resource.structural.units',
    components: {
      FolderUi,
      Comeback,
      InputSearch,
      TitleBase,
      ListHeader
    },
    data() {
      return{
      }
    },
    computed: {
      ...mapGetters({
        materialResources: 'Resources/getMaterialResources',
        intangibleResources: 'Resources/getIntangibleResources',

        structure: 'Resources/getStructure',
        // currentCompany: 'Company/getCurrentCompany',
      }),
    },
    methods: {
    },
    created() {
      // this.$core.execViaComponent('Resources', 'getStructure', this.currentCompany.base.id);
      this.$core.execViaComponent('Resources', 'getMaterialResources', this.structure.self[0].id);
      this.$core.execViaComponent('Resources', 'getWorkerIntangible', this.structure.self[0].id)
    },
  }
</script>

<style lang="scss" scoped>
  .resource-structural-units-view {
    width: 100%;
    .header-text-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .icon-points-vertical {
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
      margin-bottom: 4px;
    }
  }
</style>