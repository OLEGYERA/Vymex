<template>
  <div class="container-dashboard-processes">
    <div class="processes-header">
      <span class="header-title">Процессы С.Е.</span>
    </div>
    <div class="processes-body"
         v-for="process in processes"
         :key="process.id">
      <div class="body-titleProcess">{{ process.titleProcess }}</div>
      <div class="body-date">
        <div class="date-titleDate">{{ process.titleDate }}</div>
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
      processes: [
        {id: new Date(), titleProcess: "Длинное название процесса, которое ...", titleDate: "15 янв. 2021"},
        {id: new Date(), titleProcess: "Длинное название процесса, которое ...", titleDate: "15 янв. 2021"},
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
      margin-bottom: 1%;
    }

    .body-date {
      display: flex;
      justify-content: flex-start;

      .date-titleDate {
        font-size: 12px;
        line-height: 16px;
        color: $grey-scale-200;
      }
    }

    .body-border {
      border-bottom: $grey-scale-400 solid 1px;
      margin-top: 1%;
    }
  }
  .processes-footer{
      height: 20px;
      font-weight: 600;
      font-size: 15px;
      line-height: 20px;
      color: $blue;
      margin-top: 4%;
  }
}

</style>

