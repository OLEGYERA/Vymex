<template>
  <div class="resource-material-resources-view">
    <comeback @onClick="$router.push({name: 'vx.resource.structural.units'})"/>
    <div class="header-text-group">
      <title-base>Материальные ресурсы</title-base>
      <icon-points-vertical/>
    </div>
    <input-search :placeholder="'Поиск'"/>
    <header-add :setting-slider="true" @onClick="showSidebar()" @create="$router.push({name: 'vx.resource.create.resource'})">
      <template #header-title>объекты</template>
      <template #header-amount>{{materialObjects.length}}</template>
    </header-add>
    <material-object
        v-for="(object, index) in materialObjects"
        :object="object"
        :key="index"
        @click.native="$router.push({name: 'vx.resource.info', params: {id: object.id}})"
    />
    <sidebar-filter :status="sidebarFilterStatus"/>
  </div>
</template>

<script>
  import Comeback from "@Facade/Navigation/Comeback";
  import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
  import MaterialObject from "@/LTE/Singletons/Resources/facades/MaterialObject";
  import SidebarFilter from "@/app/vx/app/resource/view/SidebarFilter";
  import InputSearch from "@Facade/Input/Search";
  import TitleBase from "@Facade/Title/Base"
  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'vx.resource.material.resources',
    components: {
      Comeback,
      HeaderAdd,
      MaterialObject,
      SidebarFilter,
      InputSearch,
      TitleBase
    },
    data() {
      return{
        materialObjects: [
          {
            id: 1,
            name : 'Монитор HP Horus 27 inc.',
            number: 'ABK2921BDSFLBS',
            description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
            user: {
              name: 'Дмитрий Соколов',
              position: 'Космонавт',
              level: 1,
              img: require('@/assets/img/my/process.svg')
            },
            owner: {
              name: 'Sharashkina Kontora',
              img: require('@/assets/img/my/process.svg')
            },
            price: '3000'
          },
          {
            id: 2,
            name : 'iMac 27 inch. 2015',
            number: 'ABK2921BDSFLBS',
            description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
            user: {
              name: 'Дмитрий Соколов',
              position: 'Космонавт',
              level: 2,
              img: require('@/assets/img/my/process.svg')
            },
            owner: {
              name: 'Sharashkina Kontora',
              img: require('@/assets/img/my/process.svg'),
            },
            price: '3000'
          },
          {
            id: 3,
            name : 'Молоток',
            number: 'ABK2921BDSFLBS',
            description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
            user: {
              name: 'Дмитрий Соколов',
              position: 'Космонавт',
              level: 4,
              img: require('@/assets/img/my/process.svg')
            },
            owner: {
              name: 'Sharashkina Kontora',
              img: require('@/assets/img/my/process.svg'),
            },
            price: '3000'
          },
          {
            id: 4,
            name : 'Монитор HP Horus 27 inc.',
            number: 'ABK2921BDSFLBS',
            description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
            user: {
              name: 'Дмитрий Соколов',
              position: 'Космонавт',
              level: 1,
              img: require('@/assets/img/my/process.svg')
            },
            owner: {
              name: 'Sharashkina Kontora',
              img: require('@/assets/img/my/process.svg'),
            },
            price: '3000'
          },
          {
            id: 5,
            name : 'iMac 27 inch. 2015',
            number: 'ABK2921BDSFLBS',
            description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
            user: {
              name: 'Дмитрий Соколов',
              position: 'Космонавт',
              level: 3,
              img: require('@/assets/img/my/process.svg')
            },
            owner: {
              name: 'Sharashkina Kontora',
              img: require('@/assets/img/my/process.svg')
            },
            price: '3000'
          },
          {
            id: 6,
            name : 'Монитор HP Horus 27 inc.',
            number: 'ABK2921BDSFLBS',
            description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
            user: {
              name: 'Дмитрий Соколов',
              position: 'Космонавт',
              level: 3,
              img: require('@/assets/img/my/process.svg')
            },
            owner: {
              name: 'Sharashkina Kontora',
              img: require('@/assets/img/my/process.svg')
            },
            price: '3000'
          },
          {
            id: 7,
            name : 'iMac 27 inch. 2015',
            number: 'ABK2921BDSFLBS',
            description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
            user: {
              name: 'Дмитрий Соколов',
              position: 'Космонавт',
              level: 2,
              img: require('@/assets/img/my/process.svg')
            },
            owner: {
              name: 'Sharashkina Kontora',
              img: require('@/assets/img/my/process.svg')
            },
            price: '3000'
          },
          {
            id: 8,
            name : 'Монитор HP Horus 27 inc.',
            number: 'ABK2921BDSFLBS',
            description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
            user: {
              name: 'Дмитрий Соколов',
              position: 'Космонавт',
              level: 4,
              img: require('@/assets/img/my/process.svg')
            },
            owner: {
              name: 'Sharashkina Kontora',
              img: require('@/assets/img/my/process.svg')
            },
            price: '3000'
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
    mounted() {
      console.log(this.$route.params.resourceId)
      if(this.$route.params.resourceId){
        this.materialObjects.splice(this.materialObjects.findIndex(el => el.id === this.$route.params.resourceId), 1)
      }
    }
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
      margin-bottom: 4px;
    }
    .facade-resource-material-object {
      margin-bottom: 8px;
    }
  }
</style>