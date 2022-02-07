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
  name: "ResourcesCEChild",
  data() {
    return {
      icon: require('@/assets/img/my/resource.svg'),
      context: require('@/assets/img/icons/context.svg'),
    }
  },
  props: ['files']
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
  height: 224px;

  .resourcesCE-header {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 7%;

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
      margin-bottom: 1%;
    }

    .body-content {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .content-item {
        margin-top: 3%;

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

