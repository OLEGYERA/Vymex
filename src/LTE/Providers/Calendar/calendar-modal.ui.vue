<template>
  <div class="calendar-provider calendar-modal-ui">
    <div class="calendar-wrapper" v-gesture @someEvent="handleScroll">

      <div class="wheel-alert" v-if="wheel">
        deltaX: {{wheel.deltaX}}
        <br>
        deltaY: {{wheel.deltaY}}
        <br>
        deltaZ: {{wheel.deltaZ}}
        <br>
        wDelta: {{wheel.wheelDelta}}  wDeltaX: {{wheel.wheelDeltaX}} wDeltaY: {{wheel.wheelDeltaY}}
        <br>
        deltaMode: {{wheel.deltaMode}}
        <br>

        which: {{wheel.which}} | altKey: {{wheel.altKey}} | shiftKey: {{wheel.shiftKey}}
        <br>
        button: {{wheel.button}} | buttons: {{wheel.buttons}} | cancelable: {{wheel.cancelable}}
        <br>

        type: {{ other.type }}
        <br>
        category: {{ other.category }}
        <br>
        depth: {{ other.depth }}
        <br>
        time: {{ other.time }}
        <br>
        delta: {{ other.delta }} | deltaX: {{other.deltaX}} | deltaY: {{other.deltaY}}
        <br>
        speed: {{other.speed}}

        <br>


      </div>

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
    onTouch: false
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
    handleScroll(e, d){
      this.other = d
      this.wheel = e
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
    }
  }
</style>