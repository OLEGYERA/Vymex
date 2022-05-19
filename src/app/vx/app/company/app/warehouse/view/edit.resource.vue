<template>
  <div class="warehouse-editing-resource-view">
    <comeback @onClick="exit"/>
    <title-base>Редактирование ресурса</title-base>
    <div class="main-plate">
      <input-base labeled :placeholder="'Название'" :model="resource.name" @onInput="editResource(['name', $event])"/>
      <input-base labeled :placeholder="'Серийный номер'" :model="resource.identifier" @onInput="editResource(['identifier', $event])"/>
      <text-area labeled :placeholder="'Описание'" :max-length="1000" :model="resource.description" @onInput="editResource(['description', $event])"/>
      <title-caps>Стоимость ресурса</title-caps>
      <input-price :model="resource.cost" @onInput="editResource(['cost', $event])"/>

<!--      <div class="user">-->
<!--        <list-header title="Пользователь" :title-count="resource.worker.id ? 1 : 0" @onAction="showSidebar()" :add="!resource.worker.id"/>-->
<!--        <unit-setting-ui :unit-level="resource.worker.unitLevel" :unit-data="resource.worker" :unit-position="resource.worker.unitName"/>-->
<!--      </div>-->
      <!--      <assign-user-ui/>-->

      <list-header title="Владелец" :title-count="1" :add="false"/>
      <company-ui :company="resource.company"/>

      <list-header title="изображения" />
      <file-ui/>
    </div>

    <div class="create-resource-buttons">
      <button-secondary @onClick="exit" class="create-resource-button">Отмена</button-secondary>
      <button-base class="create-resource-button" :disable="buttonDisable" @onClick="editMaterialResource">
        Сохранить
      </button-base>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
  import Comeback from "@Facade/Navigation/Comeback";
  import TitleBase from "@Facade/Title/Base";
  import InputBase from "@Facade/Input/Base"
  import TextArea from "@Facade/Input/TextArea"
  import TitleCaps from "@Facade/Title/Caps"
  import ButtonSecondary from "@Facade/Button/Secondary"
  import ButtonBase from "@Facade/Button/Base"
  import InputPrice from "@Facade/Input/Price"
  import ListHeader from "@Facade/Navigation/ListHeader";
  import {CompanyUi, FileUi, UnitSettingUi} from '@Providers'
  ///AssignUserUi,
  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'vx.warehouse.resource.editing',
    components: {
      Comeback,
      TitleBase,
      InputBase,
      TextArea,
      TitleCaps,
      CompanyUi,
      ButtonSecondary,
      ButtonBase,
      InputPrice,
      FileUi,
      // AssignUserUi,
      UnitSettingUi,
      ListHeader
    },
    data() {
      return{
        buttonDisable: false,
      }
    },
    computed: {
      ...mapGetters({
        warehouse: 'WareHouse/getWarehouse'
      }),
      resource(){
        return this.warehouse.find(resource => resource.id === +this.$route.params.id)
      }
    },
    methods: {
      ...mapMutations({
        showSidebar: 'Resources/showSidebarAssign',
        editResource: 'Resources/editResource',
      }),
      editMaterialResource(){
        // this.$core.execViaComponent('Resources', 'editMaterial')
        // this.$router.push({name: 'vx.resource.material.resources'})
      },
      exit() {
        this.$router.back()
        this.clearChosenMaterialResource()
      }
    },
    mounted() {
      console.log(this.resource, 'resource')
    }
  }
</script>

<style lang="scss" scoped>
  .warehouse-editing-resource-view {
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
        margin-bottom: rem(24);
      }
      .facade-input-text-area{
        margin-bottom: rem(24);
      }
      .facade-title-caps {
        margin-bottom: rem(16);
      }
      .facade-input-price {
        margin-bottom: rem(24);
      }
      .user {
        margin-bottom: 24px;
      }
      .facade-navigation-list-header {
        height: 36px;
        margin-bottom: rem(4);
      }
      .resource-company-ui {
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