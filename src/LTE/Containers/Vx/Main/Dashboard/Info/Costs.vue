<template>
  <div class="container-dashboard-costs">
    <widgets-header @show-context="showContext"
                    :title="data.title"
                    :icon="data.icon"/>
    <div class="costs-body">
      <span class="body-title">Зарплатный фонд на месяц</span>
      <div class="body-resources">
        <span class="resources-free">{{ data.data.salaryFund.UAH }}₴</span>
        <span class="body-title">/${{ data.data.salaryFund.dollar }}</span>
      </div>
    </div>
    <div class="costs-footer">
      <div class="footer-wage">
        <span class="wage-medium-wage">Средняя ЗП</span>
        <span class="wage-wage-UAH">{{ data.data.averageSalary.UAH }}₴</span>
        <span class="wage-medium-wage">${{ data.data.averageSalary.dollar }}</span>
      </div>
      <div class="footer-wage">
        <span class="wage-medium-wage">Остаток выплат по ЗП</span>
        <span class="wage-wage-UAH">{{ data.data.remainderSalary.UAH }}₴</span>
        <span class="wage-medium-wage">${{ data.data.remainderSalary.UAH }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import WidgetsHeader from "@Container/Vx/Main/Dashboard/facades/WidgetsHeader";

export default {
  name: "Costs",
  methods: {
    showContext(value) {
      this.$emit('show-context', value, this.data.name)
    },
  },
  components: {
    WidgetsHeader
  },
  props: {
    data: Object,
  }
}
</script>

<style lang="scss" scoped>
.container-dashboard-costs {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 224px;

  .costs-body {
    display: inherit;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px;
    background: $grey-scale-400;
    border-radius: 12px;
    height: 21.4%;

    .body-title {
      font-size: rem(12);
      line-height: rem(16);
      color: $grey-scale-200;

    }

    .body-resources {
      margin-top: 3%;
    }

    .resources-free {
      font-weight: 600;
      font-size: rem(20);
      color: #FFF;
    }
  }

  .costs-footer {
    display: inherit;
    margin-top: 5%;
    height: 35.7%;

    .footer-wage {
      display: inherit;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: 8px;
      background: $grey-scale-400;
      border-radius: 12px;
      width: 100%;
      margin-right: 0;
      margin-left: 8px;

      &:first-child {
        margin-right: 8px;
        margin-left: 0;
      }
    }

    .wage-medium-wage {
      font-size: rem(12);
      line-height: rem(16);
      color: $grey-scale-200;
    }

    .wage-wage-UAH {
      font-weight: 600;
      font-size: rem(20);
      color: #FFF;
      margin-top: 7%;
    }
  }
}

</style>

