<template>
  <div class="dashboard-resources">
      <span class="dashboard-resources-header">
        <span>Склад ресурсов</span>
      </span>
    <div class="dashboard-resources-body">
      <div class="dashboard-resources-warehouse">
        <spnan class="dashboard-resources-coast">Общая стоимость ресурсов</spnan>
        <span class="dashboard-resources-sum">8699₴</span>
      </div>
      <div class="dashboard-resources-warehouse"
           :style="{ marginLeft: '16px' }">
        <spnan class="dashboard-resources-coast">Количество свободных ресурсов</spnan>
        <span class="dashboard-resources-sum">23</span>
      </div>
    </div>
    <div class="dashboard-resources-footer">
      <span>Запросы на ресурс</span>
      <span class="dashboard-resources-num">2</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Resources"

}
</script>

<style lang="scss" scoped>
.dashboard-resources {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 16px;
  background-color: $grey-scale-500;
  margin: 20px 0px 0px 24px;
  padding: 16px;

  .dashboard-resources-header {
    position: static;
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    color: #FFFFFF;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;
  }

  .dashboard-resources-body {
    display: flex;
    flex-direction: row;
    position: static;

    .dashboard-resources-warehouse {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: 8px;
      background: #313D49;
      border-radius: 12px;
    }

    .dashboard-resources-coast {
      position: static;
      font-size: 12px;
      line-height: 16px;
      color: #8296AA;
    }

    .dashboard-resources-sum {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      color: #FFFFFF;
      margin-top: 10px;
    }
  }

  .dashboard-resources-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    padding: 12px;
    height: 100%;
    background: #313D49;
    border-radius: 12px;
    margin-top: 24px;
    .dashboard-resources-num{
      text-align: center;
      background: #FF4D4F;
      border-radius: 10px;
      width: 24px;
      height: 16px;
      font-weight: 600;
      font-size: 12px;
      margin-left: 8px;
    }
  }
}
</style>

