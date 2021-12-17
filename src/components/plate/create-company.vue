<template>
  <div class="plate-create-company">
    <div class="create-company-avatar"></div>
    <div class="plate-title">Создать компанию</div>
  </div>
</template>

<script>
  export default {
    name: 'plate.create.company.component',
  }
</script>

<style lang="scss" scoped>
  .plate-create-company{
    padding: 12px 18px;
    display: flex;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, .15);
    box-sizing: border-box;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    .create-company-avatar{
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      background-color: $blue;
      border-radius: 50%;
      overflow: hidden;
      &:before, &:after{
        content: '';
        position: absolute;
        background-color: #fff;
        border-radius: 9px;
      }
      &:before{
        height: 60%;
        width: 2px;
      }
      &:after{
        height: 2px;
        width: 60%;
      }
    }
    .plate-title{
      margin-left: 8px;
      font-size: 14px;
      line-height: 20px;
      color: $blue;
      font-weight: 500;
    }
  }
</style>