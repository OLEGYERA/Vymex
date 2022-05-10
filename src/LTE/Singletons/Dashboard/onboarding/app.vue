<template>
  <div class="dashboard-onboarding-app" v-if="isShowOnboarding">
    <div class="onboarding-app-header">
      <span>Помошник Vymex</span>
      <div @click="setIsShowOnboarding(false)">
        <icon-error class="app-header-close"/>
      </div>
    </div>
    <div class="onboarding-app-body">
      <div class="app-body-modules" :style="{
        borderBottomRightRadius: isContextStatus ? 0 : '',
        borderBottomLeftRadius: isContextStatus ? 0 : ''
      }">
        <div class="body-modules-main">
          <div class="main-avatar-background">
            <img :src="selectedModule.icon" class="avatar-background-icon">
          </div>
          <div class="body-modules-title">Модуль <span>{{ selectedModule.title }}</span></div>
        </div>
        <div class="modules-main-dropdown" @click="isContextStatus = !isContextStatus">
          <down-arrow v-if="!isContextStatus"/>
          <up-arrow class="modules-main-dropdown-up" v-else/>
        </div>
      </div>
        <modules-context :status="isContextStatus"
                         @change-status="isContextStatus = !isContextStatus"
                         @on-list="selectedModule = $event"/>
      <div class="app-body-squares">
        <div class="body-squares-square"
             v-for="(square, index) in arraySquares"
             :key="index"
             :style="{
               color: square.isActive ? '#FFF' : '',
               background: square.isActive ? '#313D49' : ''
             }"
             @click="changePage(index)">{{ index + 1 }}</div>
      </div>
      <span class="app-body-title">Как создать процесс</span>
      <div class="app-body-icon">
        <vymex-big-icon :sizeWidth="332" :sizeHeight="185"/>
        <faq-player class="app-body-icon-video" :size="12"/>
      </div>
      <span class="app-body-subtitle">Иерархия процессов</span>
      <span class="app-body-content">
        Ее нет, все равны. Поэтому встает вопрос взаимодействия. Хэндл процесса – когда новый процесс создается родительским, то родитель получает хэндл дочернего процесса и таким образом может им управлять.<br/>
<br/>
Этот хендл может передаваться другим процессам, в отличии от Unix, где родительский процесс не может менять множество дочерних процессов.<br/>
<br/>
Хэндл процесса – идентификатор объекта процесса.
      </span>
      <div class="app-body-island">
        При необходимости переключиться на другой процесс ОС выполняет «переключение контекста».
      </div>
      <span class="app-body-content">Время на переключение контекста – накладные расходы ОС (чем меньше время, тем быстрее работает).
Зависит от аппаратной реализации (т.е.от «железа компьютера», оптимизируется аппаратно). Чем вызваны переключения? События, вызывающие переключения контекста:</span>
      <button-base class="app-body-button"
                   @onClick="$emit('handle-access')">База знаний по модулю
      </button-base>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: "dashboard.onboarding.app",
  data: () => ({
    isContextStatus: false,
    selectedModule: {icon: require('@/assets/img/my/dashboard.svg'), title: 'Дашборд'},
    arraySquares: [{isActive: true}]
  }),
  components: {
    ModulesContext: () => import('./modules.context'),
    DownArrow: () => import('@Icon/DropdownArrow'),
    UpArrow: () => import('@Icon/UpArrow'),
    VymexBigIcon: () => import('@Icon/VymexBig'),
    FaqPlayer: () => import('@/app/faq/facades/faq.player'),
    ButtonBase: () => import('@Facade/Button/Base')
  },
  mounted() {
    for (let i = 0; i < 11; i++) {
      this.arraySquares.push({isActive: false})
    }
  },
  computed: {
    ...mapGetters({
      isShowOnboarding: 'getIsShowOnboarding'
    })
  },
  methods: {
    ...mapMutations({
      setIsShowOnboarding: 'setWidgetIsShowOnboarding'
    }),
    changePage(index) {
      this.arraySquares = this.arraySquares.map(el => ({...el, isActive: false}))
      this.arraySquares[index].isActive = true
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-onboarding-app {
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  background-color: rgba($grey-scale-700, .8);
  z-index: 3;

  .onboarding-app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: rem(332);
    height: rem(24);
    top: 0;
    right: 0;
    color: #FFF;
    padding: rem(20);
    font-weight: 600;
    font-size: rem(15);
    line-height: rem(20);
    background: $grey-scale-500;
    border-bottom: $grey-scale-700 solid 1px;
    z-index: 3;

    .app-header-close {
      color: $grey-scale-200;
      margin-right: rem(7);
    }
  }

  .onboarding-app-body {
    display: flex;
    flex-direction: column;
    width: rem(332);
    background: #181F26;
    top: rem(65);
    padding: rem(89) rem(20) rem(586);
    overflow-y: scroll;

    .app-body-modules {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: rem(42);
      background: $grey-scale-500;
      border-radius: rem(12);
      padding: rem(12);

      .body-modules-main {
        display: inherit;
        align-items: inherit;

        .main-avatar-background {
          width: rem(24);
          height: rem(24);
          background: $grey-scale-400;
          border-radius: rem(20);
          padding: rem(9);
          margin-right: rem(12);

          .avatar-background-icon {
            width: rem(24);
            height: rem(24);
          }
        }

        .body-modules-title {
          font-weight: 400;
          font-size: rem(15);
          line-height: rem(20);
          color: #FFF;
        }
      }

      .modules-main-dropdown {
        color: #FFF;


        .modules-main-dropdown-up {
          position: relative;
          top: 5px;
          right: -5px;
        }
      }
    }

    .app-body-squares {
      display: flex;
      align-items: center;
      width: 110%;
      overflow-x: scroll;
      flex-shrink: 0;

      .body-squares-square {
        display: inherit;
        align-items: center;
        justify-content: center;
        width: rem(44);
        height: rem(44);
        font-weight: 400;
        font-size: rem(15);
        line-height: rem(20);
        color: $grey-scale-200;
        background: $grey-scale-500;
        border-radius: rem(8);
        margin: rem(24) rem(2) 0;
        flex-shrink: 0;

      }
    }

    .app-body-title {
      font-weight: 600;
      font-size: rem(22);
      line-height: rem(28);
      text-align: center;
      color: #FFF;
      margin: rem(16) 0 rem(12);
    }

    .app-body-icon {
      position: relative;

      .app-body-icon-video {
        position: absolute;
        top: 66.5px;
        left: 129px;

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

    .app-body-subtitle {
      font-weight: 600;
      font-size: rem(17);
      line-height: rem(22);
      color: #FFF;
      margin: rem(24) 0 rem(16);
    }

    .app-body-content {
      font-weight: 400;
      font-size: rem(15);
      line-height: rem(20);
      color: $grey-scale-200;
    }

    .app-body-island {
      padding: rem(24) rem(16);
      margin: rem(24) 0;
      background: $grey-scale-500;
      border-radius: rem(12);
      font-weight: 600;
      font-size: rem(20);
      line-height: rem(24);
      color: #FFF;
    }

    .app-body-button {
      height: rem(44);
      margin: rem(24) 0;
      border-radius: rem(8);
      font-weight: 400;
      font-size: rem(15);
      line-height: rem(20);
      color: #FFF;
    }
  }
}

</style>