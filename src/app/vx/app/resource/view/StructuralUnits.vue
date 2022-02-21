<template>
  <div class="resource-structural-units-view">
    <comeback @onClick="$router.push({name: 'vx.resource'})"/>
    <div class="header-text-group">
      <title-base>Ресурсы С.Е.</title-base>
      <icon-points-vertical/>
    </div>
    <input-search :placeholder="'Поиск'"/>
    <header-add>
      <template #header-title>папки</template>
      <template #header-amount>{{folders.length}}</template>
    </header-add>
    <folder v-for="(folder, folderKey) in folders" :folder="folder" :key="folderKey" @getId="changePage"/>
  </div>
</template>

<script>
  import Folder from "@/LTE/Singletons/Resources/facades/Folder";
  import Comeback from "@Facade/Navigation/Comeback";
  import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
  import InputSearch from "@Facade/Input/Search";
  import TitleBase from "@Facade/Title/Base"

  export default {
    name: 'vx.resource.structural.units',
    components: {
      Folder,
      Comeback,
      HeaderAdd,
      InputSearch,
      TitleBase
    },
    data() {
      return{
        folders: [
          {
            id: 1,
            title: 'Материальные ресурсы ',
            content: {
              folders: null,
              files: null,
              objects: 2,
            },
            group: null,
            trash: null
          },
          {
            id: 2,
            title: 'Нематериальные ресурсы ',
            content: {
              folders: null,
              files: null,
              objects: 15,
            },
            group: null,
            trash: null
          }
        ]
      }
    },
    methods: {
      changePage({id}) {
        if(id === 1) {
          this.$router.push({name: 'vx.resource.material.resources'})
        }
        if(id === 2){
          this.$router.push({name: 'vx.resource.intangible.resources'})
        }
      }
    }
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