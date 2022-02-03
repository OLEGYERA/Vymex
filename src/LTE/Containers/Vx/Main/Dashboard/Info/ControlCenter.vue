<template>
  <div class="container-control-center">
    <widgets-header @show-context="showContext"
                    :title="data.title"
                    :icon="data.icon"/>
    <div class="control-center-body">
      <span class="body-title">Дисковое хранилище</span>
      <div class="body-memory">
        <div class="memory-string">
          <span class="memory-string-reserved">{{ data.data.memoryReserved }}</span>
          <span class="memory-string-all">{{ data.data.memoryAll }}</span>
        </div>
        <div class="memory-plot">
          <div class="plot"
               :style="{background: `conic-gradient(#4A5A6A 0% ${freeMemoryPercent}%, #73D13D ${freeMemoryPercent}% 100%)`}"></div>
        </div>
      </div>
    </div>
    <div class="control-center-footer">
      <div class="footer-el">
        <span class="el-title">Структурные единицы</span>
        <div class="el-indicators">
          <div class="indicators-sum">{{ data.data.structuralUnits }}</div>
          <div class="indicators-box">
            <div class="indicator-item" v-for="(item, i) in data.data.items" :key="i">
              <div class="item-num">{{ i + 1 }}</div>
              <div class="item-indicator" :style="{backgroundColor: item}"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-el">
        <span class="el-title">Файлы в корзине</span>
        <div class="el-indicators">
          <div class="indicators-sum">{{ data.data.files }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WidgetsHeader from "@Container/Vx/Main/Dashboard/facades/WidgetsHeader";

export default {
  name: "ControlCenter",
  computed: {
    freeMemoryPercent() {
      let memoryAll = this.data.data.memoryAll.split(' ')[0]
      let memoryReserved = this.data.data.memoryReserved.split(' ')[0]
      let difference = memoryAll - memoryReserved
      let result = difference / (memoryAll / 100)
      return result
    }
  },
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

.container-control-center {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 224px;

  .control-center-body {
    padding: 8px;
    background: $grey-scale-400;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;

    .body-title {
      font-size: rem(12);
      line-height: rem(16);
      color: $grey-scale-200;
      width: 67px;
      height: 32px;
      left: 0;
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
          font-size: rem(20);
          line-height: rem(24);
          color: #FFF;
        }

        .memory-string-all {
          width: 35px;
          height: 16px;
          font-size: rem(12);
          line-height: rem(16);
          color: $grey-scale-200;
        }
      }

      .memory-plot {
        display: inherit;
        align-items: center;

        .plot {
          border-radius: 50%;
          width: 36px;
          height: 36px;
        }
      }
    }
  }

  .control-center-footer {
    display: inherit;
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
      margin-right: 0;
      margin-left: 8px;

      .el-title {
        font-size: rem(12);
        line-height: rem(16);
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
          font-size: rem(20);
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
              font-size: rem(12);
              line-height: rem(12);
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

      &:first-child {
        margin-right: 8px;
        margin-left: 0;
      }
    }
  }
}

</style>

