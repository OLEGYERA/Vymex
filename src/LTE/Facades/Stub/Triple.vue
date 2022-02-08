<template>
  <div class="facade-stub-triple">
    <img :src="require(`@/assets/img/stub/${icon}.svg`)">
    <title-semi v-html="title"/>
    <text-base v-html="description"/>
  </div>
</template>

<script>
  import TitleSemi from '@Facade/Title/Semi'
  import TextBase from '@Facade/Text/Base'

  export default {
    name: 'Facade.Stub.Triple',
    props: {
      icon: String,
      title: String,
      description: String
    },
    components: {TitleSemi, TextBase},
  }
</script>

<style lang="scss" scoped>
  .facade-stub-triple{
    display: flex;
    flex-direction: column;
    align-items: center;
    img, .facade-title-semi{
      margin-bottom: 12px;
    }
    .facade-title-semi, .facade-text-base{
      text-align: center;
    }
  }
</style>