<template>
  <div class="resources-info-view">
    <comeback @click.native="$router.push({name: 'resources.material.resources'})"/>
    <div class="info-header">
      <div class="left-side">
        <title-base>{{object.name}}</title-base>
        <title-caption>{{object.number}}</title-caption>
      </div>
      <icon-points-vertical/>
    </div>
    <text-base>{{object.description}}</text-base>
    <div class="resource-price">
      <title-semi>{{object.price}}</title-semi>
      <title-caption>Стоимость ресурса</title-caption>
    </div>
    <div class="resource-main-info">
      <div class="resource-owner">
        <header-add>
          <template #header-title>Владелец</template>
          <template #header-amount>1</template>
        </header-add>
        <company :company="object.owner"/>
      </div>
      <div class="resource-user">
        <header-add>
          <template #header-title>Пользователь</template>
          <template #header-amount>1</template>
        </header-add>
      </div>
    </div>
    <header-add>
      <template #header-title>изображения</template>
      <template #header-amount>2</template>
    </header-add>
  </div>
</template>

<script>
import Comeback from "@Facade/Navigation/Comeback";
import TitleBase from "@Facade/Title/Base"
import TitleCaption from "@Facade/Title/Caption"
import TextBase from "@Facade/Text/Base"
import TitleSemi from "@Facade/Title/Semi"
import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
import Company from "@/LTE/Singletons/Resources/facades/Company";

export default {
  name: 'resources.structural.units',
  components: {
    Comeback,
    TitleBase,
    TitleCaption,
    TextBase,
    TitleSemi,
    HeaderAdd,
    Company
  },
  data() {
    return{
      object: null,
      materialObjects: [
        {
          id: 0,
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
          user: {
            name: 'Дмитрий Соколов',
            position: 'Космонавт'
          },
          owner: {
            name: 'Sharashkina Kontora',
            img: require('@/assets/img/my/process.svg')
          },
          userLevel: 1,
          price: '3000'
        },
        {
          id: 1,
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
          user: {
            name: 'Дмитрий Соколов',
            position: 'Космонавт'
          },
          owner: {
            name: 'Sharashkina Kontora',
            img: require('@/assets/img/my/process.svg')
          },
          userLevel: 2,
          price: '3000'
        },
        {
          id: 2,
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
          user: {
            name: 'Дмитрий Соколов',
            position: 'Космонавт'
          },
          owner: {
            name: 'Sharashkina Kontora',
            img: require('@/assets/img/my/process.svg')
          },
          userLevel: 3,
          price: '3000'
        },
        {
          id: 3,
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
          user: {
            name: 'Дмитрий Соколов',
            position: 'Космонавт'
          },
          owner: {
            name: 'Sharashkina Kontora',
            img: require('@/assets/img/my/process.svg')
          },
          userLevel: 4,
          price: '3000'
        },
        {
          id: 4,
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
          user: {
            name: 'Дмитрий Соколов',
            position: 'Космонавт'
          },
          owner: {
            name: 'Sharashkina Kontora',
            img: require('@/assets/img/my/process.svg')
          },
          userLevel: 1,
          price: '3000'
        },
        {
          id: 5,
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
          user: {
            name: 'Дмитрий Соколов',
            position: 'Космонавт'
          },
          owner: {
            name: 'Sharashkina Kontora',
            img: require('@/assets/img/my/process.svg')
          },
          userLevel: 2,
          price: '3000'
        },
        {
          id: 6,
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
          user: {
            name: 'Дмитрий Соколов',
            position: 'Космонавт'
          },
          owner: {
            name: 'Sharashkina Kontora',
            img: require('@/assets/img/my/process.svg')
          },
          userLevel: 3,
          price: '3000'
        },
        {
          id: 7,
          name : 'Монитор HP Horus 27 inc.',
          number: 'ABK2921BDSFLBS',
          description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
          user: {
            name: 'Дмитрий Соколов',
            position: 'Космонавт'
          },
          owner: {
            name: 'Sharashkina Kontora',
            img: require('@/assets/img/my/process.svg')
          },
          userLevel: 4,
          price: '3000'
        },
      ]
    }
  },
  created() {
    this.object = this.materialObjects[this.$route.params.id]
    console.log(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
.resources-info-view {
  height: 100%;
  width: 100%;
  padding: 24px 0;
  box-sizing: border-box;
  .facade-navigation-comeback {
    margin-bottom: rem(24);
  }
  .info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: rem(24);
    .facade-title-base{
      margin-bottom: rem(8);
    }
    .icon-points{
      color: #fff;
    }
  }
  .facade-text-base {
    margin-bottom: rem(24);
    color: #fff;
  }
  .resource-price {
    padding: rem(20) 0;
    margin-bottom: rem(48);
    text-align: center;
    border-radius: 12px;
    background-color: $grey-scale-400;
    .facade-title-semi {
      margin-bottom: rem(4);
    }
  }
  .resource-main-info {
    margin-bottom: rem(24);
    display: flex;
    .resource-owner {
      margin-right: rem(24);
      width: 100%;
    }
    .resource-user {
      width: 100%;
    }
  }
  .facade-header-add::v-deep {
    margin-bottom: rem(4);
    padding: rem(8) 0;
    .icon-add {
      display: none;
    }
  }
}
</style>