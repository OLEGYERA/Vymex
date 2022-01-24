<template>
  <div class="container-dashboard-costs">
    <div class="costs-header">
      <span class="header-title">Расходы С.Е.</span>
    </div>
    <div class="costs-body">
      <span class="body-title">Количество свободных ресурсов</span>
      <div class="body-resources">
        <span class="resources-free">134 002₴</span>
        <span class="body-title">/$5200</span>
      </div>
    </div>
    <div class="costs-footer">
      <div class="footer-wage">
        <span class="wage-mediumWage">Средняя ЗП</span>
        <span class="wage-wageUAH">35 000₴</span>
        <span class="wage-mediumWage">$1256</span>
      </div>
      <div class="footer-wage"
           :style="{ marginLeft: '16px' }">
        <span class="wage-mediumWage">Остаток выплат по ЗП</span>
        <span class="wage-wageUAH">8 000₴</span>
        <span class="wage-mediumWage">$322</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Costs"
}
</script>

<style lang="scss" scoped>
.container-dashboard-costs {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;

  .costs-header {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10%;

    .header-title {
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      color: #FFF;
    }
  }

  .costs-body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px;
    background: $grey-scale-400;
    border-radius: 12px;

    .body-title {
      font-size: 12px;
      line-height: 16px;
      color: $grey-scale-200;

    }

    .body-resources {
      margin-top: 5%;
    }

    .resources-free {
      font-weight: 600;
      font-size: 20px;
      color: #FFF;
    }
  }

  .costs-footer {
    display: flex;
    margin-top: 7%;

    .footer-wage {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: 8px;
      background: $grey-scale-400;
      border-radius: 12px;
      width: 100%;
    }

    .wage-mediumWage {
      font-size: 12px;
      line-height: 16px;
      color: $grey-scale-200;
    }

    .wage-wageUAH {
      font-weight: 600;
      font-size: 20px;
      color: #FFF;
      margin-top: 7%;
    }
  }
}

</style>

