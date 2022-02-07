<template>
  <div class="container-calendar">
    <div class="calendar-header">
      <img :src="icon"/>
      <span class="header-title">Календарь С.Е.</span>
      <img :src="context"/>
    </div>
    <div class="calendar-body">
      <div v-for="(day, i) in data.calendar"
           :key="i"
           class="body-dates"
           :style="{
          backgroundColor: day.day === 'Ср' ? '#212A33' : '',
          borderRadius: '8px',
          padding: '4px'
          }">
        <span class="dates-day">{{ day.day }}</span>
        <span class="dates-date" :style="{
          backgroundColor: day.day === 'Пн' ? '#40A9FF' : '',
          height: '16px'
        }">{{ day.date }}</span>
        <div class="dates-rectangle"
             v-for="(rectangle, i) in day.rectangles"
             :key="i"
             :style="{backgroundColor: rectangle}"></div>
      </div>
    </div>
    <div class="calendar-footer">
      <div class="footer-meeting"
           v-for="(event, i) in data.events"
           :key="i">
        <div class="meeting-dot"></div>
        <div class="meeting-data">
          <span class="data-text">{{event.title}}</span>
          <span class="data-time">{{event.time}}</span>
        </div>
      </div>
      <span class="footer-events">{{data.otherEvents}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      icon: require('@/assets/img/my/calendar.svg'),
      context: require('@/assets/img/icons/context.svg'),
    }
  },
  props: ['data']
}
</script>

<style lang="scss" scoped>
.container-calendar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 224px;

  .calendar-header {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 7%;

    .header-title {
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      color: #FFF;
      margin: 1% 46% 0% 2%;
    }
  }

  .calendar-body {
    display: flex;
    align-items: center;
    background: $grey-scale-400;
    border-radius: 12px;
    padding: 0% 2%;

    .body-dates {
      display: flex;
      flex-direction: column;
      align-self: flex-start;
      justify-content: space-around;
      width: 100%;
      margin: 2% 1%;

      .dates-day {
        width: 20px;
        height: 16px;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        color: $grey-scale-200;
      }

      .dates-date {
        width: 20px;
        height: 18px;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #FFF;
        border-radius: 4px;
        margin-bottom: 2px;
      }

      .dates-rectangle {
        height: 2px;
        width: 100%;
        margin-top: 1px;
      }
    }
  }

  .calendar-footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 5%;

    .footer-meeting {
      display: flex;
      justify-content: flex-start;
      border-bottom: $grey-scale-400 1px solid;

      .meeting-dot {
        width: 6px;
        height: 6px;
        background: $red;
        border-radius: 50%;
        margin-top: 5%;
        margin-right: 4%;
      }

      .meeting-data {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-bottom: 3%;

        .data-text {
          height: 20px;
          font-size: 15px;
          line-height: 20px;
          color: #FFF;
        }

        .data-time {
          height: 16px;
          font-size: 12px;
          line-height: 16px;
          color: $grey-scale-200;
        }
      }
    }

    .footer-events {
      height: 20px;
      font-weight: 600;
      font-size: 15px;
      line-height: 20px;
      color: $blue;
      margin: 2% 0% 4% 0%;
    }
  }
}

</style>

