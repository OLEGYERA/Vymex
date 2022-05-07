<template>
  <div class="singleton-co-registration-limits-app">
    <comeback @onClick="$router.push({name: 'vx'})"/>
    <div class="registration-limits-app-view">
      <div class="app-view-head">
        <div class="app-view-head-text">
          <div class="text-head-title">Статистика использования VYMEX</div>
          <div class="text-head-description">Мы предусмотрели плановую нагрузку для максимально комфортного
            использования системы без сбоев.
          </div>
        </div>
        <vymex-logo class="app-view-head-logo"/>
      </div>
      <div class="app-view-body">
        <div class="app-view-body-left-part">
          <span class="left-part-title">Достигнут лимит компаний на текущий месяц</span>
          <div class="left-part-main">
            <div class="left-part-main-left">
              <calendar-icon :size="24"/>
              <span class="main-left-right-title">{{ nextMonth }}</span>
              <span class="main-left-right-description">Доступный месяц</span>
            </div>
            <div class="left-part-main-right">
              <home-icon :size="24"/>
              <span class="main-left-right-title">{{
                  registrationLimitsRes.nextQueue
                      ? '+' + registrationLimitsRes.nextQueue.limit
                      : '+300'
                }}</span>
              <span class="main-left-right-description">Компаний</span>
            </div>
          </div>
          <div class="left-part-description">Успейте записаться на регистрацию своей компании!</div>
          <button-base @onClick="getQueueId" class="left-part-button">Записаться на регистрацию</button-base>
        </div>
        <div class="app-view-body-right-part">
          <div class="right-part-line-companies">
            <div class="right-part-users-companies-main">
              <homes-icon/>
              <span class="users-companies-main-title">Компаний в очереди на регистрацию</span>
            </div>
            <span class="right-part-users-companies-num">{{ registrationLimitsRes.nextQueue.current - 1 }}</span>
          </div>
          <div class="right-part-registered-users">
            <div class="right-part-users-companies-main">
              <human-icon/>
              <span class="users-companies-main-title">Зарегистрированно пользователей в системе</span>
            </div>
            <span class="right-part-users-companies-num">{{ registrationLimitsRes.userCount }}</span>
          </div>
        </div>
      </div>
    </div>
    <sign-up-registration-modal :isShowModal="isShowModal"
                                @close-modal="isShowModal = !isShowModal"/>
  </div>
</template>

<script>

import {mapGetters} from 'vuex';

export default {
  name: 'vx.co.registration.limits.view',
  components: {
    Comeback: () => import('@Facade/Navigation/Comeback'),
    VymexLogo: () => import('@Icon/Vymex'),
    CalendarIcon: () => import('@Icon/Calendar'),
    HomeIcon: () => import('@Icon/Home'),
    ButtonBase: () => import('@Facade/Button/Base'),
    HomesIcon: () => import('@Icon/Homes'),
    HumanIcon: () => import('@Icon/Human'),
    SignUpRegistrationModal: () => import('./views/sign.up.registration'),
  },
  data: () => ({
    isShowModal: false
  }),
  computed: {
    ...mapGetters({
      registrationLimitsRes: 'getRegistrationLimitsRes',
      month: 'getMonth',
      userDraftRes: 'getUserDraftRes'
    }),
    nextMonth() {
      let currentMonth = new Date().getMonth()
      let index
      if (this.registrationLimitsRes.nextQueue) {
        if (this.registrationLimitsRes.nextQueue.limit >= this.registrationLimitsRes.nextQueue.current) {
          index = currentMonth < 11 ? currentMonth + 1 : 0
        } else {
          index = currentMonth < 10 ? currentMonth + 2 : currentMonth === 10 ? 0 : 1
        }
        return this.month[index]
      } else {
        return this.month[currentMonth]
      }
    }
  },
  methods: {
     getQueueId(){
       if(this.userDraftRes.length <= 3){
         this.isShowModal = !this.isShowModal
         this.$core.execViaComponent('CompanyDraft', 'createRegistrationLimits', {
           startAt: this.registrationLimitsRes.nextQueue.startAt.split(' ')[0],
           endAt: this.registrationLimitsRes.nextQueue.endAt.split(' ')[0],
           limit: this.registrationLimitsRes.nextQueue.limit
         });
       } else {
         this.$notify({
           text: 'Поставить в очередь на регистрацию можно не более 3-х компаний',
           type: 'error',
           duration: 3000,
           speed: 500
         })
       }
     }
  },
}
</script>

