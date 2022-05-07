<template>
  <div class="container-vx-faq-article">
    <comeback @onClick="$router.push({name: 'vx.faq.category'})"/>
    <title-base class="vx-faq-article-title">{{ article.question }}</title-base>
    <div class="vx-faq-article-picture">
      <vymex-big-icon/>
      <div @click="modalStatus = !modalStatus">
        <faq-player v-if="article.video" class="article-picture-video" :size="12"/>
      </div>
    </div>
    <div v-html="article.answer"></div>
    <div class="vx-faq-article-border"></div>
    <div class="article-title" style="margin-bottom: 16px">Знаете как улучшить модуль
      <span>{{ article.question }}</span>?
    </div>
    <span class="article-recommendation-description">Напишите нам свои рекомендации и мы обязательно примем их во внимание, чтобы добавить в ближайшем плановом обновлении.</span>
    <div class="article-recommendation-options" @click="selectRecommendation">
      <div class="recommendation-options-info">
        <positive-icon class="recommendation-options-info-icon"/>
        <span class="recommendation-options-info-title">Оставить рекомендацию</span>
      </div>
      <img :src="require('@/assets/img/icons/vector-right.svg')"/>
    </div>
    <div class="vx-faq-article-border"></div>
    <div class="vx-faq-article-footer">
      <span class="article-title">Другие материалы</span>
      <articles :articles="otherArticles" :isShowVideoIcon="true"/>
    </div>
    <video-modal :modalStatus="modalStatus"
                 @closeModalStatus="modalStatus = !modalStatus"
                 :videoLink="article.video"/>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'vx.faq.article',
  data: () => ({
    modalStatus: false
  }),
  components: {
    Comeback: () => import('@Facade/Navigation/Comeback'),
    TitleBase: () => import('@Facade/Title/Base'),
    VymexBigIcon: () => import('@Icon/VymexBig'),
    FaqPlayer: () => import('../facades/faq.player'),
    Articles: () => import('../facades/articles'),
    PositiveIcon: () => import('@Icon/Positive'),
    VideoModal: () => import(('../facades/video.modal'))
  },
  computed: {
    ...mapGetters({
      article: 'getArticle',
      category: 'getCategory'
    }),
    otherArticles() {
      return this.category.articles.filter(el => el.id !== this.article.id)
    }
  },
  methods: {
    ...mapMutations({
      setTicketType: 'setSelectedTicketType'
    }),
    selectRecommendation() {
      this.$router.push({name: 'vx.support.feedback'})
      this.setTicketType('recommendation')
    }
  }
}
</script>

<style lang="scss" scoped>
.container-vx-faq-article {
  display: flex;
  flex-direction: column;

  .vx-faq-article-title {
    margin-bottom: rem(36);
    text-align: center;
  }

  .vx-faq-article-picture {
    position: relative;

    .article-picture-video {
      position: absolute;
      top: rem(24);
      left: rem(12);

      ::v-deep {
        .control-player {
          width: rem(52);
          height: rem(52);
        }

        .control-player-body {
          padding-bottom: 0;
        }
      }
    }
  }

  .vx-faq-article-border {
    height: 1px;
    width: 100%;
    background: $grey-scale-400;
    margin-bottom: rem(24);
  }

  .article-recommendation-description {
    font-weight: 400;
    font-size: rem(15);
    line-height: rem(20);
    color: $grey-scale-200;
    margin-bottom: rem(26);
  }

  .article-recommendation-options {
    display: inherit;
    justify-content: space-between;
    width: 94.3%;
    background: $grey-scale-500;
    border-radius: rem(16);
    padding: 0 rem(25) 0 rem(20);
    margin-bottom: rem(24);

    .recommendation-options-info {
      display: inherit;
      height: rem(64);

      .recommendation-options-info-icon {
        margin-top: rem(12);
      }

      .recommendation-options-info-title {
        font-weight: 400;
        font-size: rem(15);
        line-height: rem(20);
        color: #fff;
        margin: rem(22) 0 0 rem(12);
      }
    }
  }

  .vx-faq-article-footer {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}

.article-title {
  font-weight: 600;
  font-size: rem(22);
  line-height: rem(28);
  color: #FFF;
  margin-bottom: rem(24);
}
</style>