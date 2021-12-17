<template>
  <div class="container-vx-header">
    <div class="vx-header-body">
      <div class="vymex-logo">
        <img src="@/assets/img/vymex/base-reverse.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Container.Vx.Header',
  }
</script>

<style lang="scss" scoped>
  .container-vx-header{
    width: 100%;
    box-sizing: border-box;
    padding: 12px 0;
    background-color: $grey-scale-500;
    .vx-header-body{
      padding: 0 20px;
      .vymex-logo{
        height: 40px;
        img{
          height: 100%;
        }
      }
    }
  }
</style>