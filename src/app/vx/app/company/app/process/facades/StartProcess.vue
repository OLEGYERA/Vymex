<template>
  <div class="facade-start-process">
    <div class="start-process-header">
      <span class="process-header-title">Начало</span>
      <icon-calendar/>
    </div>
    <div class="start-process-border"></div>
    <div class="start-process-period">
    <span class="process-period-every"
          v-for="(period, i) in periods"
          :key="i"
          :style="period.isActive ? {backgroundColor: '#1890FF'} : {backgroundColor: '#4A5A6A'}"
          @click="choosePeriod(i)">{{ period.title }}</span>
    </div>
  </div>
</template>

<script>

import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'vx.process.facade.start.process',
  methods: {
    ...mapMutations({
      setChoosePeriod: 'setNewChoosePeriod'
    }),
    choosePeriod(i) {
      this.periods.map(el => el.isActive = false)
      this.periods[i].isActive = !this.periods[i].isActive
      this.setChoosePeriod(this.periods[i].title)
    }
  },
  computed: {
    ...mapGetters({
      periods: 'getPeriods',
    }),
  },
}
</script>

<style lang="scss" scoped>
.facade-start-process {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: rem(8);
  margin-top: rem(-6);
  background: $grey-scale-400;
  border-radius: 12px;
  color: #FFF;
  padding: rem(20) rem(20) rem(12);
  font-size: rem(15);
  line-height: rem(20);

  .start-process-header {
    display: inherit;
    justify-content: space-between;
    width: 100%;

    .process-header-title {
      font-size: rem(15);
      line-height: rem(20);
      color: $grey-scale-200;
    }

    .icon-calendar {
      margin-right: 4px;
    }
  }

  .start-process-border {
    width: 100%;
    height: 1px;
    background: $grey-scale-300;
    margin: rem(15) 0;
  }

  .start-process-period {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    width: 100%;

    .process-period-every {
      display: inherit;
      justify-content: center;
      align-items: flex-start;
      height: rem(16);
      color: #FFF;
      font-size: rem(11);
      line-height: rem(16);
      padding: 8px 12.5px;
      background: $blue;
      border-radius: 20px;
      margin-left: 4px;

      &:first-child {
        margin-left: 0;
      }
    }

  }
}
</style>