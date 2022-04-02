<template>
  <div class="facade-messenger-person" @click="$emit('onClick', data.id)">
    <div class="private-info">
      <div class="dialog-image">
        <image-avatar :logo="$core.traits.ImageLogo(data.avatar, data.name, data.lastname)" :color-code="$core.traits.ImageColorCode(data.id)"/>
      </div>
      <div class="info-text">
        <div class="name">{{data.name}} {{data.lastname}}</div>
        <title-caption>@{{data.alias}}</title-caption>
      </div>
    </div>
    <points-vertical @click.native.stop="statusAction = true"/>
    <modal-action-list :status="statusAction"
                       :actions="actions"
                       @onClose="statusAction = false"
                       @onDelete="$emit('deleteContact', data.id)"
                       @onList="makeAction">
      <template #del-title>{{ modalDelete }}</template>
    </modal-action-list>
  </div>
</template>

<script>
  /*eslint-disable*/
  import TitleCaption from '@Facade/Title/Caption'
  import PointsVertical from '@Icon/PointsVertical'
  import ImageAvatar from '@Facade/Image/Avatar'
  import ModalActionList from '@Facade/Modal/ActionList'

  export default {
    name: 'Singleton.Messenger.Facades.Person',
    components: {
      TitleCaption,
      PointsVertical,
      ImageAvatar,
      ModalActionList,
    },
    data(){
      return{
        statusAction: false,
        statusBase: false,
      }
    },
    props: {
      data: {
        type: Object,
        validator: function (value) {
          return value === null
            || typeof value.id === "number"
            || typeof value.alias === "string"
            || typeof value.name === "string"
            || (typeof value.avatar === "string" && value.avatar === null)
            || typeof value.details === "string";
        }
      },
      actions: Array,
      modalDelete: String
    },
    methods: {
      makeAction(id){
        console.log(id, 'data id', this.data.id)
        if (id === 0) {
          this.$emit('openProfile', this.data.id)
        }
        if(id === 2){
          this.$notify({text: 'Уведомления отключены', type: 'success', duration: 3000, speed: 500})
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-messenger-person {
    position: relative;
    margin-bottom: 4px;
    padding: rem(16) rem(12);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $grey-scale-400;
    border-radius: 12px;
    cursor: pointer;
    
    .private-info {
      display: inherit;
      align-items: center;
      .dialog-image {
        margin-right: 8px;
        height: 40px;
        width: 40px;
      }
      .name {
        font-weight: 600;
        font-size: rem(17);
        line-height: rem(22);
        color: #fff;
      }
    }
    .icon-points-vertical {
      padding: 10px;
      color: #fff;
      cursor: pointer;
    }
    .facade-modal-action-list::v-deep {
      .action-list-body{
        left: 68px;
        top: 6px;
      }
    }
  }
</style>