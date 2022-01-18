<template>
  <div class="facade-plate-unit">
    <svg v-if="unitInfo.unitLevel > 1" class="line" viewBox="0 0 100 1" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="0" x2="100" y2="0" stroke="white" />
    </svg>
    <div class="plate-account-body" :class="getColor">
      <image-avatar :logo="unitInfo.logo" :color-code="unitInfo.colorId"/>
      <div class="plate-account-info">
        <h2 class="plate-account-name">{{ unitInfo.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import ImageAvatar from '@Facade/Image/Avatar'

export default {
  name: 'Facade.Plate.Unit',
  props: {
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
          console.log(this.data);
          return {
            colorId: String(this.data.id).substr(this.data.id.length - 1, 1),
            name: this.data.name,
            logo: this.data?.avatar ? this.data.avatar : this.data.name.substr(0, 1),
            unitLevel: this.data.level,
          }
      }
      return {}
    },
    getColor(){
      return this.data.level ? `color color-level-${this.data.level}` : '';
    }
  }

}
</script>

<style lang="scss" scoped>
.facade-plate-unit{
  width: 222px;
  height: 52px;
  box-sizing: border-box;
  margin-bottom: 20px;
  margin-right: 44px;
  position: relative;
  .plate-account-body{
    border-radius: 8px;

    padding: 8px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
    box-sizing: border-box;
    z-index: 99;
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
      flex-wrap: wrap;
      align-content: center;
      //flex-direction: column;
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
        font-weight: 400;
      }
    }
    &.color-level-{
      &1{
        background: #D5F1C5;
      }
      &2{
        background: #FEF0BD;
      }
      &3{
        background: #BAE7FF;
      }
      &4{
        background: #F2CBF8;
      }
    }
  }
  .line{
    position: absolute;
    right: -21%;
    left: 99%;
    top: 50%;
    overflow: visible;
    z-index: 1;
  }
}

</style>