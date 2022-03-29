<template>
  <div class="resource-material-info-view">
    <comeback @onClick="$router.push({name: 'vx.resource.material.resources'})"/>
    <div class="info-header-group">
      <title-base>{{selectedResource.name}}</title-base>
      <icon-points-vertical @click.native="infoActionListStatus = true" ref="list"/>
      <modal-action-list
          :status="infoActionListStatus"
          :actions="actions"
          @onList="performAction"
          @onClose="infoActionListStatus=false"
      />
    </div>
    <title-caption class="resource-number">{{selectedResource.identifier}}</title-caption>
    <text-base>{{selectedResource.description}}</text-base>
    <div class="resource-price">
      <title-semi>$ {{selectedResource.cost}}</title-semi>
      <title-caption>Стоимость ресурса</title-caption>
    </div>
    <div class="resource-main-info">
      <div class="resource-owner">
        <header-add>
          <template #header-title>Владелец</template>
          <template #header-amount>1</template>
        </header-add>
        <company-ui :data="selectedResource.company"/>
      </div>
      <div class="resource-user">
        <header-add>
          <template #header-title>Пользователь</template>
          <template #header-amount>1</template>
        </header-add>
        <unit-ui :unit-level="selectedResource.worker.unitLevel" :unit-position="selectedResource.worker.unitName" :unit-data="selectedResource.worker"/>
      </div>
    </div>
    <header-add>
      <template #header-title>изображения</template>
      <template #header-amount>{{selectedResource.files.length}}</template>
    </header-add>
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
  import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
  import ModalActionList from "@Facade/Modal/ActionList";
  import {UnitUi, FileUi, CompanyUi} from '@Providers'
  import {mapGetters} from "vuex";

  export default {
    name: 'vx.resource.material.info',
    components: {
      Comeback,
      TitleBase,
      TitleCaption,
      TextBase,
      TitleSemi,
      HeaderAdd,
      CompanyUi,
      ModalActionList,
      FileUi,
      UnitUi
    },
    data() {
      return{
        infoActionListStatus: false,
        fileActionList: ['Редактировать', 'Открыть доступ', 'Переместить'],
        actions: ['Редактировать', 'Отправить на склад'],
      }
    },
    computed: {
      ...mapGetters({
        materialResources: 'Resources/materialResources'
      }),
      selectedResource(){
        return this.materialResources.find(el => el.id === this.$route.params.id)
      }
    },
    methods: {
      performAction(key) {
        switch (key) {
        case 0: this.$router.push({name: 'vx.resource.editing', params: {resourceId: this.$route.params.id}});
        break;
        case 1:
          this.$router.push({name: 'vx.resource.material.resources', params: {resourceId: this.$route.params.id}})
                this.materialResources.splice(+this.$route.params.id, 1)
        }
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
    .facade-header-add::v-deep {
      margin-bottom: rem(4);
      padding: rem(8) 0;
      .icon-add {
        display: none;
      }
    }
    .resource-file-ui {
      margin-bottom: rem(8);
    }
    .container-sidebar-structure-unit::v-deep{
      .facade-input-checkbox {
        display: none;
      }
    }
  }
</style>