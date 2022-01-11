<template>
  <div class="calendar-provider calendar-modal-ui">
    <div class="calendar-wrapper" v-gesture
         @gestureStart="gestureStart" @gestureProcess="gestureProcess" @gestureEnd="gestureEnd">
      <div class="wrapper" :style="{transform: stl}"></div>
      

      <calendar-header/>
    </div>
  </div>
</template>

<script>
import CalendarMixin from './mixin'
import CalendarHeader from './calendar-header.atom'
import './style.scss'

export default {
  name: 'Providers.CalendarModalUi',
  components: {CalendarHeader},
  mixins: [CalendarMixin],
  data: () => ({
    wheel: null,
    other: null,
    onTouch: false,
    stl: 'translateY(0%)',
  }),
  methods: {
    gestureStart({type, axisY, posDir}){
      console.log(type, axisY, posDir, 'Start')
    },
    gestureProcess(process){
      console.log(process, 'Process')
    },
    gestureEnd(){
      console.log('End')
    },
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
      //width: 460px;
      //height: 400px;
      border-radius: 12px;
      overflow: visible;
      .wrapper{
        width: 100%;
        height: 400px;
        background-color: #fff;
        //transition: 200ms all ease;
      }
    }
  }
</style>