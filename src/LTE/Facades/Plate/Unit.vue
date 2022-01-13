<template>
  <div class="facade-plate-unit" :class="{'plate-account-tiny': tiny, 'active': active}">
    <div class="plate-account-body">
      <image-avatar :logo="unitInfo.logo" :color-code="unitInfo.colorId"/>
      <div class="plate-account-info">
        <h2 class="plate-account-name">{{ unitInfo.name }}</h2>
        <p class="plate-unit-name">{{ unitInfo.unitName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ImageAvatar from '@Facade/Image/Avatar'

export default {
  name: 'Facade.Plate.Unit',
  props: {
    tiny: {
      type: Boolean,
      default: false
    },
    category: {
      type: String,
      required: true
    },
    data: Object,
    active: Boolean
  },
  components: {
    ImageAvatar,
  },
  created() {

  },
  computed: {
    unitInfo(){
      switch (this.category){
        case 'level1':
          return {
            colorId: String(this.data.id).substr(this.data.id.length - 1, 1),
            name: this.data.name + ' ' + this.data.lastname,
            logo: this.data?.logo ? this.data.logo : this.data.name.substr(0, 1),
            unitName: "level1"
          }
      }
      return {}
    }
  }

}
</script>

<style lang="scss" scoped>
.facade-plate-unit{
  border-radius: 8px;
  width: 332px;
  height: 52px;
  box-sizing: border-box;
  background: #D5F1C5;
  padding: 8px;
  .plate-account-body{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
    box-sizing: border-box;
      .button-add,
      .facade-image-avatar {
        justify-self: flex-start;
        width: 36px;
        height: 36px;
        margin-right: 12px;
      }
    .plate-account-info {
      width: 229px;
      height: 36px;
      color: #212A33;
      display: flex;
      flex-direction: column;
      .facade-title-sub,
      .facade-text-base {
        width: 100%;
        white-space: nowrap;
      }
      .plate-account-name {
        font-size: 15px;
        line-height: 20px;
        margin: 0;
        display: block;
        height: 16px;
      }
      .plate-unit-name{
        font-size: 12px;
        line-height: 16px;
        margin-top: 4px;
      }
    }
  }
  &.create{
    border: 1px solid $grey-scale-400;
    background: transparent;
    .plate-account-body{
      //padding: 11px 11px;
      .button-add{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $blue;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        .icon-add{
          height: 16px;
          color: #fff;
        }
      }
      .facade-text-base{
        color: $blue;
      }
    }
  }
  &.plate-account-tiny{
    .plate-account-body{
      justify-content: center;
      .button-add,
      .facade-image-avatar{
        margin-right: 0;
      }
    }
  }

  &.active{
    border-color: $blue;
  }
}

</style>