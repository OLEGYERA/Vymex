<template>
  <div class="privilege-structure-view">
    <div class="navigation-buttons">
      <navigation-comeback @onClick="$router.push({name: 'vx.co.control-center.privilege'})"/>
      <navigation-close @onClick="$router.push({name: 'vx.co.control-center.privilege'})"/>
    </div>

    <title-base>Структура компании</title-base>
    <text-base class="privilege-structure-subtitle">
      Здесь вы можете найти ответы на все вопросы о работе <br/> системы
    </text-base>

    <div class="structure-main-plate">
      <input-search placeholder="Поиск"/>
      <list-header :add="false" title="структурные единицы" :title-count="2"/>

      <title-caps class="structure-level-subtitle">2 уровень</title-caps>
      <div class="structure-level-group">
        <unit-privilege-ui @onClick="modalBaseStatus = true" :privilege-type="2" :unit-level="2" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}" unit-position="Head of Front-End"/>
      </div>

      <title-caps class="structure-level-subtitle">3 уровень</title-caps>
      <div class="structure-level-group">
        <unit-privilege-ui @onClick="modalBaseStatus = true" :privilege-type="0" :unit-level="3" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}" unit-position="Head of Front-End"/>
        <unit-privilege-ui @onClick="modalBaseStatus = true" :privilege-type="3" :unit-level="3" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}" unit-position="Head of Front-End"/>
      </div>

      <title-caps class="structure-level-subtitle">4 уровень</title-caps>

      <div class="structure-arrow-header" @click="onClick('1')">
        <div class="level-title-arrow">
          <arrow-right :class="{'open-units': open1}"/>
        </div>
        <title-caps>Должность <span class="title-amount">2</span></title-caps>
      </div>

      <div class="structure-level-group"  v-if="open1">
        <unit-privilege-ui @onClick="modalBaseStatus = true" :privilege-type="2" :unit-level="4" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}" unit-position="Head of Front-End"/>
        <unit-privilege-ui @onClick="modalBaseStatus = true" :privilege-type="1" :unit-level="4" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}" unit-position="Head of Front-End"/>
      </div>

      <div class="structure-arrow-header" @click="onClick('2')">
        <div class="level-title-arrow">
          <arrow-right :class="{'open-units': open2}"/>
        </div>
        <title-caps>Должность <span class="title-amount">25</span></title-caps>
      </div>

      <div class="structure-level-group"  v-if="open2">
        <unit-privilege-ui @onClick="modalBaseStatus = true" :privilege-type="2" :unit-level="4" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}" unit-position="Head of Front-End"/>
        <unit-privilege-ui @onClick="modalBaseStatus = true" :privilege-type="1" :unit-level="4" :unit-data="{id: 5, avatar: null, name: 'Олег', lastname: 'Герасименко'}" unit-position="Head of Front-End"/>
      </div>
    </div>

    <modal-base :status="modalBaseStatus" @onClose="modalBaseStatus = false" @onOk="modalBaseStatus = false">
      <template #title>
        Предоставить доступ
      </template>
      <template #description>Укажите какие возможности будут у С.Е.</template>
      <template #content>
        <div class="unit-info-box">
          <title-base>Мишель Довер</title-base>
          <text-base>Занимает должности</text-base>
          <div class="level-box">
            <title-sub>Должность 3 уровня</title-sub>
          </div>
        </div>
        <div class="modal-actions">
          <div class="modal-action-unit"
               v-for="(title, titleKey) in checkboxTitles"
               :key="titleKey"
               :class="{active: titleKey === activeButton}"
               @click="activeButton = titleKey">
            <text-base>{{ title }}</text-base>
            <input-checkbox :model="titleKey === activeButton"/>
          </div>
        </div>
      </template>
      <template #button-accept>Сохранить изменения</template>
    </modal-base>
  </div>
</template>

