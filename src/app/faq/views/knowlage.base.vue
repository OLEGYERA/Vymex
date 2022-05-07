<template>
  <div class="container-faq-knowlage-base">
    <navigation-close @onClick="$router.push({name: 'vx'})"/>
    <title-base>База знаний</title-base>
    <div class="faq-knowlage-base-body">
      <div class="base-body-description">Здесь вы можете найти ответы на все вопросы о работе системы</div>
      <div v-for="category in showAllCategories ? categories : firstFiveCategories"
           :key="category.id"
           class="base-body-categories"
           @click="openArticles(category.id)">
        <plate-faq>
          <template #icon>
            <img v-if="category.icon !== 'null'" :src="category.icon" class="base-body-categories-icon"/>
            <icon-process v-else/>
          </template>
          <template #title>{{ category.title }}</template>
        </plate-faq>
      </div>
    </div>
    <button-base class="faq-knowlage-base-button" @onClick="showAllCategories = true">Смотреть все</button-base>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'vx.faq.knowlage.base',
  data: () => ({
    showAllCategories: false
  }),
  components: {
    NavigationClose: () => import('@Facade/Navigation/Close'),
    TitleBase: () => import('@Facade/Title/Base'),
    PlateFaq: () => import('@Facade/Plate/Faq'),
    IconProcess: () => import('@Icon/Colored/Process'),
    ButtonBase: () => import('@Facade/Button/Base')
  },
  mounted() {
    this.$core.execViaComponent('FAQ', 'getCategories');
  },
  computed: {
    ...mapGetters({categories: 'getCategories'}),
    firstFiveCategories(){
      return this.categories.slice(0,5)
    }
  },
  methods: {
    openArticles(categoryId){
        this.$core.execViaComponent('FAQ', 'getArticles', categoryId);
    }
  }
}
</script>

<style lang="scss" scoped>
.container-faq-knowlage-base {
  display: flex;
  align-items: center;
  flex-direction: column;

  .faq-knowlage-base-body {
    width: 95%;
    background: $grey-scale-500;
    border-radius: rem(16);
    margin-top: rem(36);
    padding: rem(24) rem(20);

    .base-body-description {
      width: 62%;
      margin: 0 21% rem(24);
      font-weight: 400;
      font-size: rem(15);
      line-height: rem(20);
      text-align: center;
      color: $grey-scale-200;
    }

    .base-body-categories {
      margin-top: rem(12);

      .base-body-categories-icon {
        width: rem(32);
        height: rem(32)
      }
    }
  }
  .faq-knowlage-base-button{
    width: rem(222);
    margin: rem(36) 0 rem(104);
  }
}
</style>