<template>
  <div class="container-calendar">
    <widgets-header @hide-item="hideItem"
                    :title="data.title"
                    :icon="data.icon"/>
    <div class="calendar-body">
      <div v-for="(day, i) in data.data.calendar"
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
           v-for="(event, i) in data.data.events"
           :key="i">
        <div class="meeting-dot"></div>
        <div class="meeting-data">
          <span class="data-text">{{ event.title }}</span>
          <span class="data-time">{{ event.time }}</span>
        </div>
      </div>
      <span class="footer-events">{{ data.data.otherEvents }}</span>
    </div>
  </div>
</template>

<script>
import WidgetsHeader from "@Container/Vx/Main/Dashboard/facades/WidgetsHeader";

export default {
  name: "Calendar",
  methods: {
    hideItem() {
      this.$emit('hide-item', this.data.name)
    },
  },
  components: {
    WidgetsHeader
  },
  props: {
    data: Object,
  }

}
</script>

<style lang="scss" scoped>
.container-calendar {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 224px;
  .calendar-body {
    display: flex;
    align-items: center;
    background: $grey-scale-400;
    border-radius: 12px;
    padding: 0 2%;
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
        font-size: rem(12);
        line-height: rem(16);
        text-align: center;
        color: $grey-scale-200;
      }
      .dates-date {
        width: 20px;
        height: 18px;
        font-weight: 600;
        font-size: rem(12);
        line-height: rem(16);
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
    margin-top: 5%;
    .footer-meeting {
      display: flex;
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
        margin-bottom: 3%;
        .data-text {
          height: 20px;
          font-size: rem(15);
          line-height: rem(20);
          color: #FFF;
        }
        .data-time {
          height: 16px;
          font-size: rem(12);
          line-height: rem(16);
          color: $grey-scale-200;
        }
      }
    }
    .footer-events {
      height: 20px;
      font-weight: 600;
      font-size: rem(15);
      line-height: rem(20);
      color: $blue;
      margin: 2% 0 4% 0;
    }
  }
}
</style>