<script>
  /*eslint-disable*/
  import NavigationComeback from '@Facade/Navigation/Comeback'
  import TitleBase from '@Facade/Title/Base'
  import TextBase from '@Facade/Text/Base'
  import InputSearch from "@Facade/Input/Search";
  import ListHeader from "@Facade/Navigation/ListHeader";
  import TitleSub from "@Facade/Title/Sub";
  import ArrowRight from "@Icon/ArrowRight";
  import ModalBase from "@Facade/Modal/Base"
  import InputCheckbox from '@Facade/Input/Checkbox'

  import {UnitPrivilegeUi} from '@Providers'


  import TitleSemi from '@Facade/Title/Semi'
  import TitleCaption from '@Facade/Title/Caption'
  import ButtonBase from '@Facade/Button/Base'
  import TitleCaps from '@Facade/Title/Caps'
  import ImageAvatar from '@Facade/Image/Avatar'
  import NavigationClose from '@Facade/Navigation/Close'

  export default {
    name: 'vx.co.control-center.privilege.structure.view',
    components:
        {NavigationComeback, NavigationClose, TitleBase, TextBase, InputSearch, ListHeader, TitleCaps,
          UnitPrivilegeUi, TitleSub, ArrowRight, ModalBase, InputCheckbox
    },
    data: () => ({
      open1: false,
      open2: false,
      modalBaseStatus: false,
      checkboxTitles: ['Просматривать', 'Редактировать', 'Администрировать'],
      activeButton: 0,
    }),
    methods: {
      onClick(key){
        this[`open${key}`] = !this[`open${key}`]
      },
    }
  }
</script>

<style lang="scss" scoped>
  .privilege-structure-view{
    .navigation-buttons{
      display: flex;
      justify-content: space-between;
    }
    .facade-title-base{
      margin-bottom: 12px;
      text-align: center;
    }
    .privilege-structure-subtitle{
      margin-bottom: 24px;
      text-align: center;
    }
    .structure-main-plate{
      padding: 48px 164px;
      background-color: $grey-scale-500;
      border-radius: 16px;

      .facade-input-search{
        margin-bottom: 26px;
      }
      .facade-navigation-list-header{
        margin-bottom: 20px;
      }
      .structure-level-subtitle{
        margin-bottom: 14px;
      }

      .structure-level-group{
        margin-bottom: 30px;
      }

      .structure-arrow-header{
        padding: 4px 0;
        display: flex;
        align-items: center;
        height: 28px;
        margin-bottom: 4px;
        cursor: pointer;
        .level-title-arrow{
          border-right: 1px solid $grey-scale-200;
          margin-right: 8px;
          .icon-arrow-right{
            display: flex;
            color: $grey-scale-200;
            height: 16px;
            margin-right: 12px;
            transition: transform .2s;
            svg {
              align-self: center;
              height: 14px;
            }
          }
          .open-units{
            transform: rotate(90deg);
          }
        }
        .title-amount{
          color: $blue;
        }
      }
    }

    .facade-modal-base::v-deep{
      .modal-base-header{
        margin-bottom: 8px;
      }
      .modal-base-content{
        margin-bottom: 48px;
      }
      .unit-info-box{
        padding: 24px;
        margin-bottom: 24px;
        background-color: $grey-scale-400;
        border-radius: 16px;

        .facade-title-base{
          margin-bottom: 12px;
        }

        .facade-text-base{
          margin: 0 auto 8px;
          width: max-content;
        }

        .level-box{
          margin: 0 auto;
          width: max-content;
          padding: 4px 12px;
          border-radius: 14px;
          background-color: $su-level-3;
          .facade-title-sub{
            color: $grey;
          }
        }
      }

      .modal-actions{
        .modal-action-unit {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
          padding: 12px 16px;
          border-radius: 8px;
          background-color: $grey-scale-500;
          cursor: pointer;

          &:hover{
            background-color: rgba($grey-scale-400, .4);
          }

          &.active{
            background-color: $grey-scale-400;
            .facade-text-base {
              color: #fff;
              font-weight: 600;
            }
          }
        }
      }
    }
  }
</style>