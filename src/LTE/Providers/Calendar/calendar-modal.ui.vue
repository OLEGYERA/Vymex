<template>
  <div class="calendar-provider calendar-modal-ui">
    <div class="calendar-wrapper" v-gesture.swipe="{animate: 'acceleration_h', duration: 300/*, animateThreshold: true*/}" @gestureStart="gestureStart" @gestureProcess="gestureProcess" @gestureEnd="gestureEnd">
<!--      <div class="wrapper" :style="{transform: gestureStyle}"></div>-->
      <calendar-header
        :year="calendar.Year"
        :month="calendar.Month"
        :diapason="[1970, 2022]"
        @onNewYear="calendar.updateYear($event)"/>
      <calendar-main :calendar="calendar" :calendar-replica="calendarReplica" :gesture="gesture"/>
    </div>
  </div>
</template>

<script>
import CalendarMixin from './mixin'
import CalendarHeader from './calendar-header.atom'
import CalendarMain from './calendar-main.atom'
import {Calendar} from './calendar'
import './style.scss'

export default {
  /*eslint-disable*/
  name: 'Providers.CalendarModalUi',
  components: {CalendarHeader, CalendarMain},
  mixins: [CalendarMixin],
  data: () => ({
    calendar: new Calendar(),
    calendarReplica: null
  }),
  mounted() {
    // setInterval(() => {this.calendar.shiftYear(1)}, 1000)
  },
  methods: {

    /*eslint-disable*/
    handleScroll(opts){
      if(opts.isGestureSwipe){
        if(opts.axisY){
          this.stl = 'translateY(' + (opts.posDir ? '-' : '') + (opts.deltaProgress) + '%)';
        } else {
          this.stl = 'translateX(' + (opts.posDir ? '-' : '') + (opts.deltaProgress) + '%)';
        }
      } else {
        let Progress = opts.deltaProgress / 100;
        // console.log(Progress)
        if(!opts.posDir){
          this.stl = 'scale(' + (Progress) + ')';
        } else {
          this.stl = 'scale(' + (1 - Progress) + ')';

        }
      }
    },
  }
}
</script>

<style lang="scss">
  .calendar-modal-ui{
    .calendar-wrapper{
      width: 460px;
      height: 400px;
      border-radius: 12px;
      .wrapper{
        height: 100%;
        width: 100%;
        background-color: #fff;
      }
    }
  }
</style>