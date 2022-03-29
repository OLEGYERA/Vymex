<template>
  <div class="resource-create-material-resource-view">
    <comeback @onClick="saveChanges"/>
    <title-base>Создать ресурс</title-base>

    <div class="resource-main-plate">
      <input-base :model="newResource.name" labeled :placeholder="'Название'" @onInput="setCreatorMaterial(['name', $event])"/>
      <input-base :model="newResource.number" labeled :placeholder="'Серийный номер'" @onInput="setCreatorMaterial(['number', $event])"/>
      <input-textarea :model="newResource.description" :max-length="1000" placeholder="Описание" labeled @onInput="setCreatorMaterial(['description', $event])"/>
      <title-caps class="resource-price">Стоимость ресурса</title-caps>
      <input-price :model="newResource.cost" @onInput="setCreatorMaterial(['cost', $event])"/>

      <header-add class="user" @create="showSidebar()">
        <template #header-title>Пользователь</template>
      </header-add>
      <div class="resource-user">
        <unit-setting-ui v-if="Object.keys(user).length !== 0" :unit-level="user.unitLevel" :unit-data="user.unitData" :unit-position="user.unitPosition"/>
      </div>

      <assign-user-ui :levels="levels" :status="assignStatus" @chooseUser="setWorker"/>

      <modal-base :status="modalStatus" @onClose="cancelUser" @onOk="confirmWorker">
        <template #title>
          Назначить пользователя
        </template>
        <template #description>
          Вы собираетесь передать ресурс:
        </template>
        <template #content>
          <title-caps class="modal-subtitle">Ресурс</title-caps>
          <div class="resource-plate">
            <title-sub>{{ newResource.name }}</title-sub>
            <title-caps>{{newResource.number}}</title-caps>
          </div>
          <title-caps class="modal-subtitle">Пользователь</title-caps>
          <unit-ui :unit-level="selectedUser.unitLevel" :unit-data="selectedUser.unitData" :unit-position="selectedUser.unitPosition"/>
        </template>
        <template #button-accept>
          Подтвердить
        </template>
      </modal-base>

      <header-add class="owner">
        <template #header-title>Владелец</template>
        <template #header-amount>{{currentCompany ? '1' : ''}}</template>
      </header-add>
      <company-ui :company="currentCompany.base"/>

      <header-add class="" @create="modalDownload=true">
        <template #header-title>изображения</template>
      </header-add>

      <modal-base :status="modalDownload" @onClose="modalDownload=false" class="modal-download" @onOk="modalDownload=false">
        <template #title>
          Загрузить файлы
        </template>
        <template #description>
          Файлы которые вы выберете будут прикреплены к ресурсу
        </template>
        <template #content>
          <title-caps class="modal-subtitle">изображения</title-caps>
          <input type="file" class="file"/>
          <div class="download-plate">
            <div class="button-add">
              <icon-add/>
            </div>
            <text-base>Выбрать файл</text-base>
          </div>
        </template>
        <template #button-accept>
          Сохранить
        </template>
      </modal-base>
    </div>

    <div class="create-resource-buttons">
      <button-secondary class="create-resource-button" @click.native="saveChanges">
        Отмена
      </button-secondary>
      <button-base class="create-resource-button" @onClick="createResource()">
        Создать ресурс
      </button-base>
    </div>

    <modal-base :status="modalSaveStatus"
                @onClose="onClose"
                class="modal-save"
                @onOk="onOk">
      <template #title>
        Сохранить изменения?
      </template>
      <template #description>
        Данные не сохраняются автоматически
      </template>
      <template #content>
        <title-caps class="modal-subtitle">Ресурс</title-caps>
        <div class="save-resource-plate">
          <title-sub>{{newResource.name}}</title-sub>
          <title-caption>{{newResource.number}}</title-caption>
        </div>
      </template>
      <template #button-cancel>
        Выйти без сохранения
      </template>
      <template #button-accept>
        Сохранить и выйти
      </template>
    </modal-base>
  </div>
</template>

