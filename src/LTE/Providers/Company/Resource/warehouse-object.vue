<template>
  <div class="resource-warehouse-object-ui" @click.stop="$emit('onClick')">

    <div class="object-text-group">
      <text-base>{{resourceName}}</text-base>
      <title-caption>{{resourceIdentifier}}</title-caption>
    </div>

    <div class="object-right-part">
      <div class="object-request" v-if="countRequests">
        <img class="image-user" src="@/assets/img/my/user-single.svg">
        <title-caption>{{requests}}</title-caption>
      </div>

      <div class="object-cost">
        <img class="image-cost" src="@/assets/img/my/money.svg">
        <title-caption>₴{{cost}}</title-caption>
      </div>

      <icon-points-vertical @click.native.stop="actionListStatus=true"/>
    </div>


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
        // required: true
      },
      cost: Number,
      countRequests: Number || null,
      // id: Number,
    },
    data(){
      return{
        actions: ['Отправить на склад', 'Редактировать'],
        actionListStatus: false,
        modalStatus: false,
      }
    },
    computed: {
      requests() {
        if(this.countRequests >4 && this.countRequests < 21){
          return `${this.countRequests} запросов`
        }
        if (Number(String(this.countRequests).slice(-1)) === 1) {
          return `${this.countRequests} запрос`
        }
        if (Number(String(this.countRequests).slice(-1)) < 5){
          return `${this.countRequests} запроса`
        }
        return `${this.countRequests} запросов`
      }
    },
    methods: {
      deleteResource(){
        this.modalStatus = false
        this.$notify({text: 'Ресурс удален', type: 'success', duration: 3000, speed: 500})
        this.$core.execViaComponent('Resources', 'deleteMaterial', this.id)
      },
      makeAction(id){
        if(id === 1){
          this.$core.execViaComponent('Resources', 'getMaterial', this.id);
          this.$router.push({name: 'vx.resource.editing'})
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .resource-warehouse-object-ui {
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
    .object-text-group{
      .facade-text-base {
        color: #fff;
        font-weight: 600;
        margin-bottom: 4px;
      }
    }
    .object-right-part{
      display: inherit;
      .facade-title-caption{
        color: #fff;
      }
      .object-request{
        position: absolute;
        left: 541px;
        display: inherit;
        .image-user{
          width: 14px;
          height: 15px;
          margin-right: 8px;
        }
      }
      .object-cost{
        display: inherit;
        position: absolute;
        left: 646px;
        .image-cost{
          width: 12px;
          height: 15px;
          margin-right: 10px;
        }
      }
      .icon-points-vertical {
        padding: 4px 10px 10px;
        color: #fff;
        cursor: pointer;
      }
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