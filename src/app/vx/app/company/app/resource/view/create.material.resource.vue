<template>
  <div class="resource-create-material-resource-view">
    <comeback @onClick="saveChanges"/>
    <title-base>Создать ресурс</title-base>

    <div class="resource-main-plate">
      <input-base :model="newResource.name" labeled :placeholder="'Название'" @onInput="setCreatorMaterial(['name', $event])"/>
      <input-base :model="newResource.identifier" labeled :placeholder="'Серийный номер'" @onInput="setCreatorMaterial(['identifier', $event])"/>
      <input-textarea :model="newResource.description" :max-length="1000" placeholder="Описание" labeled @onInput="setCreatorMaterial(['description', $event])"/>
      <title-caps class="resource-price">Стоимость ресурса</title-caps>
      <input-price :model="newResource.cost" @onInput="setCreatorMaterial(['cost', $event])"/>

      <list-header title="Пользователь" :title-count="newResource.workerId ? 1 : 0" @onAction="showSidebar()" :add="!newResource.workerId"/>
      <div class="resource-user">
        <unit-setting-ui v-if="Object.keys(user).length"
                         :unit-level="user.unitLevel"
                         :unit-data="user"
                         :unit-position="user.unitName"
                         @onDelete="deleteUnit"
        />
      </div>

      <assign-user-ui :status="assignStatus" :structure="structure" @chooseUser="setWorker"/>

      <modal-base :status="modalStatus" @onClose="modalStatus = false" @onOk="confirmWorker">
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
            <title-caps>{{newResource.identifier}}</title-caps>
          </div>
          <title-caps class="modal-subtitle">Пользователь</title-caps>
          <unit-ui :unit-level="selectedUser.unitLevel" :unit-data="selectedUser" :unit-position="selectedUser.unitName"/>
        </template>
        <template #button-accept>
          Подтвердить
        </template>
      </modal-base>

      <list-header title="Владелец" :title-count="1" :add="false"/>
      <company-ui :company="currentCompany.base"/>

      <list-header title="изображения"
                   :title-count="newResource.fileIds.length + newResource.imageIds.length"
                   @onAction="modalDownload=true"/>

      <modal-base :status="modalDownload" @onClose="modalDownload=false" class="modal-download" @onOk="modalDownload=false">
        <template #title>
          Загрузить файлы
        </template>
        <template #description>
          Файлы которые вы выберете будут прикреплены к ресурсу
        </template>
        <template #content>
          <title-caps class="modal-subtitle">изображения</title-caps>
          <input type="file" class="file" ref="uploadedFile4Test" @change="onChange"/>
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
      <button-secondary class="create-resource-button" @onClick="saveChanges">
        Отмена
      </button-secondary>
      <button-base class="create-resource-button" :disable="!newResource.name" @onClick="createResource">
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
          <title-caption>{{newResource.identifier}}</title-caption>
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
  import ListHeader from "@Facade/Navigation/ListHeader";
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
      UnitSettingUi,
      ListHeader
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
        assignStatus: 'Resources/sidebarAssignStatus',
        newResource: 'Resources/getCreatorMaterialResource',
        currentCompany: 'Company/getCurrentCompany',
        structure: 'Resources/getStructure',
        user: 'Resources/chosenUser',
      }),
      // buttonDisable(){
      //   if (!this.newResource.name) {
      //     return true
      //   }
      //   return false
      // }
    },
    methods: {
      ...mapMutations({
        showSidebar: 'Resources/showSidebarAssign',
        setCreatorMaterial: 'Resources/setCreatorMaterialResource',
        clear: 'Resources/clear',
        getConfirmedUser: 'Resources/getConfirmedUser'
      }),
      saveChanges(){
        if(this.newResource.name){
          this.modalSaveStatus=true
        } else{
          this.$router.push({name: 'vx.resource.material.resources'})
        }
      },
      createResource() {
        this.$core.execViaComponent('Resources', 'createMaterial');
        this.$router.push({name: 'vx.resource.material.resources'})
      },
      setWorker(id){
        for (const level in this.structure) {
          if (this.structure[level].some(unit => unit.id === id)){
            this.selectedUser = this.structure[level].find(unit => unit.id === id)
          }
        }
        this.modalStatus = true
      },
      confirmWorker(){
        this.setCreatorMaterial(['workerId', this.selectedUser.id])
        this.getConfirmedUser(this.selectedUser)
        this.modalStatus = false
      },
      onClose(){
        this.$router.push({name: 'vx.resource.material.resources'})
      },
      onOk() {
        this.$core.execViaComponent('Resources', 'createMaterial');
        // this.$notify({text: 'Ресурс успешно создан', type: 'success', duration: 3000, speed: 500})
        this.$router.push({name: 'vx.resource.material.resources'})
      },
      deleteUnit(){
        this.getConfirmedUser({})
        this.setCreatorMaterial(['workerId', null])
      },
      onChange() {
        this.$core.execViaComponent('Uploader', 'init',[
          this.$refs.uploadedFile4Test.files[0],
          this.handleUploadOnprogress, null,
          this.handleUploaderOnload
        ])
      },
      handleUploadOnprogress(progress){
        console.log(progress, 'handleUploadOnprogress')
      },
      handleUploaderOnload(fileId){
        console.log(fileId, 'handleUploaderOnload')
        // this.setCreator(['logo', fileId])
        // this.avatarReady = true;
      },
    },
    created() {
      this.setCreatorMaterial(['companyId', this.currentCompany.base.id])
      this.$core.execViaComponent('Resources', 'getStructure', this.currentCompany.base.id);
    },
    destroyed() {
      this.clear()
      this.getConfirmedUser({})
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
          height: 52px;
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
      .facade-navigation-list-header{
        height: 36px;
        margin-bottom: 4px;
      }
      .resource-user{
        margin-bottom: 24px;
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
        height: 52px;
        box-sizing: border-box;
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