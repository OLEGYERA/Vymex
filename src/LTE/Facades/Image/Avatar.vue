<template>
  <div class="facade-image-avatar">
    <div class="avatar-body" :class="getColor">
      {{logo}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Facade.Image.Avatar',
    props: {
      logo: String,
      colorCode: String,

    },
    computed: {
      getColor(){
        return this.colorCode ? `color color-id-${this.colorCode}` : '';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-image-avatar{
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    border-radius: 50%;
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.15);
    .avatar-body{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius: 50%;
      &.color{
        text-transform: uppercase;
        font-weight: 600;
        font-size: 12px;
        line-height: 12px;
        color: #fff;
        &-id-{
          &.0{
            background: linear-gradient(135deg, #6083FF 0%, #76FFF7 100%);
          }
          &1{
            background: linear-gradient(135deg, #F97794 0%, #623AA2 100%);
          }
          &2{
            background: linear-gradient(135deg, #FEB692 0%, #EA5455 100%);
          }
          &3, &9{
            background: linear-gradient(135deg, #F6CEEC 0%, #D939CD 100%);
          }
          &4{
            background: linear-gradient(135deg, #F6D242 0%, #FF52E5 100%);
          }
          &5{
            background: linear-gradient(135deg, #81FFEF 0%, #F067B4 100%);
          }
          &6, &8{
            background: linear-gradient(135deg, #FF6FD8 0%, #3813C2 100%);
          }
          &7{
            background: linear-gradient(135deg, #43CBFF 0%, #9708CC 100%);
          }
        }
      }
    }

  }
</style>