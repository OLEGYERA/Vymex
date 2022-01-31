<template>
  <div class="container-dashboard-result">
    <div class="result-header">
      <img :src="icon"/>
      <span class="header-title">Результат компании</span>
      <div class="result-header-menu-button" @click="actionListStatus = !actionListStatus">
        <img :src="context" :class="{active: actionListStatus}"/>
        <transition name="fade">
          <action-list :items="items" v-if="actionListStatus"/>
        </transition>
      </div>
    </div>
    <div class="result-body">
      <div class="body-bill"
           :style="{ marginRight: '8px' }">
        <span class="bill-coast">Всего на счету</span>
        <span class="bill-sum">{{data.allBill}}₴</span>
      </div>
      <div class="body-bill"
           :style="{ marginLeft: '8px' }">
        <span class="bill-coast">Сумма на конец мес.</span>
        <div class="bill-res">
          <div class="bill-sum">{{data.endOfMonth}}₴</div>
          <div class="bill-proc">
            <div class="proc-triangle"></div>
            <div class="proc-development">{{data.development}}%</div>
          </div>
        </div>
      </div>
    </div>
    <div class="result-footer">
      <div
          v-for="(date, i) in data.dates"
          :key="i">
        <div class="footer-plot"
             v-if="(typeof date.height !== 'object') && (typeof date.color !== 'object')"
             :style="{
          height: date.height,
          background: date.color,
        }"></div>
        <div v-else>
          <div class="footer-absolutePlot"
               :style="{
          height: date.height.frontHeight,
          background: date.color.frontColor,
          bottom: '19px',
          zIndex: +date.height.frontHeight.split('px')[0] < +date.height.backHeight.split('px')[0] ? 2 : 0
          }"></div>
          <div class="footer-absolutePlot"
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
import ActionList from "@/LTE/Singletons/Messenger/facades/ActionList";
export default {
  name: "Result",
  data() {
    return {
      icon: require('@/assets/img/my/result.svg'),
      context: require('@/assets/img/icons/context.svg'),
      actionListStatus: false,
    }
  },
  components: {
    ActionList,
  },
  props: ['data', 'items']
}
</script>

<style lang="scss" scoped>
.container-dashboard-result {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 98.3%;

  .result-header {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 8%;

    .header-title {
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      color: #FFF;
      margin: 1% 32% 0% 2%;
    }
    .result-header-menu-button {
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

  .result-body {
    display: flex;
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

      .bill-coast {
        font-size: 12px;
        line-height: 16px;
        color: $grey-scale-200;
        margin-bottom: 7%;
      }

      .bill-sum {
        font-weight: 600;
        font-size: 20px;
        color: #FFF;
      }
    }

    .bill-res {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;

      .bill-proc {
        display: flex;
        justify-content: flex-start;
        margin-top: 3%;

        .proc-development {
          width: 18px;
          height: 16px;
          font-size: 12px;
          line-height: 16px;
          color: $green;
        }

        .proc-triangle {
          width: 0px;
          height: 0px;
          background: $grey-scale-400;
          border-radius: 0.5px;
          margin: 15% 15% 0% 30%;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 8px solid $green;
        }
      }
    }
  }

  .result-footer {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    position: relative;

    .footer-plot {
      width: 12px;
      border-radius: 4px;
    }

    .footer-absolutePlot {
      width: 12px;
      border-radius: 4px;
      position: absolute;
    }

    .footer-date {
      height: 10px;
      font-size: 10px;
      line-height: 100%;
      color: $grey-scale-200;
    }
  }
}

</style>