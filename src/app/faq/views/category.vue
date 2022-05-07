<template>
  <div class="container-vx-faq-category">
    <comeback @onClick="$router.push({name: 'vx.faq'})"/>
    <div class="vx-faq-category-header">
      <div class="faq-category-header-background">
        <img v-if="searchIcon !== 'null'"
             :src="searchIcon"
             class="header-background-icon"/>
        <icon-process v-else class="header-background-icon" :size="52"/>
      </div>
      <div class="faq-category-header-main">
        <title-base class="header-main-title">{{ category.categoryTitle }}</title-base>
        <span class="header-main-description">Короткое описание</span>
      </div>
    </div>
    <articles :articles="category.articles"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'vx.faq.category',
  components: {
    Comeback: () => import('@Facade/Navigation/Comeback'),
    IconProcess: () => import('@Icon/Colored/Process'),
    TitleBase: () => import('@Facade/Title/Base'),
    Articles: () => import('../facades/articles')
  },
  computed: {
    ...mapGetters({
      category: 'getCategory',
      categories: 'getCategories',
    }),
    searchIcon() {
      let category = this.categories.filter(el => el.id === this.category.categoryId)
      return category[0].icon
    }
  }
}
</script>

<style lang="scss" scoped>
.container-vx-faq-category {
  .vx-faq-category-header {
    display: flex;
    margin-bottom: rem(30);

    .faq-category-header-background {
      position: relative;
      width: rem(92);
      height: rem(92);
      border-radius: 45%;
      background: $grey-scale-300;
      margin-right: rem(24);

      .header-background-icon {
        position: absolute;
        top: rem(20);
        left: rem(20);
        width: rem(52);
        height: rem(52);
        border-radius: 50%;
      }
    }

    .faq-category-header-main {
      .header-main-title {
        margin-bottom: rem(12);
      }

      .header-main-description {
        font-weight: 400;
        font-size: rem(15);
        line-height: rem(20);
        color: $grey-scale-200;
      }
    }
  }
}
</style>