<template>
  <div class="calendar-provider calendar-modal-ui">
    <div class="calendar-wrapper" v-gesture @someEvent="handleScroll">
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
  // directives: {scroll},
  mixins: [CalendarMixin],
  data: () => ({
    wheel: null,
    other: null,
    onTouch: false,
    stl: 'translateY(0%)'
  }),
  mounted() {
    // let win = document.getElementsByClassName('calendar-wrapper')[0]
    // win.addEventListener('wheel', this.handleScroll1);
    //
    // if("ontouchstart" in window){
    //   console.log(123)
    //   win.addEventListener('touchstart', this.touchStartHandler);
    //   win.addEventListener('touchmove', this.touchMoveHandler);
    //   win.addEventListener('touchend', this.touchEndHandler);
    // }
  },
  methods: {
    touchStartHandler(){
      this.onTouch = true
    },
    touchEndHandler(){
      this.onTouch = false
    },
    touchMoveHandler(e){
      if(this.onTouch){
        console.log(e)
      }
    },
    handleScroll(percent){
      this.stl = 'translateY(' + (percent) + '%)';
      // console.log('In Vue', percent, this.stl)
    },

    handleScroll1(evt){
      evt.preventDefault()
      console.log(evt)
      this.wheel = evt
      // return true;
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
      overflow: visible;
      .wrapper{
        width: 100%;
        height: 400px;
        background-color: #fff;
      }
    }
  }
</style>