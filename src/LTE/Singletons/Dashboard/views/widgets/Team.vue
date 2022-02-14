<template>
  <div  :class="[hideWidget === 'Team'
  ? (index + 1) % 2 === 0
  ? 'hide-right-widget'
  : 'hide-left-widget' : '',
  'container-dashboard-team']">
    <widgets-header @show-context="showContext"
                    :title="data.title"
                    :icon="data.icon"/>
    <div class="team-body">
      <div class="body-people">
        <span class="people-total">Людей в компании</span>
        <span class="people-sum">{{ data.data.humans }}</span>
      </div>
      <div class="body-people">
        <span class="people-total">Вакансии</span>
        <span class="people-sum">{{ data.data.vacancies }}</span>
      </div>
    </div>
    <div class="team-footer">
      <span class="footer-title">Последняя активность:</span>
      <div class="footer-positions">
        <div v-for="(man, i) in data.data.people"
             :key="i">
          <div class="footer-unit">
            <img :src="man.avatar" class="positions-avatar"/>
            <span class="positions-title">{{ man.position }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WidgetsHeader from "../../facades/WidgetsHeader";
import {mapGetters} from "vuex";

export default {
  name: "Team",
  methods: {
    showContext(value) {
      this.$emit('show-context', value, this.data.name)
    },
  },
  components: {
    WidgetsHeader
  },
  props: {
    data: Object,
    index: Number
  },
  computed: {
    ...mapGetters({
      hideWidget: 'getHideWidget'
    }),
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/animations.module';

.container-dashboard-team {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 224px;

  .team-body {
    display: inherit;
    padding-bottom: 4%;

    .body-people {
      display: inherit;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: 8px;
      background: $grey-scale-400;
      border-radius: 12px;
      width: 100%;
      margin-right: 0;
      margin-left: 8px;

      .people-total {
        font-size: rem(12);
        line-height: rem(16);
        color: $grey-scale-200;
      }

      .people-sum {
        font-weight: 600;
        font-size: rem(20);
        color: #FFF;
        margin-top: 5%;
      }

      &:first-child {
        margin-right: 8px;
        margin-left: 0;
      }
    }
  }

  .team-footer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .footer-title {
      font-weight: 600;
      font-size: rem(12);
      line-height: rem(16);
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: $grey-scale-200;
      margin-top: 3%;
    }

    .footer-positions {
      display: inherit;
      justify-content: space-around;
      width: 100%;
      margin-top: 3%;

      .footer-unit {
        display: flex;
        justify-content: center;
        text-align: center;
        flex-direction: column;
        width: 66px;

        .positions-avatar {
          height: 32px;
          width: 32px;
          margin: auto;
        }

        .positions-title {
          font-size: rem(10);
          line-height: rem(16);
          color: #FFF;
          margin-top: 6%;
        }
      }
    }
  }
}
</style>

