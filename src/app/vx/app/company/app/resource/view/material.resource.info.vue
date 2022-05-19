<template>
  <div class="resource-material-info-view">
    <comeback @onClick="exit"/>
    <div class="info-header-group">
      <title-base>{{selectedResource.name}}</title-base>
      <icon-points-vertical @click.native="actionStatus = true" ref="list"/>

      <modal-action-list
          :status="actionStatus"
          :actions="actions"
          @onList="performAction"
          @onClose="actionStatus=false"
          @onDelete="modalBaseStatus = true"
      />

      <modal-base :status="modalBaseStatus"
                  @onClose="modalBaseStatus=false"
                  class="modal-delete"
                  @onOk="deleteResource">
        <template #title>
          Удалить ресурс?
        </template>
        <template #description>
          Это действие необратимо
        </template>
        <template #content>
          <title-caps class="modal-subtitle">Ресурс</title-caps>
          <div class="delete-resource-plate">
            <title-sub>{{selectedResource.name}}</title-sub>
            <title-caption>{{selectedResource.identifier}}</title-caption>
          </div>
        </template>
        <template #button-accept>
          Удалить
        </template>
      </modal-base>
    </div>
    <title-caption class="resource-number">{{selectedResource.identifier}}</title-caption>
    <text-base>{{selectedResource.description}}</text-base>
    <div class="resource-price">
      <title-semi>$ {{selectedResource.cost}}</title-semi>
      <title-caption>Стоимость ресурса</title-caption>
    </div>
    <div class="resource-main-info">

      <div class="resource-owner">
        <list-header title="Владелец" :add="false" :title-count="1"/>
        <company-ui :company="selectedResource.company"/>
      </div>

      <div class="resource-user">
        <list-header title="Пользователь" :add="false" :title-count="1"/>
        <unit-ui :unit-level="selectedResource.worker.unitLevel" :unit-position="selectedResource.worker.unitName" :unit-data="selectedResource.worker"/>
      </div>
    </div>

    <list-header v-if="selectedResource.files.length + selectedResource.images.length"
                 title="изображения"
                 :add="false"
                 :title-count="selectedResource.files.length + selectedResource.images.length"/>
    <file-ui v-for="(file, key) in selectedResource.files" :file="file" :key="key" :actions="fileActionList"/>
  </div>
</template>

<script>
  /*eslint-disable*/
  import Comeback from "@Facade/Navigation/Comeback";
  import TitleBase from "@Facade/Title/Base"
  import TitleCaption from "@Facade/Title/Caption"
  import TextBase from "@Facade/Text/Base"
  import TitleSemi from "@Facade/Title/Semi"
  import ModalActionList from "@Facade/Modal/ActionList";
  import ModalBase from "@Facade/Modal/Base"
  import TitleSub from "@Facade/Title/Sub"
  import TitleCaps from "@Facade/Title/Caps"
  import ListHeader from "@Facade/Navigation/ListHeader";

  import {UnitUi, FileUi, CompanyUi} from '@Providers'
  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'vx.resource.material.info',
    components: {
      Comeback,
      TitleBase,
      TitleCaption,
      TextBase,
      TitleSemi,
      CompanyUi,
      ModalActionList,
      FileUi,
      UnitUi,
      ModalBase,
      TitleSub,
      TitleCaps,
      ListHeader
    },
    data() {
      return{
        actionStatus: false,
        fileActionList: ['Редактировать', 'Открыть доступ', 'Переместить'],
        actions: ['Редактировать', 'Отправить на склад'],
        modalBaseStatus: false
      }
    },
    computed: {
      ...mapGetters({
        // materialResources: 'Resources/materialResources',
        selectedResource: 'Resources/getChosenMaterialResource'
      }),
    },
    methods: {
      ...mapMutations({
        clearChosenMaterialResource: 'Resources/clearChosenMaterialResource',
      }),
      performAction(key) {
        if(key === 0) {
          this.$router.push({name: 'vx.resource.editing'});
        }
        if(key === 1) {
          this.$core.execViaComponent('Resources', 'moveToWarehouse', this.selectedResource.id)
          this.$router.push({name: 'vx.resource.material.resources'})
        }
      },
      deleteResource(){
        this.modalBaseStatus = false
        this.$core.execViaComponent('Resources', 'deleteMaterial', this.selectedResource.id)
        this.$router.push({name: 'vx.resource.material.resources'})
      },
      exit() {
        this.$router.back()
        this.clearChosenMaterialResource()
      }
    },
  }
</script>

<style lang="scss" scoped>
  .resource-material-info-view {
    width: 100%;
    .info-header-group {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: rem(8);
      .icon-points-vertical{
        color: #fff;
        padding: 0 rem(10);
        height: 16px;
        cursor: pointer;
      }
      .facade-modal-action-list::v-deep {
        right: 4px;
        .action-list-body{
          transform: translateX(-100%);
          top: 7px;
        }
      }
    }
    .resource-number{
      margin-bottom: rem(24);
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
    .facade-navigation-list-header {
      margin-bottom: rem(4);
      height: 36px;
    }
    .resource-file-ui {
      margin-bottom: rem(8);
    }

    .modal-delete{
      .delete-resource-plate{
        padding: rem(8) rem(16);
        border-radius: 8px;
        height: 56px;
        box-sizing: border-box;
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