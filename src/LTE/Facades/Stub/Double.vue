<template>
  <div class="facade-stub-double">
    <img :src="require(`@/assets/img/stub/${icon}`)">
    <title-semi v-html="title"/>
  </div>
</template>

<script>
  import TitleSemi from '@Facade/Title/Semi'

  export default {
    name: 'Facade.Stub.Triple',
    props: {
      icon: String,
      title: String,
      description: String
    },
    components: {TitleSemi},
  }
</script>

<style lang="scss" scoped>
  .facade-stub-double{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img, .facade-title-semi{
      margin-bottom: 12px;
    }
    .facade-title-semi{
      text-align: center;
    }
  }
</style>