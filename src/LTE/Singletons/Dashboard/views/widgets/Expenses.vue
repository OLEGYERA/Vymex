<template>
  <div  :class="[hideWidget === 'expenses'
  ? (index + 1) % 2 === 0
  ? 'hide-right-widget'
  : 'hide-left-widget' : '',
  'container-dashboard-expenses']">
    <widgets-header @show-context="showContext"
                    :title="data.title"
                    :icon="data.icon"/>
    <div class="expenses-body">
      <span class="body-title">Зарплатный фонд на месяц</span>
      <div class="body-resources">
        <span class="resources-free">{{ data.widget.salaryFund && data.widget.salaryFund.UAH }}₴</span>
        <span class="body-title">/${{ data.widget.salaryFund && data.widget.salaryFund.dollar }}</span>
      </div>
    </div>
    <div class="expenses-footer">
      <div class="footer-wage">
        <span class="wage-medium-wage">Средняя ЗП</span>
        <span class="wage-wage-UAH">{{ data.widget.averageSalary && data.widget.averageSalary.UAH }}₴</span>
        <span class="wage-medium-wage">${{ data.widget.averageSalary && data.widget.averageSalary.dollar }}</span>
      </div>
      <div class="footer-wage">
        <span class="wage-medium-wage">Остаток выплат по ЗП</span>
        <span class="wage-wage-UAH">{{ data.widget.remainderSalary && data.widget.remainderSalary.UAH }}₴</span>
        <span class="wage-medium-wage">${{ data.widget.remainderSalary && data.widget.remainderSalary.UAH }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import WidgetsHeader from "../../facades/WidgetsHeader";
import {mapGetters} from "vuex";

export default {
  name: "expenses",
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
    index: Number
  },
  computed: {
    ...mapGetters({
      hideWidget: 'getHideWidget'
    }),
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/animations.module';

.container-dashboard-expenses {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 224px;
  cursor: pointer;

  .expenses-body {
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

  .expenses-footer {
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

