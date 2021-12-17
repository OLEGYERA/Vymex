<template>
  <span class="facade-time-base">
    <span class="days-box" v-if="day">{{getTime.days}}</span><span class="delimiter dh" v-if="day">:</span>
    <span class="hours-box" v-if="hour">{{getTime.hours}}</span><span class="delimiter hm" v-if="hour">:</span>
    <span class="minutes-box">{{getTime.minutes}}</span><span class="delimiter ms">:</span>
    <span class="days-box">{{getTime.seconds}}</span>
  </span>
</template>

<script>
  export default {
    name: 'Facade.Time.Base',
    props: {
      time: {
        type: Number,
        required: true
      },
      day: Boolean,
      hour: Boolean,
    },
    computed: {
      getTime(){
        const time = this.time;
        let days = Math.floor(time / (60 * 60 * 24)),
            hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60)),
            minutes = Math.floor((time % (60 * 60)) / (60)),
            seconds = Math.floor(time % 60);

        return {
          days: days < 10 ? '0' + days : days,
          hours: hours < 10 ? '0' + hours : hours,
          minutes: minutes < 10 ? '0' + minutes : minutes,
          seconds: seconds < 10 ? '0' + seconds : seconds
        }
      }
    }
  }
</script>