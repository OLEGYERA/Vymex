<template>
  <div class="container-vx-faq-articles">
    <div class="vx-faq-category-body" v-for="(article) in articles" :key="article.id"
         @click="openArticle(article.id)"
         :style="{padding: !article.video && '16px 20px'}">
      <div class="vx-faq-category-body-main">
        <title-sub class="category-body-main-title">{{ article.question }}</title-sub>
        <faq-player v-if="!isShowVideoIcon && article.video"/>
      </div>
      <img :src="require('@/assets/img/icons/vector-right.svg')"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'vx.faq.facade.articles',
  components: {
    TitleSub: () => import('@Facade/Title/Sub'),
    FaqPlayer: () => import('../facades/faq.player')
  },
  props: {
    articles: {
      type: Array,
      required: true
    },
    isShowVideoIcon: {
      type: Boolean
    }
  },
  methods: {
    openArticle(articleId) {
      this.$core.execViaComponent('FAQ', 'getArticle', articleId);
    }
  }
}
</script>

<style lang="scss" scoped>
.container-vx-faq-articles {
  .vx-faq-category-body {
    display: flex;
    justify-content: space-between;
    width: 95%;
    background: $grey-scale-400;
    border-radius: rem(16);
    padding: rem(14) rem(20);
    margin-bottom: rem(12);

    .vx-faq-category-body-main {
      display: inherit;
      .category-body-main-title {
        display: inherit;
        align-items: center;
      }
    }
  }
}
</style>