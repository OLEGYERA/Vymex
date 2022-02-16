<template>
  <div class="facade-resource-material-object">
    <div class="object-main">
      <div class="object-info">
        <text-base><slot name="title">{{object.name}}.</slot></text-base>
        <title-caption><slot name="folder-content">{{object.number}}</slot></title-caption>
      </div>
      <div class="object-user"
           :class="{level1: object.user.level===1, level2: object.user.level===2, level3: object.user.level===3, level4: object.user.level===4}">
        {{object.user.name}}
      </div>
    </div>
    <icon-points-vertical @click.native.stop="actionListStatus=true"/>
    <modal-action-list :actions="actions" :status="actionListStatus" @onList="cons"/>
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
      cons() {
        console.log(111)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .facade-resource-material-object {
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
    .object-main {
      display: inherit;
      .object-info{
        width: 232px;
        margin-right: 12px;
        .facade-text-base {
          color: #fff;
          margin-bottom: 4px;
        }
      }
      .object-user{
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
  }
</style>