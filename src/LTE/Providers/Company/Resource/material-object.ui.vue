<template>
  <div class="resource-material-object-ui" @click.stop="$emit('onClick')">
    <div class="object-main-plate">
      <div class="object-text-group">
        <text-base>{{resourceName}}</text-base>
        <title-caption>{{resourceIdentifier}}</title-caption>
      </div>
      <div class="object-user-name" :class="`su-level-${worker.unitLevel}`">
         {{worker.name ? `${worker.name} ${worker.lastname}` : 'Нет пользователя'}}
      </div>
    </div>
    <icon-points-vertical @click.native.stop="actionListStatus=true"/>
    <modal-action-list
        :actions="actions"
        :status="actionListStatus"
        @onClose="actionListStatus=false"
        @onDelete="modalStatus = true"
        @onList="makeAction"/>

    <modal-base :status="modalStatus"
                @onClose="modalStatus=false"
                class="modal-delete"
                @onOk="deleteResource">
      <template #title>
        Удалить ресурс?
      </template>
      <template #description>
        Это действие не обратимо
      </template>
      <template #content>
        <title-caps class="modal-subtitle">Ресурс</title-caps>
        <div class="delete-resource-plate">
          <title-sub>{{resourceName}}</title-sub>
          <title-caption>{{resourceIdentifier}}</title-caption>
        </div>
      </template>
      <template #button-accept>
        Удалить
      </template>
    </modal-base>
  </div>
</template>

<script>
  import TextBase from '@Facade/Text/Base'
  import TitleCaption from '@Facade/Title/Caption'
  import IconPointsVertical from "@Icon/PointsVertical"
  import ModalActionList from "@Facade/Modal/ActionList";
  import ModalBase from "@Facade/Modal/Base"
  import TitleSub from "@Facade/Title/Sub"
  import TitleCaps from "@Facade/Title/Caps"

  export default {
    name: 'Facade.Resource.Material.Object',
    components: {
      TextBase,
      TitleCaption,
      IconPointsVertical,
      ModalActionList,
      ModalBase,
      TitleSub,
      TitleCaps
    },
    props: {
      resourceName: {
        type: String,
        required: true
      },
      resourceIdentifier: {
        type: String,
      },
      worker: Object,
      id: Number,
    },
    data(){
      return{
        actions: ['Отправить на склад', 'Редактировать'],
        actionListStatus: false,
        modalStatus: false,
      }
    },
    methods: {
      deleteResource(){
        this.modalStatus = false
        this.$notify({text: 'Ресурс удален', type: 'success', duration: 3000, speed: 500})
        this.$core.execViaComponent('Resources', 'deleteMaterial', this.id)
      },
      makeAction(id){
        if(id === 0) {
          this.$core.execViaComponent('Resources', 'moveToWarehouse', this.id)
        }
        if(id === 1){
          this.$core.execViaComponent('Resources', 'getMaterial', this.id);
          this.$router.push({name: 'vx.resource.editing'})
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .resource-material-object-ui {
    position: relative;
    height: 64px;
    padding: 12px 6px 12px 16px;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    border-radius: 12px;
    background-color: $grey-scale-400;
    transition: background-color .3s;
    cursor: pointer;
    &:hover{
      background-color: $grey-scale-500;
    }
    .object-main-plate {
      display: inherit;
      .object-text-group{
        width: 232px;
        margin-right: 12px;
        .facade-text-base {
          color: #fff;
          font-weight: 600;
          margin-bottom: 4px;
        }
      }
      .object-user-name{
        font-size: 11px;
        line-height: 12px;
        height: max-content;
        color: $grey;
        padding: 2px 8px;
        border-radius: 8px;
        &.su-level{
          &-0{
            background-color: $grey-scale-400; //уточнить
          }
          &-1{
            background-color: $su-level-1; //уточнить
          }
          &-2{
            background-color: $su-level-2; //уточнить
          }
          &-3{
            background-color: $su-level-3; //уточнить
          }
          &-4{
            background-color: $su-level-4; //уточнить
          }
        }
      }
    }
    .icon-points-vertical {
      padding: 4px 10px 10px;
      color: #fff;
      cursor: pointer;
    }
    .facade-modal-action-list::v-deep {
      right: 10px;
      .action-list-body{
        transform: translateX(-100%);
        top: 16px;
      }
    }
    .modal-delete{
      .delete-resource-plate{
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