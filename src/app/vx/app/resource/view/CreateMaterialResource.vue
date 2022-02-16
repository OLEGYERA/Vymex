<template>
  <div class="resource-create-material-resource-view">
    <comeback @onClick="$router.push({name: 'vx.resource.material.resources'})"/>
    <title-base>Создать ресурс</title-base>
    <div class="resource-main-plate">
      <input-base :model="newResource.name" labeled :placeholder="'Название'"/>
      <input-base :model="newResource.number" labeled :placeholder="'Серийный номер'"/>
      <text-area :model="newResource.description" :max-length="1000" placeholder="Описание" labeled/>
      <title-caps>Стоимость ресурса</title-caps>
      <input-price :model="newResource.price"/>
      <header-add class="user" @create="showSidebar()">
        <template #header-title>Пользователь</template>
      </header-add>
      <assign-user-ui :levels="levels"/>
      <modal-base :status="modalStatus" @onClose="modalStatus=false">
        <template #title>
          Назначить пользователя
        </template>
        <template #description>
          Вы собираетесь передать ресурс:
        </template>
        <template #content>
          <title-caps class="modal-subtitle">Ресурс</title-caps>
          <div class="resource-plate">
            <title-sub>ddd</title-sub>
            <title-caps>ddd</title-caps>
          </div>
          <title-caps class="modal-subtitle">Пользователь</title-caps>
          <div class="user-plate" :class="{level1: levels.level===1, level2: levels.level===2, level3: levels.level===3, level4: levels.level===4}">
            <title-sub></title-sub>
            <title-caps></title-caps>
          </div>
        </template>
        <template #button-accept>
          Подтвердить
        </template>
      </modal-base>
      <header-add class="owner">
        <template #header-title>Владелец</template>
        <template #header-amount>1</template>
      </header-add>
      <company :company="newResource.owner"/>
      <header-add class="">
        <template #header-title>изображения</template>
      </header-add>
    </div>
    <div class="create-resource-buttons">
      <button-secondary class="create-resource-button">Отмена</button-secondary>
      <button-base class="create-resource-button" :disable="buttonDisable">Создать ресурс</button-base>
    </div>
  </div>
</template>

