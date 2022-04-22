<template>
  <div class="calendar-provider calendar-modal-ui" @click.self="$emit('onClose')" v-if="status">
    <div class="calendar-wrapper" v-gesture="{animate, duration: 400}" @gestureStart="gestureStart" @gestureProcess="gestureProcess" @gestureEnd="gestureEnd" :style="{transform: gesture.styleExit}">
      <calendar-header
        :calendar="calendar"
        :calendarReplica="calendarReplica"
        :gesture="gesture"
        @onClose="$emit('onClose')"/>
      <calendar-main :calendar="calendar" :calendar-replica="calendarReplica" @onChoose="pickDate" :gesture="gesture"/>
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
  name: 'Providers.CalendarModalUi',
  components: {CalendarHeader, CalendarMain},
  mixins: [CalendarMixin],
  props: {
    status: {
      type: Boolean,
      required: true
    },
  },
  data: () => ({
    calendar: new Calendar(),
    calendarReplica: null,
  }),
  methods: {
    pickDate(day){
      let month = this.calendar.monthPoint.getMonth() + 1;
      this.$emit('onDate',  this.calendar.Year +  '-' + (month < 10 ? '' + 0 + month : month) + '-' + (day < 10 ? '' + 0 + day : day));
    },
  },
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