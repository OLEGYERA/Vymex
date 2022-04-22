<template>
  <div class="facade-start-process">
    <div class="start-process-header">
      <span class="process-header-title">{{dateModel ? dateModel : dateRepeat ? dateRepeat : 'Начало'}}</span>
      <div @click="calendarModalStatus = !calendarModalStatus">
      <icon-calendar/>
      </div>
      <calendar-modal-ui
          :status="calendarModalStatus"
          :selected-date="dateModel"
          @onDate="pickNewDate"
          @onClose="calendarModalStatus=false"/>
    </div>
    <div class="start-process-border"></div>
    <div v-if="regularModel" class="start-process-period">
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
  components: {
    CalendarModalUi: () => import('@Providers')
  },
  props: {
    regularModel: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    calendarModalStatus: false,
    dateModel: null
  }),
  mounted() {
    this.periods.map(el => el.isActive = false)
    let periodFromProcess
    let currentInterval = this.selectedProcess.repeatFrequency
        ? this.selectedProcess.repeatFrequency.interval
        : null
    if(currentInterval){
      if (currentInterval === "P1D") {
        periodFromProcess = 1
      } else if(currentInterval === "P1W"){
        periodFromProcess = 2
      } else if(currentInterval === "P1M"){
        periodFromProcess = 3
      } else if(currentInterval === "P1Y") {
        periodFromProcess = 4
      }
    }
    if(!periodFromProcess) periodFromProcess = 1
    const periodsDefault = this.periods.map(el => el.id === periodFromProcess ? ({...el, isActive: true}) : el)
    this.setPeriods(periodsDefault)
  },
  methods: {
     ...mapMutations({
       setPeriods: 'setNewPeriods'
     }),
    choosePeriod(i) {
      this.periods.map(el => el.isActive = false)
      this.periods[i].isActive = !this.periods[i].isActive
    },
    pickNewDate(date){
      this.dateModel = date;
      this.calendarModalStatus = false;
      this.$emit('onDate', this.dateModel)
    }
  },
  computed: {
    ...mapGetters({
      periods: 'getPeriods',
      selectedProcess: 'getSelectedProcess'
    }),
    dateRepeat(){
      let currDate = this.selectedProcess.repeatDate && this.selectedProcess.repeatDate.split(' ')
      return currDate ? currDate[0] : null
    }
  },
  beforeDestroy(){
    this.periods.map(el => el.isActive = false)
    const periodsDefault = this.periods.map(el => el.id === 1 ? ({...el, isActive: true}) : el)
    this.setPeriods(periodsDefault)
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