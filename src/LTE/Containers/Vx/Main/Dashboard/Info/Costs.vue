<template>
  <div class="container-dashboard-costs">
    <div class="costs-header">
      <img :src="icon"/>
      <span class="header-title">Расходы С.Е.</span>
      <div class="costs-header-menu-button" @click="actionListStatus = !actionListStatus">
        <img :src="context" :class="{active: actionListStatus}"/>
        <transition name="fade">
          <action-list
              :items="items"
              v-if="actionListStatus"
              :id="id"
              @hide-item="hideItem"
          />
        </transition>
      </div>
    </div>
    <div class="costs-body">
      <span class="body-title">Зарплатный фонд на месяц</span>
      <div class="body-resources">
        <span class="resources-free">{{data.salaryFund.UAH}}₴</span>
        <span class="body-title">/${{data.salaryFund.dollar}}</span>
      </div>
    </div>
    <div class="costs-footer">
      <div class="footer-wage"
           :style="{ marginRight: '8px' }">
        <span class="wage-mediumWage">Средняя ЗП</span>
        <span class="wage-wageUAH">{{data.averageSalary.UAH}}₴</span>
        <span class="wage-mediumWage">${{data.averageSalary.dollar}}</span>
      </div>
      <div class="footer-wage"
           :style="{ marginLeft: '8px' }">
        <span class="wage-mediumWage">Остаток выплат по ЗП</span>
        <span class="wage-wageUAH">{{data.remainderSalary.UAH}}₴</span>
        <span class="wage-mediumWage">${{data.remainderSalary.UAH}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ActionList from "@/LTE/Singletons/Messenger/facades/ActionList";
export default {
  name: "Costs",
  data() {
    return {
      icon: require('@/assets/img/my/costs.svg'),
      context: require('@/assets/img/icons/context.svg'),
    }
  },
  methods:{
    hideItem(id){
      this.$emit('hide-item', id)
    }
  },
  components: {
    ActionList,
  },
  props: {
    actionListStatus: Boolean,
    data: Object,
    items: Array,
    id: Number
  }
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
  height: 224px;

  .costs-header {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 8%;

    .header-title {
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      color: #FFF;
      margin: 1% 50% 0% 2%;
    }
    .costs-header-menu-button {
      position: relative;
      .singleton-messenger-action-list {
        position: absolute;
        bottom: -1px;
        z-index: 1;
        right: -1px;
        transform: translateY(100%);
      }
    }
  }

  .costs-body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px;
    background: $grey-scale-400;
    border-radius: 12px;
    height: 21.4%;

    .body-title {
      font-size: 12px;
      line-height: 16px;
      color: $grey-scale-200;

    }

    .body-resources {
      margin-top: 3%;
    }

    .resources-free {
      font-weight: 600;
      font-size: 20px;
      color: #FFF;
    }
  }

  .costs-footer {
    display: flex;
    margin-top: 5%;
    height: 35.7%;

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

