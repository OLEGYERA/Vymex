<template>
  <div class="container-dashboard-resourcesCE">
    <div class="resourcesCE-header">
      <span class="header-title">Ресурсы С.Е.</span>
    </div>
    <div class="resourcesCE-body">
      <span class="body-title">Последние</span>
      <div class="body-content">
        <div class="content-item"
             v-for="file in files"
             :key="file.id">
          <span class="item-text">{{ file.file }}</span>
          <div class="item-border"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResourcesCE",
  data() {
    return {
      files: [
        {id: new Date(), file: "Новая папка(2)"},
        {id: new Date(), file: "document create element.zip"},
        {id: new Date(), file: "Снимок экрана монитора 2021-10-2 ... .jpg"},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.container-dashboard-resourcesCE {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;

  .resourcesCE-header {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 8%;

    .header-title {
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      color: #FFF;
    }
  }

  .resourcesCE-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .body-title {
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: $grey-scale-200;
      margin-bottom: 2%;
    }

    .body-content {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .content-item {
        margin-top: 12px;

        .item-text {
          color: #FFF;
          font-size: 12px;
          line-height: 16px;
        }

        .item-border {
          border-bottom: #313D49 solid 1px;
          margin-top: 2%;
        }
      }
    }
  }
}

</style>

