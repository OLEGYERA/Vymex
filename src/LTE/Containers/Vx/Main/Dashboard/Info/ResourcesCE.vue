<template>
  <div class="container-dashboard-resourcesCE">
    <div class="resourcesCE-header">
      <img :src="icon"/>
      <span class="header-title">Ресурсы С.Е.</span>
      <img :src="context"/>
    </div>
    <div class="resourcesCE-body">
      <span class="body-title">Последние</span>
      <div class="body-content">
        <div class="content-item"
             v-for="file in files"
             :key="file.id">
          <img :src="file.picture"/>
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
      icon: require('@/assets/img/my/resource.svg'),
      context: require('@/assets/img/icons/context.svg'),
      files: [
        {
          id: new Date(),
          file: "Новая папка(2)",
          picture: require('@/assets/img/icons/folder.svg')
        },
        {
          id: new Date(),
          file: "document create element.zip",
          picture: require('@/assets/img/icons/document.svg')
        },
        {
          id: new Date(),
          file: "Снимок экрана монитора 2021-10-2 ... .jpg",
          picture: require('@/assets/img/icons/screen.svg')
        },
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
      margin: 1% 52% 0% 2%;
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
        margin-top: 5%;

        .item-text {
          color: #FFF;
          font-size: 12px;
          line-height: 16px;
          margin-left: 2%;
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

