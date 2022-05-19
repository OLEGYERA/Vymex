<template>
  <div class="resource-material-resources-view">
    <comeback @onClick="$router.back()"/>
    <div class="header-text-group">
      <title-base>Материальные ресурсы</title-base>
      <icon-points-vertical/>
    </div>
    <input-search :placeholder="'Поиск'"/>

    <list-header title="объекты"
                 :title-count="materialResources.length"
                 @onAction="$router.push({name: 'vx.resource.create.resource'})"
                 @onSetting="showSidebar()"
                 @onReset="chosenUnits = []"
                 setting
                 :setting-count="chosenUnits.length"
    />

    <material-object-ui
        v-for="(resource, index) in resources"
        :resource-identifier="resource.identifier"
        :resource-name="resource.name"
        :worker="resource.worker"
        :key="index"
        :id="resource.id"
        @onClick="getResourceInfo(resource.id)"
    />
    <sidebar-filter-ui :status="sidebarFilterStatus" :chosen-units="chosenUnits" :disable="!chosenUnits.length" @onClick="filterResources"/>

  </div>
</template>

<script>
  import Comeback from "@Facade/Navigation/Comeback";
  import InputSearch from "@Facade/Input/Search";
  import TitleBase from "@Facade/Title/Base"
  import ListHeader from "@Facade/Navigation/ListHeader";

  import {mapGetters, mapMutations} from "vuex";
  import {SidebarFilterUi, MaterialObjectUi} from '@Providers'

  export default {
    name: 'vx.resource.material.resources',
    components: {
      Comeback, MaterialObjectUi, SidebarFilterUi, InputSearch,
      TitleBase, ListHeader
    },
    data() {
      return{
        chosenUnits: []
      }
    },
    props: {
    },
    computed: {
      ...mapGetters({
        sidebarFilterStatus: 'Resources/sidebarFilterStatus',
        materialResources: 'Resources/getMaterialResources',
        // currentCompany: 'Company/getCurrentCompany',

        structure: 'Resources/getStructure', /// говно
      }),
      resources(){
        if(this.chosenUnits.length) {
          return this.materialResources.filter(resource => this.chosenUnits.includes(resource.worker.id))
        }

        return this.materialResources
      }
    },
    methods: {
      ...mapMutations({
        showSidebar: 'Resources/showSidebar',
        closeSidebar: 'Resources/closeSidebar',
      }),
      getResourceInfo(id) {
        this.$core.execViaComponent('Resources', 'getMaterial', id);
        this.$router.push({name: 'vx.resource.info'})
      },
      filterResources(){
        this.closeSidebar()
      }
    },
    created() {
      // this.$core.execViaComponent('Resources', 'getStructure', this.currentCompany.base.id);
      this.$core.execViaComponent('Resources', 'getMaterialResources', this.structure.self[0].id); ///?
    },
  }
</script>

<style lang="scss" scoped>
  .resource-material-resources-view {
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
    .facade-navigation-list-header {
      height: 36px;
      margin-bottom: 4px;
    }

    .resource-material-object-ui {
      margin-bottom: 8px;
    }
  }
</style>