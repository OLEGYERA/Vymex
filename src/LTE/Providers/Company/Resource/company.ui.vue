<template>
  <div class="resource-company-ui">
    <img class="company-avatar" :src="company.avatar">
    <div class="company-info-group">
      <title-sub>{{company.name}}</title-sub>
      <title-caption>Компания</title-caption>
    </div>
  </div>
</template>

<script>
  import TitleCaption from '@Facade/Title/Caption'
  import TitleSub from "@Facade/Title/Sub"

  export default {
    name: 'Providers.Company.Resource.Company.Ui',
    components: {
      TitleSub,
      TitleCaption,
    },
    props: {
      company: Object
    }
  }
</script>

<style lang="scss" scoped>
  .resource-company-ui {
    display: flex;
    align-items: center;
    padding: rem(8);
    border-radius: 8px;
    background-color: $grey-scale-400;
    .company-avatar {
      margin-right: rem(12);
      height: 36px;
      width: 36px;
      border-radius: 50%;
    }
    .company-info-group{
      .facade-title-sub{
        margin-bottom: 4px;
      }
    }
  }
</style>