<script>
  import Comeback from "@Facade/Navigation/Comeback";
  import TitleBase from "@Facade/Title/Base";
  import InputBase from "@Facade/Input/Base"
  import TextArea from "@Facade/Input/TextArea"
  import TitleCaps from "@Facade/Title/Caps"
  import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
  import Company from "@/LTE/Singletons/Resources/facades/Company";
  import ButtonSecondary from "@Facade/Button/Secondary"
  import ButtonBase from "@Facade/Button/Base"
  import InputPrice from "@Facade/Input/Price"
  import ModalBase from "@Facade/Modal/Base"
  import TitleSub from "@Facade/Title/Sub"

  import {AssignUserUi} from '@Providers'

  import {mapMutations} from "vuex";

  export default {
    name: 'vx.resource.material.create',
    components: {
      Comeback,
      TitleBase,
      InputBase,
      TextArea,
      TitleCaps,
      HeaderAdd,
      Company,
      ButtonSecondary,
      ButtonBase,
      InputPrice,
      AssignUserUi,
      ModalBase,
      TitleSub
    },
    data() {
      return{
        buttonDisable: true,
        modalStatus: true,
        levels: [
          {
            level: 1, showContext: true, checkedLevel: false, data: [
              {
                avatar: require('@/assets/img/icons/avatar.svg'),
                name: "Александр Ким", position: "Должность", color: "#D5F1C5",
                checkedPosition: false
              },
            ]
          },
          {
            level: 2, showContext: false, checkedLevel: false, data: [
              {
                avatar: require('@/assets/img/icons/avatar.svg'),
                name: "Александр Ким", position: "Должность", color: "#FEF0BD",
                checkedPosition: false
              },
            ]
          },
          {
            level: 3, showContext: false, checkedLevel: false, data: [
              {
                avatar: require('@/assets/img/icons/avatar.svg'),
                name: "Александр Ким", position: "Должность", color: "#BAE7FF",
                checkedPosition: false
              },
              {
                avatar: require('@/assets/img/icons/avatar.svg'),
                name: "Александр Ким", position: "Должность", color: "#BAE7FF",
                checkedPosition: false
              },
              {
                avatar: require('@/assets/img/icons/avatar.svg'),
                name: "Александр Ким", position: "Должность", color: "#BAE7FF",
                checkedPosition: false
              },
              {
                avatar: require('@/assets/img/icons/avatar.svg'),
                name: "Александр Ким", position: "Должность", color: "#BAE7FF",
                checkedPosition: false
              },
              {
                avatar: require('@/assets/img/icons/avatar.svg'),
                name: "Александр Ким", position: "Должность", color: "#BAE7FF",
                checkedPosition: false
              },
              {
                avatar: require('@/assets/img/icons/avatar.svg'),
                name: "Александр Ким", position: "Должность", color: "#BAE7FF",
                checkedPosition: false
              },
            ]
          },
          {
            level: 4, showContext: false, checkedLevel: false, data: [
              {
                avatar: require('@/assets/img/icons/avatar.svg'),
                name: "Александр Ким", position: "Должность", color: "#F2CBF8",
                checkedPosition: false
              },
              {
                avatar: require('@/assets/img/icons/avatar.svg'),
                name: "Александр Ким", position: "Должность", color: "#F2CBF8",
                checkedPosition: false
              },            {
                avatar: require('@/assets/img/icons/avatar.svg'),
                name: "Александр Ким", position: "Должность", color: "#F2CBF8",
                checkedPosition: false
              },            {
                avatar: require('@/assets/img/icons/avatar.svg'),
                name: "Александр Ким", position: "Должность", color: "#F2CBF8",
                checkedPosition: false
              },            {
                avatar: require('@/assets/img/icons/avatar.svg'),
                name: "Александр Ким", position: "Должность", color: "#F2CBF8",
                checkedPosition: false
              },
              {
                avatar: require('@/assets/img/icons/avatar.svg'),
                name: "Александр Ким", position: "Должность", color: "#F2CBF8",
                checkedPosition: false
              },            {
                avatar: require('@/assets/img/icons/avatar.svg'),
                name: "Александр Ким", position: "Должность", color: "#F2CBF8",
                checkedPosition: false
              },            {
                avatar: require('@/assets/img/icons/avatar.svg'),
                name: "Александр Ким", position: "Должность", color: "#F2CBF8",
                checkedPosition: false
              },            {
                avatar: require('@/assets/img/icons/avatar.svg'),
                name: "Александр Ким", position: "Должность", color: "#F2CBF8",
                checkedPosition: false
              },
            ]
          },
        ],
        newResource: {
          name: null,
          number: null,
          description: null,
          user: {
            name: null,
            position: null,
            level: null,
            img: null
          },
          owner: {
            name: 'Arxel',
            img: require('@/assets/img/my/process.svg'),
          },
          price: null
        }
      }
    },
    methods: {
      ...mapMutations({
        showSidebar: 'Resources/showSidebarAssign',
      }),
    },
  }
</script>

<style lang="scss" scoped>
  .resource-create-material-resource-view {
    width: 100%;
    .facade-title-base {
      text-align: center;
      margin-bottom: rem(36);
    }
    .resource-main-plate {
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
      .facade-text-area::v-deep {
        margin-bottom: rem(16);

        .textarea-title{
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
        }
        .textarea-container{
          min-height: 96px;
        }
      }
      .resource-price {
        margin-bottom: rem(16);
      }
      .facade-input-price {
        margin-bottom: rem(24);
      }
      .facade-modal-base::v-deep{
        .modal-base-body{
          height: max-content;
        }
        .modal-subtitle{
          padding: rem(8) 0;
          margin-bottom: rem(4);
        }
        .resource-plate{
          padding: rem(8) rem(16);
          margin-bottom: rem(12);
          border-radius: 8px;
          background-color: $grey-scale-400;
          .facade-title-sub{
            margin-bottom: rem(4);
          }
          .facade-title-caps{
            font-weight: 400;
          }
        }
        .user-plate{
          padding: rem(8) rem(16);
          border-radius: 8px;
          .facade-title-sub{
            margin-bottom: rem(4);
          }
          .facade-title-caps{
            font-weight: 400;
          }
        }
      }
      .user {
        margin-bottom: 24px;
      }
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