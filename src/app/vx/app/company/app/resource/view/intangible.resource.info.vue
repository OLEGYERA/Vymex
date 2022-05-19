\<template>
  <div class="resource-intangible-info-view">
    <comeback @onClick="exit"/>
    <div class="info-header-group">

      <title-base>{{resource.name}}</title-base>
      <icon-points-vertical @click.native="actionListStatus = !actionListStatus" ref="list"/>

      <modal-action-list
          :status="actionListStatus"
          :actions="actions"
          @onList="performAction"
          @onClose="actionListStatus=false"
          @onDelete="modalStatus = true"
      />

      <modal-base :status="modalStatus" @onClose="modalStatus=false" @onOk="deleteResource">
        <template #title>Удалить ресурс?</template>
        <template #description>Это действие необратимо</template>
        <template #content>
          <title-caps class="modal-subtitle">Ресурс</title-caps>
          <intangible-object-ui :object="resource"/>
        </template>
        <template #button-accept>Удалить</template>
      </modal-base>
    </div>

    <title-caption class="resource-url">{{resource.url}}</title-caption>
    <text-base>{{resource.description}}</text-base>

    <div class="resource-password-plate">
      <div class="resource-password">
        <div v-if="showPassword" class="password-open">{{resource.password}}</div>
        <div v-else class="password-hidden" v-for="(letter, key) in resource.password" :letter="letter" :key="key"></div>
      </div>
      <title-sub @click.native="showPassword = !showPassword">Показать пароль</title-sub>
    </div>

    <div class="buttons-group">
      <button-secondary @onClick="$notify({text: 'Данные скопированы', type: 'success', duration: 3000, speed: 500})">Скопировать в буфер</button-secondary>
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
  import ModalActionList from "@Facade/Modal/ActionList";
  import ButtonBase from "@Facade/Button/Base"
  import ButtonSecondary from "@Facade/Button/Secondary"
  import ModalBase from "@Facade/Modal/Base"
  import {IntangibleObjectUi} from "@Providers"
  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'vx.resource.intangible.info',
    components: {
      Comeback,
      TitleBase,
      TitleCaption,
      TextBase,
      TitleSub,
      TitleCaps,
      ModalActionList,
      ButtonBase,
      ButtonSecondary,
      ModalBase,
      IntangibleObjectUi
    },
    data() {
      return{
        actionListStatus: false,
        modalStatus: false,
        actions: ['Редактировать'],
        showPassword: false,
      }
    },
    computed: {
      ...mapGetters({
        resource: 'Resources/getChosenIntangibleResource',
      }),
    },
    methods: {
      ...mapMutations({
        clearChosenIntangibleResource: 'Resources/clearChosenIntangibleResource',
      }),
      performAction() {
        this.$router.push({name: 'vx.resource.intangible.resource.editing'});
      },
      deleteResource(){
        this.$core.execViaComponent('Resources', 'deleteIntangible', this.resource.id)
        this.$router.push({name: 'vx.resource.intangible.resources'})
        this.$notify({text: 'Данные удалены', type: 'success', duration: 3000, speed: 500})
      },
      exit() {
        this.$router.back()
        this.clearChosenIntangibleResource()
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
      .facade-modal-action-list::v-deep {
        right: 10px;
        .action-list-body{
          transform: translateX(-100%);
          top: 2px;
        }
      }
    }
    .facade-modal-base::v-deep {
      .modal-base-body {
        height: max-content;
        .modal-subtitle {
          padding: rem(8) 0;
          margin-bottom: rem(4);
        }
        .icon-points-vertical{
          display: none;
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
      .resource-password{
        display: flex;
        justify-content: center;
        margin-bottom: rem(12);
        .password-open{
          line-height: 12px;
          font-weight: bold;
          letter-spacing: 0.05rem;
          color: #fff;
        }
        .password-hidden{
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