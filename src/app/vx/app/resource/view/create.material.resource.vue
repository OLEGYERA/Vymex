<template>
  <div class="resource-create-material-resource-view">
    <comeback @onClick="saveChanges"/>
    <title-base>Создать ресурс</title-base>
    <div class="resource-main-plate">
      <input-base :model="newResource.name" labeled :placeholder="'Название'" @onInput="setValue('name', $event)"/>
      <input-base :model="newResource.number" labeled :placeholder="'Серийный номер'" @onInput="setValue('number', $event)"/>
      <text-area :model="newResource.description" :max-length="1000" placeholder="Описание" labeled @onInput="setValue('description', $event)"/>
      <title-caps>Стоимость ресурса</title-caps>
      <input-price :model="newResource.price"/>
      <header-add class="user" @create="showSidebar()">
        <template #header-title>Пользователь</template>
      </header-add>

      <assign-user-ui :levels="levels" :status="assignStatus"/>

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
      <company-ui :company="newResource.owner"/>
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
      <button-base class="create-resource-button" :disable="buttonDisable"  @onClick="$router.push({name: 'vx.resource.material.resources'})">
        Создать ресурс
      </button-base>
    </div>
    <modal-base :status="modalSaveStatus"
                @onClose="$router.push({name: 'vx.resource.material.resources'})"
                class="modal-save"
                @onOk="$router.push({name: 'vx.resource.material.resources'})">
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
  import TextArea from "@Facade/Input/TextArea"
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

  import {AssignUserUi, CompanyUi} from '@Providers'

  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'vx.resource.material.create',
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
      AssignUserUi,
      ModalBase,
      TitleSub,
      IconAdd,
      TextBase,
      TitleCaption
    },
    data() {
      return{
        modalStatus: false,
        modalSaveStatus: false,
        modalDownload: false,
        newResource: {
          name: null,
          number: null,
          description: null,
          user: {
            name: null,
            position: null,
            level: null,
            avatar: null
          },
          owner: {
            name: 'Arxel',
            avatar: require('@/assets/img/my/process.svg'),
          },
          price: null
        }
      }
    },
    methods: {
      ...mapMutations({
        showSidebar: 'Resources/showSidebarAssign',
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
          this.$router.push({name: 'vx.resource.material.resources'})
        }
      }
    },
    computed:{
      ...mapGetters({
        levels: 'Resources/levels',
        assignStatus: 'Resources/sidebarAssignStatus'
      }),
      buttonDisable(){
        if(this.newResource.name && this.newResource.number){
          return false
        }
        return true
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
    .modal-download{
      .download-plate{
        display: flex;
        align-items: center;
        padding: rem(8);
        margin-bottom: rem(12);
        border-radius: 8px;
        background-color: $grey-scale-400;
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
          cursor: pointer;
          .icon-add::v-deep{
            color: #fff;
            svg{
              height: 14px;
              width: 14px;
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