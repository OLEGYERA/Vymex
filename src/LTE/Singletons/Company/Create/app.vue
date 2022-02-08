<template>
  <div class="singleton-co-create-app">
    <navigation-close @onClick="closeCreatorCompany()"/>
    <title-base>Создать компанию</title-base>
    <stepper :step="stage + 1" :info="router.info[stage]"/>
    <transition :name="transitionName" mode="out-in">
      <keep-alive>
        <component :is="renderRouterName" class="coCreateViewComponent"
                   @onNext="updateRouter(true)" @onPrev="updateRouter(false)"/>
      </keep-alive>
    </transition>
  </div>
</template>


<script>
  import NavigationClose from '@Facade/Navigation/Close'
  import TitleBase from '@Facade/Title/Base'
  import Stepper from './facades/Stepper'

  import ActivitiesRouter from './views/Activities.router'
  import NameRouter from './views/Name.router'
  import FinishRouter from './views/Finish.router'

  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'vx.co.create.view',
    components: {
      NavigationClose,
      TitleBase,
      Stepper,

      ActivitiesRouter, NameRouter, FinishRouter
    },
    data(){
      return {
        router: {
          list: ['activities', 'name', 'finish'],
          info: [
            {title: 'Укажите сферу деятельности', description: 'Выберите до 3-х видов деятельности'},
            {title: 'Название вашей компании', description: 'Введите имя компании, по которому другие люди смогут <br/> быстро вас найти.'},
            {title: 'Как вас найти?', description: 'Помогите вашим клиентам быстрее вас найти, добавив <br/> контакты, логотип и короткое описание'},
          ]
        },
        transitionName: 'router-left',
      }
    },
    computed: {
      ...mapGetters({
        stage: 'Company/getCreatorStage'
      }),
      renderRouterName(){
        return this.router.list[this.stage] + '-router';
      },
    },
    methods: {
      ...mapMutations({
        clearCreator: 'Company/clear',
        updateStage: 'Company/setCreatorStage'
      }),
      updateRouter(isNext){
        if(isNext){
          this.transitionName = 'router-left'
          this.updateStage(this.stage + 1);
        } else {
          this.transitionName = 'router-right'
          this.updateStage(this.stage - 1);
        }
      },
      closeCreatorCompany(){
        this.clearCreator();
        this.$root.returnOverlapRoute();
      }
    },

  }
</script>

<style lang="scss" scoped>
  .singleton-co-create-app{
    position: relative;
    .facade-title-base{
      margin: 28px 0 36px;
      text-align: center;
    }
    .coCreateViewComponent{
      &.router-right{
        &-enter-active{
          transform: translateX(-30%);
          opacity: 0;
          transition: all 80ms ease;
        }
        &-enter-to{
          transform: translateX(0);
          opacity: 1;
        }
        &-leave-active {
          transform: translateX(0);
          opacity: 1;
          transition: all 80ms ease;
        }
        &-leave-to {
          transform: translateX(30%);
          opacity: 0;
        }
      }
      &.router-left{
        &-enter-active{
          transform: translateX(30%);
          opacity: 0;
          transition: all 80ms ease;
        }
        &-enter-to{
          transform: translateX(0);
          opacity: 1;
        }
        &-leave-active {
          transform: translateX(0);
          opacity: 1;
          transition: all 80ms ease;
        }
        &-leave-to {
          transform: translateX(-30%);
          opacity: 0;
        }
      }
    }
  }
</style>