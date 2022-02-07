<template>
  <div class="container-dashboard-controlCenter">
    <div class="controlCenter-header">
      <img :src="icon"/>
      <span class="controlCenter-header-title">Центр управления</span>
      <img :src="context"/>
    </div>
    <div class="controlCenter-body">
      <span class="body-title">Дисковое хранилище</span>
      <div class="body-memory">
        <div class="memory-string">
          <span class="memory-string-reserved">{{ data.memoryReserved }}</span>
          <span class="memory-string-all">{{ data.memoryAll }}</span>
        </div>
        <div class="memory-plot">
          <div class="plot" :style="{background: `conic-gradient(#4A5A6A 0% ${freeMemoryPercent}%, #73D13D ${freeMemoryPercent}% 100%)`}"></div>
        </div>
      </div>
    </div>
    <div class="controlCenter-footer">
      <div class="footer-el"
           :style="{ marginRight: '8px' }">
        <span class="el-title">Структурные единицы</span>
        <div class="el-indicators">
          <div class="indicators-sum">{{ data.structuralUnits }}</div>
          <div class="indicators-box">
            <div class="indicator-item" v-for="(item, i) in data.items" :key="i">
              <div class="item-num">{{ i + 1 }}</div>
              <div class="item-indicator" :style="{backgroundColor: item}"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-el" :style="{ marginLeft: '8px' }">
        <span class="el-title">Файлы в корзине</span>
        <div class="el-indicators">
          <div class="indicators-sum">{{ data.files }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ControlCenter",
  data() {
    return {
      icon: require('@/assets/img/my/control-center.svg'),
      context: require('@/assets/img/icons/context.svg'),
    }
  },
  computed: {
    freeMemoryPercent() {
      let memoryAll = this.data.memoryAll.split(' ')[0]
      let memoryReserved = this.data.memoryReserved.split(' ')[0]
      let difference = memoryAll - memoryReserved
      let result = difference / (memoryAll / 100)
      return result
    }
  },
  props: ['data']
}
</script>

<style lang="scss" scoped>

.container-dashboard-controlCenter {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 224px;

  .controlCenter-header {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 8%;

    .controlCenter-header-title {
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      color: #FFF;
      margin: 1% 37.5% 0% 2%;
    }
  }

  .controlCenter-body {
    padding: 8px;
    background: $grey-scale-400;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;

    .body-title {
      font-size: 12px;
      line-height: 16px;
      color: $grey-scale-200;
      width: 67px;
      height: 32px;
      left: 0px;
      top: 4px;
    }

    .body-memory {
      display: flex;
      justify-content: space-between;

      .memory-string {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        margin-right: 5%;

        .memory-string-reserved {
          width: 60px;
          height: 24px;
          font-weight: 600;
          font-size: 20px;
          line-height: 24px;
          color: #FFF;
        }

        .memory-string-all {
          width: 35px;
          height: 16px;
          font-size: 12px;
          line-height: 16px;
          color: $grey-scale-200;
        }
      }

      .memory-plot {
        display: flex;
        align-items: center;

        .plot {
          border-radius: 50%;
          width: 36px;
          height: 36px;
        }
      }
    }
  }

  .controlCenter-footer {
    display: flex;
    margin-top: 7%;

    .footer-el {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: 8px;
      background: $grey-scale-400;
      border-radius: 12px;
      width: 100%;

      .el-title {
        font-size: 12px;
        line-height: 16px;
        color: $grey-scale-200;
      }

      .el-indicators {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 6px;
        width: 100%;
        height: 100%;

        .indicators-sum {
          width: 35%;
          flex-shrink: 0;
          font-weight: 600;
          font-size: 20px;
          color: #FFF;
        }

        .indicators-box {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          max-width: 200px;

          .indicator-item {
            display: flex;
            align-items: center;
            width: 45%;
            margin-right: 5%;
            padding: 1.5px 2px;
            box-sizing: border-box;

            .item-num {
              width: 6px;
              height: rem(12);
              font-weight: 600;
              font-size: 12px;
              line-height: 12px;
              margin-right: 6px;
              text-align: center;
              color: #C1CFDB;
            }

            .item-indicator {
              content: '';
              width: 100%;
              height: 6px;
              border-radius: 20px;
            }

            &:nth-child(2n), &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}

</style>

