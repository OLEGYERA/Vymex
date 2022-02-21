<template>
  <div class="resource-material-object-ui">
    <div class="object-main-plate">
      <div class="object-text-group">
        <text-base>{{object.name}}</text-base>
        <title-caption>{{object.number}}</title-caption>
      </div>
      <div class="object-user-name"
           :class="{level1: object.user.level===1, level2: object.user.level===2, level3: object.user.level===3, level4: object.user.level===4}">
        {{object.user.name}}
      </div>
    </div>
    <icon-points-vertical @click.native.stop="actionListStatus=true"/>
    <modal-action-list
        :actions="actions"
        :status="actionListStatus"
        @onClose="actionListStatus=false"
        @onDelete="onDelete"
        @onList="sendData"/>
  </div>
</template>

<script>
  import TextBase from '@Facade/Text/Base'
  import TitleCaption from '@Facade/Title/Caption'
  import IconPointsVertical from "@Icon/PointsVertical"
  import ModalActionList from "@Facade/Modal/ActionList";

  export default {
    name: 'Facade.Resource.Material.Object',
    components: {
      TextBase,
      TitleCaption,
      IconPointsVertical,
      ModalActionList
    },
    props: {
      object: Object,
    },
    data(){
      return{
        actions: ['Назначить ресурс', 'Редактировать'],
        actionListStatus: false,
      }
    },
    methods: {
      sendData(id) {
        this.$emit('sendData', id)
      },
      onDelete(){

      }
    }
  }
</script>

<style lang="scss" scoped>
  .resource-material-object-ui {
    position: relative;
    padding: 12px 6px 12px 16px;
    display: flex;
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
      }
    }
    .icon-points-vertical {
      padding: 0 10px 10px;
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
  }
</style>