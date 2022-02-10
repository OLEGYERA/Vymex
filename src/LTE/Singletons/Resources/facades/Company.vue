<template>
  <div class="facade-resource-company">
    <img class="company-img" :src="company.img">
    <div class="company-info">
      <title-sub>{{company.name}}</title-sub>
      <title-caption>Компания</title-caption>
    </div>
  </div>
</template>

<script>
import TitleCaption from '@Facade/Title/Caption'
import TitleSub from "@Facade/Title/Sub"

export default {
  name: 'Facade.Resource.Company',
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
.facade-resource-company {
  display: flex;
  align-items: center;
  padding: rem(8);
  border-radius: 8px;
  background-color: $grey-scale-400;
  .company-img {
    margin-right: rem(12);
    height: 36px;
    width: 36px;
    border-radius: 50%;
  }
  .company-info{
    .facade-title-sub {
      margin-bottom: rem(4);
      line-height: 16px;
    }
  }
}
</style>