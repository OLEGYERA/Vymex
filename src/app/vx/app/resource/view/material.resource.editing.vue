<template>
  <div class="resource-editing-material-view">
    <comeback @onClick="$router.push({name: 'vx.resource.info'})"/>
    <title-base>Редактирование ресурса</title-base>
    <div class="main-plate">
      <input-base labeled :placeholder="'Название'" :model="object.name"></input-base>
      <input-base labeled :placeholder="'Серийный номер'" :model="object.number"/>
      <text-area labeled :placeholder="'Описание'" :max-length="1000" :text-area-value="object.description"/>
      <title-caps>Стоимость ресурса</title-caps>
      <input-price :model="object.price"/>
      <div class="user">
        <header-add class="user" @create="showSidebar()">
          <template #header-title>Пользователь</template>
          <template #header-amount>1</template>
        </header-add>
        <structural-unit :user="object.user"><icon-points-vertical/></structural-unit>
      </div>
      <assign-user-ui/>
      <header-add class="owner">
        <template #header-title>Владелец</template>
        <template #header-amount>1</template>
      </header-add>
      <company-ui :company="object.owner"/>
      <header-add class="">
        <template #header-title>изображения</template>
      </header-add>
      <file-ui/>
    </div>
    <div class="create-resource-buttons">
      <button-secondary class="create-resource-button">Отмена</button-secondary>
      <button-base class="create-resource-button" :disable="buttonDisable" @onClick="$router.push({name: 'vx.resource.material.resources'})">
        Сохранить
      </button-base>
    </div>
  </div>
</template>

<script>
  import Comeback from "@Facade/Navigation/Comeback";
  import TitleBase from "@Facade/Title/Base";
  import InputBase from "@Facade/Input/Base"
  import TextArea from "@Facade/Input/TextArea"
  import TitleCaps from "@Facade/Title/Caps"
  import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd"; //// костыль
  import ButtonSecondary from "@Facade/Button/Secondary"
  import ButtonBase from "@Facade/Button/Base"
  import InputPrice from "@Facade/Input/Price"
  import StructuralUnit from "@/LTE/Singletons/Dashboard/facades/StructuralUnit"; //// костыль
  import {AssignUserUi, CompanyUi, FileUi} from '@Providers'

  import {mapMutations} from "vuex";

  export default {
    name: 'vx.resource.editing',
    components: {
      Comeback,
      TitleBase,
      InputBase,
      TextArea,
      TitleCaps,
      HeaderAdd,
      CompanyUi,
      ButtonSecondary,
      ButtonBase,
      InputPrice,
      StructuralUnit,
      FileUi,
      AssignUserUi,
    },
    data() {
      return{
        object: null,
        buttonDisable: false,
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
        showSidebar: 'Resources/showSidebarAssign',
      }),
    },
    created() {
      this.object = this.materialObjects.find(el => el.id === this.$route.params.resourceId)
    }
  }
</script>

<style lang="scss" scoped>
  .resource-editing-material-view {
    width: 100%;
    .facade-title-base {
      text-align: center;
      margin-bottom: rem(36);
    }
    .main-plate {
      width: 100%;
      margin-bottom: rem(36);
      padding: 48px 164px 52px;
      box-sizing: border-box;
      background-color: $grey-scale-500;
      border-radius: 16px;
      .facade-input-base {
        border-width: 1px;
        margin-bottom: rem(16);
      }
      .facade-input-text-area{
        margin-bottom: rem(16);
      }
      .facade-title-caps {
        margin-bottom: rem(16);
      }
      .facade-input-price {
        margin-bottom: rem(24);
      }
      .user {
        margin-bottom: 24px;
        .icon-points {
          height: 16px;
          padding: 0 rem(10);
          color: $grey-scale-300;
        }
      }
      .user.facade-header-add::v-deep,
      .owner.facade-header-add::v-deep {
        padding: rem(8) 0;
        margin-bottom: rem(4);
        .icon-add {
          display: none;
        }
      }
      .facade-resource-company {
        margin-bottom: rem(24);
      }
    }
    .create-resource-buttons {
      display: flex;
      justify-content: space-between;
      .create-resource-button {
        width: 222px;
      }
      .facade-button-base::v-deep {
        font-size: 15px;
        &[disable] {
          background-color: $grey-scale-400;
        }
      }
    }
  }
</style>