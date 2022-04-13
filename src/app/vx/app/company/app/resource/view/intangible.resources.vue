<template>
  <div class="resource-intangible-resources-view">
    <comeback @onClick="$router.back()"/>
    <div class="header-text-group">
      <title-base>Нематериальные ресурсы</title-base>
      <icon-points-vertical/>
    </div>
    <input-search :placeholder="'Поиск'"/>

    <list-header title="Объекты" :title-count="resources.length || ''" @onAction="$router.push({name: 'vx.resource.create.intangible.resource'})"/>
    <div class="background-plate" v-if="!resources.length">
      <img class="image" src="@/assets/img/my/empty-file.svg">
      Файлов нет
    </div>
    <div class="intangible-resources-list">
      <intangible-object-ui
          v-for="(object, objectKey) in resources"
          :object="object"
          :key="objectKey"
          @onClick="getResourceInfo(object.id)"/>
    </div>
  </div>
</template>

<script>
  import Comeback from "@Facade/Navigation/Comeback";
  import InputSearch from "@Facade/Input/Search";
  import TitleBase from "@Facade/Title/Base"
  import ListHeader from "@Facade/Navigation/ListHeader";

  import {IntangibleObjectUi} from "@Providers"
  import {mapGetters} from "vuex";

  export default {
    name: 'vx.resource.intangible.resources',
    components: {
      Comeback,
      InputSearch,
      TitleBase,
      IntangibleObjectUi,
      ListHeader
    },
    // data(){
    //   return{
    //   }
    // },
    computed: {
      ...mapGetters({
        resources: 'Resources/getIntangibleResources',
      }),
    },
    methods:{
      getResourceInfo(id) {
        this.$core.execViaComponent('Resources', 'getIntangible', id)
        this.$router.push({name: 'vx.resource.intangible.resource.info'})
      }
    },
    created() {
      this.$core.execViaComponent('Resources', 'getWorkerIntangible', 7)
    }
  }
</script>

<style lang="scss" scoped>
  .resource-intangible-resources-view {
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
      padding: rem(8) 0;
      margin-bottom: rem(4);
    }

    .resource-intangible-object-ui {
      margin-bottom: 8px;
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