<style lang="scss" scoped>
.singleton-co-registration-limits-app {
  padding: 0 rem(15) rem(136);
  max-width: 800px;
  margin: rem(10) auto;

  .registration-limits-app-view {
    border: 2px solid $grey-scale-300;
    border-radius: 20px;
    margin: rem(42) 0;

    .app-view-head {
      padding: rem(57) 0 rem(57) rem(40);
      position: relative;
      background: linear-gradient(165deg, rgba(33, 42, 51, 0.3) 55%, $blue 220%);

      .app-view-head-text {
        .text-head-title {
          width: 63.2%;
          color: #FFF;
          font-weight: 700;
          font-size: rem(34);
          line-height: rem(40);
        }

        .text-head-description {
          width: 58.3%;
          color: $gray-scale-100;
          font-weight: 400;
          font-size: rem(14);
          line-height: rem(20);
          letter-spacing: 0.02em;
          margin-top: rem(16);
        }
      }

      .app-view-head-logo {
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    .app-view-body {
      display: flex;
      padding: rem(42) rem(40) rem(41);
      background: linear-gradient(225deg, rgba(33, 42, 51, 0.3) 60%, rgba(rgb(234, 100, 90), 0.4) 100%);
      border-bottom-left-radius: rem(17);

      .app-view-body-left-part {
        display: inherit;
        flex-direction: column;
        width: 45.7%;
        margin-right: 21.5%;

        .left-part-title {
          color: #FFF;
          font-weight: 700;
          font-size: rem(22);
          line-height: rem(28);
        }

        .left-part-main {
          display: flex;
          width: 100%;
          margin: rem(24) 0;

          .left-part-main-left {
            display: inherit;
            flex-direction: column;
            align-items: center;
            margin-right: 27.1%;
          }

          .left-part-main-right {
            display: inherit;
            flex-direction: column;
            align-items: center;
          }
        }

        .left-part-description {
          font-weight: 400;
          font-size: rem(14);
          line-height: rem(20);
          letter-spacing: 0.02em;
          color: $gray-scale-100;
          width: 92%;
        }

        .left-part-button {
          margin-top: rem(12);
          width: 104.5%;
        }
      }

      .app-view-body-right-part {
        margin-top: rem(8);
        width: 34.2%;

        .right-part-line-companies {
          background: $grey-scale-400;
          height: rem(90);
          border-top-left-radius: rem(16);
          border-top-right-radius: rem(16);
          padding: rem(13) rem(16) rem(30);
        }

        .right-part-registered-users {
          background: $grey-scale-400;
          height: rem(90);
          padding: rem(16) rem(16) rem(26);
          margin-top: rem(1);
          border-bottom-left-radius: rem(16);
          border-bottom-right-radius: rem(16);
        }
      }
    }
  }
}

.main-left-right-title {
  color: #FFF;
  font-weight: 700;
  font-size: rem(22);
  line-height: rem(27);
  letter-spacing: 0.02em;
}

.main-left-right-description {
  font-weight: 400;
  font-size: rem(12);
  line-height: rem(20);
  text-align: center;
  letter-spacing: 0.02em;
  color: $gray-scale-100;
}

.icon {
  color: $blue;
}

.right-part-users-companies-main {
  display: flex;
  margin-bottom: rem(12);

  .users-companies-main-title {
    font-weight: 400;
    font-size: rem(14);
    line-height: rem(17);
    letter-spacing: 0.02em;
    color: $grey-scale-200;
    margin-left: rem(12);
  }
}

.right-part-users-companies-num {
  font-weight: 700;
  font-size: rem(22);
  line-height: rem(27);
  letter-spacing: 0.02em;
  color: #FFF;
  margin-left: rem(62);
}
</style>