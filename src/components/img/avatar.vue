<template>
  <div class="img-avatar color" :class="`color-id-${getColorID}`">
    {{getInitials}}
  </div>
</template>

<script>
  export default {
    name: 'img.avatar.component',
    props: {
      UserName: String,
      UserLastname: String,
      UserId: String
    },
    computed: {
      getInitials(){
        return this.UserName.substr(0, 1) + this.UserLastname.substr(0, 1)
      },
      getColorID(){
        return this.UserId.substr(this.UserId.length - 1, 1)
      }

    }
  }
</script>

<style lang="scss" scoped>
  .img-avatar{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &.color{
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
</style>