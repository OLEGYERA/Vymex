<template>
  <div class="container-dashboard-co-queues">
    <widgets-header @show-context="showContext"
                    :title="data.title"
                    :icon="data.icon"/>
    <div class="co-queues-body">
      <div class="body-for-sale">
        <span class="for-sale-title">Доля компании на продажу:</span>
        <span class="for-sale-percent">{{ data.data.forSale }} %</span>
      </div>
      <div class="body-for-sale">
        <span class="for-sale-title">Активные голосования:</span>
        <span class="for-sale-percent">{{ data.data.activeVoting }}</span>
      </div>
    </div>
    <div class="co-queues-footer">
      <span>Количество соучредителей</span>
      <span class="footer-num">{{ data.data.coQueues }}</span>
    </div>
  </div>
</template>

<script>
import WidgetsHeader from "@Container/Vx/Main/Dashboard/facades/WidgetsHeader";

export default {
  name: "CoQueues",
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
.container-dashboard-co-queues {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 224px;

  .co-queues-body {
    display: flex;

    .body-for-sale {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: 8px;
      background: $grey-scale-400;
      border-radius: 12px;
      width: 100%;
      margin-right: 0;
      margin-left: 8px;

      .for-sale-title {
        font-size: rem(12);
        line-height: rem(16);
        color: $grey-scale-200;
        margin-right: 15%;
      }

      .for-sale-percent {
        font-weight: 600;
        font-size: rem(20);
        color: #FFF;
        margin-top: 5%;
      }

      &:first-child {
        margin-right: 8px;
        margin-left: 0;
      }
    }
  }

  .co-queues-footer {
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
      font-size: rem(12);
      margin-left: 2%;
    }
  }
}
</style>

