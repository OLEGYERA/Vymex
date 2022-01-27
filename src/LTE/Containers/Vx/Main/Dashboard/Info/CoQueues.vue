<template>
  <div class="container-dashboard-coQueues">
    <div class="coQueues-header">
      <img :src="icon"/>
      <span class="coQueues-header-title">Соучредители</span>
      <img :src="context"/>
    </div>
    <div class="coQueues-body">
      <div class="body-forSale"
           :style="{ marginRight: '8px' }">
        <span class="forSale-title">Доля компании на продажу:</span>
        <span class="forSale-percent">54 %</span>
      </div>
      <div class="body-forSale"
           :style="{ marginLeft: '8px' }">
        <span class="forSale-title">Активные голосования:</span>
        <span class="forSale-percent">0</span>
      </div>
    </div>
    <div class="coQueues-footer">
      <span>Количество соучредителей</span>
      <span class="footer-num">1</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoQueues",
  data(){
    return{
      icon: require('@/assets/img/my/co-queues.svg'),
      context: require('@/assets/img/icons/context.svg'),
    }
  }
}
</script>

<style lang="scss" scoped>
.container-dashboard-coQueues {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 224px;

  .coQueues-header {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 7%;

    .coQueues-header-title {
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      color: #FFF;
      margin: 1% 45% 0% 2%;
    }
  }

  .coQueues-body {
    display: flex;

    .body-forSale {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: 8px;
      background: $grey-scale-400;
      border-radius: 12px;
      width: 100%;

      .forSale-title {
        font-size: 12px;
        line-height: 16px;
        color: $grey-scale-200;
        margin-right: 15%;
      }

      .forSale-percent {
        font-weight: 600;
        font-size: 20px;
        color: #FFF;
        margin-top: 5%;
      }
    }
  }

  .coQueues-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
    padding: 12px;
    height: 200%;
    background: $grey-scale-400;
    border-radius: 12px;
    margin-top: 6.8%;

    .footer-num {
      text-align: center;
      background: $grey-scale-300;
      border-radius: 10px;
      width: 24px;
      height: 16px;
      font-weight: 600;
      font-size: 12px;
      margin-left: 2%;
    }
  }
}
</style>

