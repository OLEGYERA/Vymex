<template>
  <div  :class="[hideWidget === 'сofounders'
  ? (index + 1) % 2 === 0
  ? 'hide-right-widget'
  : 'hide-left-widget' : '',
  'container-dashboard-сofounders']">
    <widgets-header @show-context="showContext"
                    :title="data.title"
                    :icon="data.icon"/>
    <div class="сofounders-body">
      <div class="body-for-sale">
        <span class="for-sale-title">Доля компании на продажу:</span>
        <span class="for-sale-percent">{{ data.widget && data.widget.forSale }} %</span>
      </div>
      <div class="body-for-sale">
        <span class="for-sale-title">Активные голосования:</span>
        <span class="for-sale-percent">{{ data.widget && data.widget.activeVoting }}</span>
      </div>
    </div>
    <div class="сofounders-footer">
      <span>Количество соучредителей</span>
      <span class="footer-num">{{ data.widget && data.widget.coQueues }}</span>
    </div>
  </div>
</template>

<script>
import WidgetsHeader from "../../facades/WidgetsHeader";
import {mapGetters} from "vuex";

export default {
  name: "сofounders",
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
.container-dashboard-сofounders {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 224px;
  cursor: pointer;

  .сofounders-body {
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

  .сofounders-footer {
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

