<template>
  <div class="resource-create-intangible-resource-view">
    <comeback @onClick="onExit"/>
    <title-base>Создать ресурс</title-base>
    <div class="resource-main-plate">
      <input-base :model="newResource.name" labeled :placeholder="'Название'" @onInput="setCreatorIntangible(['name', $event])"/>
      <input-base :model="newResource.url" labeled :placeholder="'URL'" @onInput="setCreatorIntangible(['url', $event])"/>
      <input-base :model="newResource.login" labeled :placeholder="'Логин'" @onInput="setCreatorIntangible(['login', $event])"/>
      <input-password :model="newResource.password" labeled :placeholder="'Пароль'" @onPassword="setCreatorIntangible(['password', $event])"/>
      <text-area :model="newResource.description" labeled :placeholder="'Описание (не обязательно)'" :max-length="1000" @onInput="setCreatorIntangible(['description', $event])" />
    </div>
    <div class="create-resource-buttons">
      <button-secondary class="create-resource-button" @onClick="onExit">Отмена</button-secondary>
      <button-base class="create-resource-button" :disable="buttonDisable" @onClick="addResource">
        Создать ресурс
      </button-base>
    </div>
  </div>
</template>

<script>
  import Comeback from "@Facade/Navigation/Comeback";
  import TitleBase from "@Facade/Title/Base";
  import InputBase from "@Facade/Input/Base"
  import TextArea from "@Facade/Input/TextArea"
  import ButtonSecondary from "@Facade/Button/Secondary"
  import ButtonBase from "@Facade/Button/Base"
  import InputPassword from "@Facade/Input/Password"
  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'vx.resource.intangible.create',
    components: {
      Comeback,
      TitleBase,
      InputBase,
      TextArea,
      ButtonSecondary,
      ButtonBase,
      InputPassword
    },
    data() {
      return{
      }
    },
    computed:{
      ...mapGetters({
        newResource: 'Resources/getCreatorIntangibleResource',

        structure: 'Resources/getStructure',
      }),
      buttonDisable(){
        if(!this.newResource.name || !this.newResource.url || !this.newResource.login || !this.newResource.password){
          return true
        }
        return false
      }
    },
    methods: {
      ...mapMutations({
        setCreatorIntangible: 'Resources/setCreatorIntangibleResource',
        clearIntangible: 'Resources/clearIntangible',
      }),
      addResource(){
        this.$core.execViaComponent('Resources', 'createIntangible', this.structure.self[0].id)
        this.$router.push({name: 'vx.resource.intangible.resources'})
      },
      onExit(){
        this.$router.back()
      }
    },
    destroyed() {
      this.clearIntangible()
    }
  }
</script>

<style lang="scss" scoped>
  .resource-create-intangible-resource-view {
    width: 100%;
    .facade-title-base {
      text-align: center;
      margin-bottom: rem(36);
    }
    .resource-main-plate {
      width: 100%;
      margin-bottom: rem(36);
      padding: 48px 164px 52px;
      box-sizing: border-box;
      background-color: $grey-scale-500;
      border-radius: 16px;
      .facade-input-base {
        border-width: 1px;
        margin-bottom: rem(16);
      }
      .facade-input-password::v-deep{
        margin-bottom: rem(16);
        .facade-input-base{
          border-width: 1px;
        }
      }
      .facade-input-text-area::v-deep {

        .textarea-container{
          min-height: 106px;
          border-bottom-width: 1px;
        }
      }
    }
    .create-resource-buttons {
      display: flex;
      justify-content: space-between;
      .create-resource-button {
        width: 222px;
      }
      .facade-button-base::v-deep {
        font-size: 15px;
        &[disable] {
          background-color: $grey-scale-400;
        }
      }
    }
  }
</style>