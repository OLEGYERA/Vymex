<template>
  <div class="dashboard-calendar">
    <div class="dashboard-calendar-header">
      <span class="dashboard-calendar-header-title">Календарь С.Е.</span>
    </div>
    <div class="dashboard-calendar-body">
      <div v-for="day in calendar"
           :key="day.id"
           class="dashboard-calendar-body-dates"
           :style="{
          backgroundColor: day.day === 'Ср' ? '#212A33' : '',
          borderRadius: '8px',
          padding: '4px'
          }">
        <span class="dashboard-calendar-body-dates-day">{{ day.day }}</span>
        <span class="dashboard-calendar-body-dates-date" :style="{
          backgroundColor: day.day === 'Пн' ? '#40A9FF' : '',
          height: '16px'
        }">{{ day.date }}</span>
        <div class="dashboard-calendar-body-dates-rectangle"
             v-for="(rectangle, i) in day.rectangles"
             :key="i"
             :style="{backgroundColor: rectangle}"></div>
      </div>
    </div>
    <div class="dashboard-calendar-footer">
      <div class="dashboard-calendar-footer-meeting">
        <div class="dashboard-calendar-footer-meeting-dot"></div>
        <div class="dashboard-calendar-footer-meeting-data">
          <span class="dashboard-calendar-footer-meeting-data-text">Встреча с инвестором</span>
          <span class="dashboard-calendar-footer-meeting-data-time">09:00 - 10:00</span>
        </div>
      </div>
      <span class="dashboard-calendar-footer-events">+4 события</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      calendar: [
        {id: new Date(), day: "Пн", date: 28, rectangles: ["#FF4D4F", "#73D13D"]},
        {id: new Date(), day: "Вт", date: 29, rectangles: []},
        {id: new Date(), day: "Ср", date: 30, rectangles: ["#FF4D4F", "#FACD23", "#73D13D", "#73D13D", "#FACD23"]},
        {id: new Date(), day: "Чт", date: 31, rectangles: ["#73D13D"]},
        {id: new Date(), day: "Пт", date: 1, rectangles: ["#FACD23", "#FACD23", "#73D13D"]},
        {id: new Date(), day: "Сб", date: 2, rectangles: []},
        {id: new Date(), day: "Вс", date: 3, rectangles: ["#73D13D"]},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-calendar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;

  .dashboard-calendar-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 29px;

    .dashboard-calendar-header-title {
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      color: #FFFFFF;
    }
  }

  .dashboard-calendar-body {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #313D49;
    border-radius: 12px;
    padding: 0px 9px;

    .dashboard-calendar-body-dates {
      display: flex;
      flex-direction: column;
      align-self: flex-start;
      justify-content: space-around;
      width: 100%;
      margin: 8px 4px;

      .dashboard-calendar-body-dates-day {
        width: 20px;
        height: 16px;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        color: #8296AA;
      }

      .dashboard-calendar-body-dates-date {
        width: 20px;
        height: 18px;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #FFFFFF;
        border-radius: 4px;
        margin-bottom: 2px;
      }

      .dashboard-calendar-body-dates-rectangle {
        height: 2px;
        width: 100%;
        margin-top: 1px;
      }
    }
  }

  .dashboard-calendar-footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 24px;

    .dashboard-calendar-footer-meeting {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: #313D49 1px solid;

      .dashboard-calendar-footer-meeting-dot {
        width: 6px;
        height: 6px;
        background: #FF4D4F;
        border-radius: 50%;
        margin-top: 15px;
        margin-right: 12px;
      }

      .dashboard-calendar-footer-meeting-data {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-bottom: 12px;

        .dashboard-calendar-footer-meeting-data-text {
          height: 20px;
          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          line-height: 20px;
          color: #FFFFFF;
        }

        .dashboard-calendar-footer-meeting-data-time {
          height: 16px;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 16px;
          color: #8296AA;
        }
      }
    }

    .dashboard-calendar-footer-events {
      height: 20px;
      font-style: normal;
      font-weight: 600;
      font-size: 15px;
      line-height: 20px;
      color: #1890FF;
      margin: 12px 0px 5px 0px;
    }
  }
}

</style>

