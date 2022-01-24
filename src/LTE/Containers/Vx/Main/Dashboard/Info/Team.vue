<template>
  <div class="container-dashboard-team">
    <div class="team-header">
      <span class="header-title">Команда</span>
    </div>
    <div class="team-body">
      <div class="body-people">
        <span class="people-total">Людей в компании</span>
        <span class="people-sum">1</span>
      </div>
      <div class="body-people"
           :style="{ marginLeft: '16px' }">
        <span class="people-total">Вакансии</span>
        <span class="people-sum">3</span>
      </div>
    </div>
    <div class="team-footer">
      <span class="footer-title">Последняя активность:</span>
      <div class="footer-positions">
        <span class="positions-title" v-for="men in people"
        :key="men.id">{{ men.position }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Team",
  data() {
    return {
      people: [
        {id: new Date(), position: "СЕО"},
        {id: new Date(), position: "СМО"},
        {id: new Date(), position: "Исполнитель"},
        {id: new Date(), position: "Соучредит..."},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.container-dashboard-team {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;

  .team-header {
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

  .team-body {
    display: flex;
    padding-bottom: 8%;

    .body-people {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: 8px;
      background: $grey-scale-400;
      border-radius: 12px;
      width: 100%;

      .people-total {
        font-size: 12px;
        line-height: 16px;
        color: $grey-scale-200;
      }

      .people-sum {
        font-weight: 600;
        font-size: 20px;
        color: #FFF;
        margin-top: 5%;
      }
    }
  }

  .team-footer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .footer-title {
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: $grey-scale-200;
    }

    .footer-positions {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .positions-title {
        font-size: 10px;
        line-height: 16px;
        text-align: center;
        color: #FFF;
        margin: 16% 0px 0px 5%;
      }
    }
  }
}
</style>

