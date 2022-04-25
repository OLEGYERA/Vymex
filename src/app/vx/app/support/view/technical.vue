<template>
  <div class="support-technical-view">
    <navigation-close @onClick="$router.push({name: 'vx'})"/>
    <div class="technical-view-main">
      <title-base class="technical-view-main-title">Техническая поддержка</title-base>
      <div class="technical-view-main-body">
        <span class="main-body-description">Здесь вы можете найти ответы на все вопросы о работе системы, а также оставить рекомендации или сообщить об ошибке</span>
        <div class="main-body-options" @click="selectRecommendation">
          <div class="body-options-info">
            <positive-icon class="body-options-info-icon"/>
            <span class="body-options-info-title">Оставить рекомендацию</span>
          </div>
          <img :src="require('@/assets/img/icons/vector-right.svg')"/>
        </div>
        <div class="main-body-border"></div>
        <div class="main-body-options" @click="selectBug">
          <div class="body-options-info">
            <negative-icon class="body-options-info-icon"/>
            <span class="body-options-info-title">Сообщить об ошибке</span>
          </div>
          <img :src="require('@/assets/img/icons/vector-right.svg')"/>
        </div>
        <div class="main-body-border"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: 'vx.support.technical',
  components: {
    NavigationClose: () => import('@Facade/Navigation/Close'),
    TitleBase: () => import('@Facade/Title/Base'),
    PositiveIcon: () => import('@Icon/Positive'),
    NegativeIcon: () => import('@Icon/Negative'),
  },
  methods: {
    ...mapMutations({
      setTicketType: 'setSelectedTicketType'
    }),
    selectRecommendation() {
      this.$router.push({name: 'vx.support.feedback'})
      this.setTicketType('recommendation')
    },
    selectBug() {
      this.$router.push({name: 'vx.support.feedback'})
      this.setTicketType('bug')
    }
  }
}
</script>

<style lang="scss" scoped>
.support-technical-view {

  .technical-view-main {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: rem(110);

    .technical-view-main-title {
      margin-top: rem(8);
    }

    .technical-view-main-body {
      display: inherit;
      align-items: center;
      flex-direction: column;
      width: 95%;
      height: 100%;
      background: $grey-scale-500;
      margin-top: rem(36);
      border-radius: 16px;
      padding: rem(24) rem(20) rem(220);

      .main-body-description {
        width: 62%;
        height: rem(60);
        font-weight: 400;
        font-size: rem(15);
        line-height: rem(20);
        text-align: center;
        color: $grey-scale-200;
        margin-bottom: rem(24);
      }

      .main-body-options {
        display: inherit;
        justify-content: space-between;
        width: 100%;

        .body-options-info {
          display: inherit;
          height: rem(64);

          .body-options-info-icon {
            margin-top: rem(12);
          }

          .body-options-info-title {
            font-weight: 400;
            font-size: rem(15);
            line-height: rem(20);
            color: #fff;
            margin: rem(22) 0 0 rem(12);
          }
        }
      }

      .main-body-border {
        width: 100%;
        height: rem(1);
        background: $grey-scale-400;
      }
    }
  }
}
</style>