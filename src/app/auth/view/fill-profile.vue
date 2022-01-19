<template>
  <div class="fill-profile-view">
    <title-thin>Последний шаг</title-thin>
    <text-base>Все поля обязательны для заполнения</text-base>
    <input-base
      :model="name"
      placeholder="Имя"
      labeled
      @onInput="setName($event)"
      @onKeyEnter="focusOn($refs['lastname'])"
      @onKeyTab="focusOn($refs['lastname'])"
      disable-debounce
    /><input-base
      :model="lastname"
      placeholder="Фамилия"
      labeled
      ref="lastname"
      @onInput="setLastname($event)"
      @onKeyTab="focusOn($refs['alias'].$refs['facade-input-alias-ref'].$refs['facade-input-validation-ref'])"
      @onKeyEnter="focusOn($refs['alias'].$refs['facade-input-alias-ref'].$refs['facade-input-validation-ref'])"
      disable-debounce
    /><input-alias
      :model="alias"
      placeholder="Никнейм"
      labeled
      ref="alias"
      :validation-status="aliasError === null"
      :validation-text="aliasError || 'Имя свободно'"
      @onKeyEnter="focusOn($refs['auth-passwords'].$refs['input-first-password'].$refs['facade-input-password-ref'])"
      @onKeyTab="focusOn($refs['auth-passwords'].$refs['input-first-password'].$refs['facade-input-password-ref'])"
      @onAlias="verifyAlias"
    /><auth-passwords
      ref="auth-passwords"
      @onAction="setPassword($event ? $event : null)"
    />

    <div class="agreements-block">
      <text-base>
        Продолжая, я соглашаюсь с <a href="#">политикой конфиденциальности</a> и <a href="#">пользовательским соглашением</a>
      </text-base>
    </div>

    <button-base :disable="!fillProfileCanSubmit" @onClick="createAccount">
      Создать аккаунт
    </button-base>
  </div>
</template>

<script>
  /*eslint-disable*/
  import TitleThin from "@Facade/Title/Thin"
  import TextBase from "@Facade/Text/Base"
  import InputBase from "@Facade/Input/Base";
  import InputAlias from "@Facade/Input/Alias";
  import AuthPasswords from "@Container/Auth/Passwords"
  import ButtonBase from "@Facade/Button/Base"

  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'auth.fill.profile',
    components: {
      TitleThin,
      TextBase,
      InputBase,
      InputAlias,
      AuthPasswords,
      ButtonBase
    },
    created() {
      if(this.isRegistered){
        this.$router.push('vhome')
      } else {
        this.setPassword(null);
      }
    },
    data() {
      return {
        lastnameToggle: false,
        aliasToggle: false
      }
    },
    computed: {
      ...mapGetters({
        isRegistered: 'getUserIsJumpReg',
        name: 'getUserName',
        lastname: 'getUserLastname',
        alias: 'getUserAlias',
        aliasError: 'getUserAliasError',
        password: 'getUserPassword'
      }),
      fillProfileCanSubmit(){
        return this.name && this.lastname && this.aliasError == null && this.password !== null
      }
    },
    methods: {
      ...mapMutations({
        setName: 'setUserName',
        setLastname: 'setUserLastname',
        setPassword: 'setUserPassword',
      }),
      focusOn(referral){
        setTimeout(() => referral.$refs['facade-input-base-ref'].focus(), 100)
      },
      verifyAlias(alias){
        this.$core.log.variable(this.aliasError, 'aliasError', true)
        this.$core.predictor.ManualProcess('setting', 'checkAlias', alias);
      },
      createAccount(){
        this.$core.predictor.ManualProcess('setting', 'fillProfile');
      }
    },
  }
</script>

<style lang="scss" scoped>
  .fill-profile-view{
    width: 375px;
    .facade-input-base,
    .facade-input-validation,
    .container-auth-passwords{
      margin-top: 20px;
    }

    .agreements-block{
      margin-top: 20px;
      a{
        color: $blue;
        text-decoration: none;
      }
    }

    .facade-button-base{
      margin-top: 50px;
    }
  }
</style>