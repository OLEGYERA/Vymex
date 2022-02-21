<template>
  <div class="resource-intangible-info-view">
    <comeback @onClick="$router.push({name: 'vx.resource.intangible.resources'})"/>
    <div class="info-header-group">
      <title-base>{{object.name}}</title-base>
      <icon-points-vertical @click.native="actionListStatus = !actionListStatus" ref="list"/>
      <action-list :actionListStatus="actionListStatus" :items="items" @onClick="performAction"/>
      <modal-base :status="modalStatus" @onClose="modalStatus=false" @onOk="$router.push({name: 'vx.resource.intangible.resources'})">
        <template #title>Удалить ресурс?</template>
        <template #description>Это действие необратимо</template>
        <template #content>
          <title-caps class="modal-subtitle">Ресурс</title-caps>
          <intangible-object :object="object"/>
        </template>
        <template #button-accept>Удалить</template>
      </modal-base>
    </div>
    <title-caption class="resource-url">{{object.url}}</title-caption>
    <text-base>{{object.description}}</text-base>
    <div class="resource-password-plate">
      <div class="hidden-password">
        <div class="password-unit" v-for="(letter, key) in object.password" :letter="letter" :key="key"></div>
      </div>
      <title-sub>Показать пароль</title-sub>
    </div>
    <div class="buttons-group">
      <button-secondary>Скопировать в буфер</button-secondary>
      <button-base>Перейти на ресурс</button-base>
    </div>
  </div>
</template>

<script>
  import Comeback from "@Facade/Navigation/Comeback";
  import TitleBase from "@Facade/Title/Base"
  import TitleCaption from "@Facade/Title/Caption"
  import TextBase from "@Facade/Text/Base"
  import TitleSub from "@Facade/Title/Sub"
  import TitleCaps from "@Facade/Title/Caps"
  import IconPointsVertical from "@Icon/PointsVertical"
  import ActionList from "@Facade/Modal/ActionList";
  import ButtonBase from "@Facade/Button/Base"
  import ButtonSecondary from "@Facade/Button/Secondary"
  import ModalBase from "@Facade/Modal/Base"
  import IntangibleObject from "@/LTE/Singletons/Resources/facades/IntangibleObject";

  export default {
    name: 'vx.resource.intangible.info',
    components: {
      Comeback,
      TitleBase,
      TitleCaption,
      TextBase,
      TitleSub,
      TitleCaps,
      ActionList,
      IconPointsVertical,
      ButtonBase,
      ButtonSecondary,
      ModalBase,
      IntangibleObject
    },
    data() {
      return{
        actionListStatus: false,
        modalStatus: false,
        object: null,
        items: ['Редактировать', 'Удалить'],
        resources: [
          {
            id: 1,
            name: 'facebook account',
            url: 'facebook.com/29kadgdbsi9a_21g3_1%_ab',
            login: 'jerronvymex@vymex.com',
            password: 'Abra_Kadabra',
            description: 'Тестовый аккаунт для рекламных сайтов, что бы мы лучше понимали рынок земли и продажи алюминия, радости вам и хорошего настроения',
          }
        ]
      }
    },
    created() {
      this.object = this.resources.find(el => el.id === this.$route.params.id)
    },
    mounted() {
      this.object = this.resources[0]
    },
    methods: {
      performAction({key}) {
        console.log(key)
        console.log(this.$route.params.id)
        switch (key) {
          case 0: this.$router.push({name: 'vx.resource.intangible.resource.editing', params: {resourceId: this.$route.params.id}});
            break;
          case 1: this.modalStatus = true

        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .resource-intangible-info-view {
    width: 100%;
    .info-header-group {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: rem(8);
      .icon-points-vertical{
        color: #fff;
        padding: 0 rem(10);
        height: 16px;
        cursor: pointer;
      }
      .facade-modal-action-list{
        top: 24px;
        right: 4px;
      }
    }
    .facade-modal-base::v-deep {
      .modal-base-body {
        height: max-content;
        .modal-subtitle {
          padding: rem(8) 0;
          margin-bottom: rem(4);
        }
      }

    }
    .resource-url{
      color: $blue;
      margin-bottom: rem(24);
    }
    .facade-text-base {
      margin-bottom: rem(24);
      color: #fff;
    }
    .resource-password-plate{
      padding: rem(20) 0;
      margin-bottom: rem(48);
      text-align: center;
      border-radius: 12px;
      background-color: $grey-scale-400;
      .hidden-password{
        display: flex;
        justify-content: center;
        margin-bottom: rem(12);
        .password-unit{
          background-color: #fff;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          &:not(:last-child){
            margin-right: rem(4);
          }
        }
      }
      .facade-title-sub{
        color: $blue;
        cursor: pointer;
      }
    }
    .buttons-group{
      display: flex;
      .facade-button-secondary{
        width: max-content;
        margin-right: rem(24);
      }
      .facade-button-base{
        width: max-content;
        padding: rem(16) rem(40);
        font-size: 15px;
      }
    }
  }
</style>