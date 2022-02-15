<template>
  <div  :class="[hideWidget === 'Result'
  ? (index + 1) % 2 === 0
  ? 'hide-right-widget'
  : 'hide-left-widget' : '',
  'container-dashboard-result']">
    <widgets-header @show-context="showContext"
                    :title="data.title"
                    :icon="data.icon"/>
    <div class="result-body">
      <div class="body-bill">
        <span class="bill-coast">Всего на счету</span>
        <span class="bill-sum">{{ data.data.allBill }}₴</span>
      </div>
      <div class="body-bill">
        <span class="bill-coast">Сумма на конец мес.</span>
        <div class="bill-res">
          <div class="bill-sum">{{ data.data.endOfMonth }}₴</div>
          <div class="bill-proc">
            <div class="proc-triangle"></div>
            <div class="proc-development">{{ data.data.development }}%</div>
          </div>
        </div>
      </div>
    </div>
    <div class="result-footer">
      <div
          v-for="(date, i) in data.data.dates"
          :key="i">
        <div class="footer-plot"
             v-if="(typeof date.height !== 'object') && (typeof date.color !== 'object')"
             :style="{
          height: date.height,
          background: date.color,
        }"></div>
        <div v-else>
          <div class="footer-absolute-plot"
               :style="{
          height: date.height.frontHeight,
          background: date.color.frontColor,
          bottom: '19px',
          zIndex: +date.height.frontHeight.split('px')[0] < +date.height.backHeight.split('px')[0] ? 2 : 0
          }"></div>
          <div class="footer-absolute-plot"
               :style="{
          height: date.height.backHeight,
          background: date.color.backColor,
          bottom: '20px',
          zIndex: 1
       }"></div>
        </div>
        <span class="footer-date"
              :style="{color: date.color === '#FACD23' && date.color}">{{ i + 12 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import WidgetsHeader from "../../facades/WidgetsHeader";
import {mapGetters} from "vuex";

export default {
  name: "Result",
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

.container-dashboard-result {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 98.3%;

  .result-body {
    display: inherit;
    margin-bottom: 5%;

    .body-bill {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: 2% 0% 2% 2%;
      background: $grey-scale-400;
      border-radius: 12px;
      width: 100%;
      height: 76%;
      margin-right: 0;
      margin-left: 8px;

      .bill-coast {
        font-size: rem(12);
        line-height: rem(16);
        color: $grey-scale-200;
        margin-bottom: 7%;
      }

      .bill-sum {
        font-weight: 600;
        font-size: rem(20);
        color: #FFF;
      }

      &:first-child {
        margin-right: 8px;
        margin-left: 0;
      }
    }

    .bill-res {
      display: inherit;
      flex-wrap: wrap;

      .bill-proc {
        display: flex;
        margin-top: 3%;

        .proc-development {
          width: 18px;
          height: 16px;
          font-size: rem(12);
          line-height: rem(16);
          color: $green;
        }

        .proc-triangle {
          width: 0;
          height: 0;
          background: $grey-scale-400;
          border-radius: 0.5px;
          margin: 15% 15% 0 30%;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 8px solid $green;
        }
      }
    }
  }

  .result-footer {
    display: inherit;
    justify-content: space-around;
    align-items: flex-end;
    position: relative;

    .footer-plot {
      width: 12px;
      border-radius: 4px;
    }

    .footer-absolute-plot {
      width: 12px;
      border-radius: 4px;
      position: absolute;
    }

    .footer-date {
      height: 10px;
      font-size: rem(10);
      line-height: 100%;
      color: $grey-scale-200;
    }
  }
}

</style>