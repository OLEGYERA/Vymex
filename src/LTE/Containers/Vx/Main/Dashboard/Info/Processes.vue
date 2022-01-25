<template>
  <div class="container-dashboard-processes">
    <div class="processes-header">
      <img :src="icon"/>
      <span class="header-title">Процессы С.Е.</span>
      <img :src="context"/>
    </div>
    <div class="processes-body"
         v-for="process in processes"
         :key="process.id">
      <div class="body-titleProcess">{{ process.titleProcess }}</div>
      <div class="body-date">
        <img :src="process.calendarIcon"/>
        <div class="date-titleDate">{{ process.titleDate }}</div>
        <img :src="process.changeIcon"/>
      </div>
      <div class="body-border"></div>
    </div>
    <div class="processes-footer">Смотреть все</div>
  </div>
</template>

<script>
export default {
  name: "Processes",
  data() {
    return {
      icon: require('@/assets/img/my/process.svg'),
      context: require('@/assets/img/icons/context.svg'),
      processes: [
        {
          id: new Date(),
          titleProcess: "Длинное название процесса, которое ...",
          titleDate: "15 янв. 2021",
          calendarIcon: require('@/assets/img/icons/calendar-grey.svg'),
          changeIcon: require('@/assets/img/icons/change.svg'),
        },
        {
          id: new Date(),
          titleProcess: "Длинное название процесса, которое ...",
          titleDate: "15 янв. 2021",
          calendarIcon: require('@/assets/img/icons/calendar-grey.svg'),
          changeIcon: require('@/assets/img/icons/change.svg'),
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.container-dashboard-processes {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;

  .processes-header {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 9%;

    .header-title {
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      color: #FFF;
      margin: 1% 48% 0% 2%;
    }
  }

  .processes-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 4%;

    .body-titleProcess {
      height: auto;
      font-size: 15px;
      line-height: 20px;
      color: #FFF;
      margin-bottom: 2%;
    }

    .body-date {
      display: flex;
      justify-content: flex-start;

      .date-titleDate {
        font-size: 12px;
        line-height: 16px;
        color: $grey-scale-200;
        margin: 0% 2%;
      }
    }

    .body-border {
      border-bottom: $grey-scale-400 solid 1px;
      margin-top: 2%;
    }
  }

  .processes-footer {
    height: 20px;
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
    color: $blue;
    margin-top: 2%;
  }
}

</style>

