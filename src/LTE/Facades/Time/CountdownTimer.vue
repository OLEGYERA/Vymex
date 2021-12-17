<template>
  <span class="facade-time-countdown-timer">
    <time-base :time="value" :day="day" :hour="hour"/>
  </span>
</template>

<script>
  import TimeBase from "@Facade/Time/Base";

  export default {
    name: 'Facade.Time.CountdownTimer',
    components: {
      TimeBase
    },
    props: {
      time: {
        type: Number,
      },
      day: Boolean,
      hour: Boolean,
    },
    mounted() {
      if(this.time > 0){
        this.value = this.time;
        this.startTimer();
      }
    },
    data(){
      return {
        value: 0,
      }
    },
    methods: {
      startTimer(){
        this.$emit('onStart')
        let timer = setInterval(() => {
          if(this.value < 1) {
            this.$console.variable(this.value <= 0)
            this.$emit('onExpired');
            clearInterval(timer);
          } else {
            --this.value;
          }
        }, 1000)
      },
    }
  }
</script>