<template>
  <div class="container-dashboard-team">
    <div class="team-header">
      <img :src="icon"/>
      <span class="header-title">Команда</span>
      <div class="team-header-menu-button" @click="actionListStatus = !actionListStatus">
        <img :src="context" :class="{active: actionListStatus}"/>
        <transition name="fade">
          <action-list :items="items" v-if="actionListStatus"/>
        </transition>
      </div>
    </div>
    <div class="team-body">
      <div class="body-people"
           :style="{ marginRight: '8px' }">
        <span class="people-total">Людей в компании</span>
        <span class="people-sum">{{data.humans}}</span>
      </div>
      <div class="body-people"
           :style="{ marginLeft: '8px' }">
        <span class="people-total">Вакансии</span>
        <span class="people-sum">{{data.vacancies}}</span>
      </div>
    </div>
    <div class="team-footer">
      <span class="footer-title">Последняя активность:</span>
      <div class="footer-positions">
        <div v-for="(men, i) in data.people"
             :key="i">
          <div class="footer-unit">
            <img :src="men.avatar" class="positions-avatar"/>
            <span class="positions-title">{{ men.position }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActionList from "@/LTE/Singletons/Messenger/facades/ActionList";
export default {
  name: "Team",
  data() {
    return {
      icon: require('@/assets/img/my/team.svg'),
      context: require('@/assets/img/icons/context.svg'),
      actionListStatus: false,
    }
  },
  components: {
    ActionList,
  },
  props: ['data', 'items']
}
</script>

<style lang="scss" scoped>
.container-dashboard-team {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 224px;

  .team-header {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 7%;

    .header-title {
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      color: #FFF;
      margin: 1% 62% 0% 2%;
    }
    .team-header-menu-button {
      position: relative;
      .singleton-messenger-action-list {
        position: absolute;
        bottom: -1px;
        z-index: 1;
        right: -1px;
        transform: translateY(100%);
      }
    }
  }

  .team-body {
    display: flex;
    padding-bottom: 4%;

    .body-people {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: 8px;
      background: $grey-scale-400;
      border-radius: 12px;
      width: 100%;

      .people-total {
        font-size: 12px;
        line-height: 16px;
        color: $grey-scale-200;
      }

      .people-sum {
        font-weight: 600;
        font-size: 20px;
        color: #FFF;
        margin-top: 5%;
      }
    }
  }

  .team-footer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .footer-title {
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: $grey-scale-200;
      margin-top: 3%;
    }

    .footer-positions {
      display: flex;
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
          font-size: 10px;
          line-height: 16px;
          color: #FFF;
          margin-top: 6%;
        }
      }
    }
  }
}
</style>