<script>
  import Comeback from "@Facade/Navigation/Comeback";
  import TitleBase from "@Facade/Title/Base";
  import InputBase from "@Facade/Input/Base"
  import TitleCaps from "@Facade/Title/Caps"
  import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd"; /// костыль
  import ButtonSecondary from "@Facade/Button/Secondary"
  import ButtonBase from "@Facade/Button/Base"
  import InputPrice from "@Facade/Input/Price"
  import ModalBase from "@Facade/Modal/Base"
  import TitleSub from "@Facade/Title/Sub"
  import IconAdd from "@Icon/Add"
  import TextBase from "@Facade/Text/Base";
  import TitleCaption from "@Facade/Title/Caption"
  import InputTextarea from "@Facade/Input/TextArea"

  import {AssignUserUi, CompanyUi, UnitUi, UnitSettingUi} from '@Providers'

  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'vx.resource.material.create',
    components: {
      Comeback,
      TitleBase,
      InputBase,
      TitleCaps,
      HeaderAdd,
      CompanyUi,
      ButtonSecondary,
      ButtonBase,
      InputPrice,
      AssignUserUi,
      ModalBase,
      TitleSub,
      IconAdd,
      TextBase,
      TitleCaption,
      InputTextarea,
      UnitUi,
      UnitSettingUi
    },
    data() {
      return{
        modalStatus: false,
        modalSaveStatus: false,
        modalDownload: false,
        selectedUser: {}
      }
    },
    computed:{
      ...mapGetters({
        levels: 'Resources/levels',
        assignStatus: 'Resources/sidebarAssignStatus',
        newResource: 'Resources/getCreatorMaterialResource',
        currentCompany: 'Company/getCurrentCompany',
        structure: 'Resources/getStructure',
        user: 'Resources/chosenUser'
      }),
      // buttonDisable(){
      //   if(!this.newResource.name && !this.newResource.number){
      //     return true
      //   } else {
      //     return true
      //   }
      // }
    },
    methods: {
      ...mapMutations({
        showSidebar: 'Resources/showSidebarAssign',
        setCreatorMaterial: 'Resources/setCreatorMaterialResource',
        clear: 'Resources/clear',
        getConfirmedUser: 'Resources/getConfirmedUser'
      }),
      setValue(stage, data){
        if(data) {
          this.newResource[`${stage}`] = data
        } else {
          this.newResource[`${stage}`] = null
        }
      },
      saveChanges(){
        if(this.newResource.name && this.newResource.number){
          this.modalSaveStatus=true
        } else{
          this.clear()
          this.getConfirmedUser({})
          this.$router.push({name: 'vx.resource.material.resources'})
        }
      },
      createResource() {
        this.$core.execViaComponent('Resources', 'createMaterial');
        this.clear()
        this.getConfirmedUser({})
        this.$router.push({name: 'vx.resource.material.resources'})
      },
      setWorker(unitKey, personKey){
        console.log('unitKey', unitKey, 'personKey', personKey)
        this.selectedUser = this.levels[unitKey].data[personKey]
        this.modalStatus = true
      },
      confirmWorker(){
        this.setCreatorMaterial(['workerId', this.selectedUser.unitData.id])
        this.getConfirmedUser(this.selectedUser)
        this.modalStatus = false
      },
      cancelUser(){
        this.chosenUser = {}
        this.modalStatus = false
        console.log('this.chosenUser:', this.chosenUser)
      },
      onClose(){
        this.clear()
        this.getConfirmedUser({})
        this.$router.push({name: 'vx.resource.material.resources'})
      },
      onOk() {
        this.$core.execViaComponent('Resources', 'createMaterial');
        this.clear()
        this.getConfirmedUser({})
        this.$router.push({name: 'vx.resource.material.resources'})
      }
    },
    created() {
      this.$core.execViaComponent('Resources', 'getStructure', this.currentCompany.base.id);
      this.setCreatorMaterial(['companyId', this.currentCompany.base.id])
    },

    watch: {
      newResourceName(){
        return !this.newResource.name
      },
      newResourceNumber() {
        return !this.newResource.number
      }
    }
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
      .facade-input-text-area::v-deep {
        margin-bottom: rem(16);

        .textarea-title{
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
        }
        .textarea-container{
          min-height: 96px;
          border-width: 1px;
        }
      }
      .resource-price {
        margin-bottom: rem(16);
      }
      .facade-input-price {
        margin-bottom: rem(24);
      }
      .facade-modal-base::v-deep{
        .modal-subtitle{
          padding: rem(8) 0;
          margin-bottom: rem(4);
        }
        .resource-plate{
          padding: rem(8) rem(16);
          min-height: 52px;
          box-sizing: border-box;
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
      }
      .user {
        margin-bottom: 4px;
      }
      .resource-user{
        margin-bottom: 24px;
      }
      .owner.facade-header-add::v-deep {
        padding: rem(8) 0;
        margin-bottom: rem(4);
        .icon-add {
          display: none;
        }
      }
      .resource-company-ui {
        margin-bottom: rem(24);
      }
    }
    .modal-download ::v-deep{
      .modal-base-content{
        position: relative;
        .file{
          box-sizing: border-box;
          height: 52px;
          width: 100%;
          opacity: 0;
          position: absolute;
          cursor: pointer;
        }
        .download-plate{
          display: flex;
          align-items: center;
          padding: rem(8);
          margin-bottom: rem(12);
          border-radius: 8px;
          background-color: $grey-scale-400;
          .facade-text-base {
            color: #fff;
          }
          .button-add{
            display: inherit;
            height: 36px;
            width: 36px;
            border-radius: 50%;
            border: 2px solid $grey-scale-300;
            align-items: inherit;
            justify-content: center;
            box-sizing: border-box;
            margin-right: 12px;
            .icon-add{
              color: #fff;
              svg{
                height: 12px;
                width: 14px;
              }
            }
          }
        }
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
    .modal-save{
      .save-resource-plate{
        padding: rem(8) rem(16);
        border-radius: 8px;
        background-color: $grey-scale-400;
        margin-bottom: 12px;
        .facade-title-sub{
          margin-bottom: 4px;
        }
      }
      .facade-title-caps{
        padding: rem(8) 0;
        margin-bottom: 4px;
      }
    }
  }

</style>