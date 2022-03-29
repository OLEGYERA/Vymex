<template>
  <div class="resource-intangible-resources-view">
    <comeback @onClick="$router.push({name: 'vx.resource.structural.units'})"/>
    <div class="header-text-group">
      <title-base>Нематериальные ресурсы</title-base>
      <icon-points-vertical/>
    </div>
    <input-search :placeholder="'Поиск'"/>
    <header-add @create="$router.push({name: 'vx.resource.create.intangible.resource'})">
      <template #header-title>Объекты</template>
      <template #header-amount>{{resources.length}}</template>
    </header-add>
    <div class="background-plate" v-if="!resources.length">
      <img class="image" src="@/assets/img/my/empty-file.svg">
      Файлов нет
    </div>
    <div class="intangible-resources-list">
      <intangible-object-ui
          v-for="(object, objectKey) in resources"
          :object="object"
          :key="objectKey"
          @click.native="$router.push({name: 'vx.resource.intangible.resource.info', params: {id: object.id}})"/>
    </div>
  </div>
</template>

<script>
  import Comeback from "@Facade/Navigation/Comeback";
  import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd"; //// костыль
  import InputSearch from "@Facade/Input/Search";
  import TitleBase from "@Facade/Title/Base"
  import {IntangibleObjectUi} from "@Providers"

  export default {
    name: 'vx.resource.intangible.resources',
    components: {
      Comeback,
      HeaderAdd,
      InputSearch,
      TitleBase,
      IntangibleObjectUi
    },
    data(){
      return{
        resources: [
          {
            id: 1,
            name: 'facebook account',
            url: 'facebook.com/29kadgdbsi9a_21g3_1%_ab',
            login: 'jerronvymex@vymex.com',
            password: 'Abra_Kadabra',
            description: 'Тестовый аккаунт для рекламных сайтов, что бы мы лучше понимали рынок земли и продажи алюминия, радости вам и хорошего настроения',
          }
        ]
      }
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