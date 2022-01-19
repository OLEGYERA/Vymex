<template>
  <div class="password-view">
    <title-thin>Войти в Vymex</title-thin>
    <text-base>Для входа в приложение введите ваш пароль</text-base>
    <input-password
      :model="password"
      placeholder="Пароль"
      labeled
      tooltip
      ref="password"
      @onPassword="handlePassword"
    /><button-base
      :disable="!passwordIsValid" @onClick="login">
      Войти в аккаунт
    </button-base>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import TitleThin from '@Facade/Title/Thin'
  import TextBase from '@Facade/Text/Base'
  import InputPassword from '@Facade/Input/Password'
  import ButtonBase from "@Facade/Button/Base";

  export default {
    name: 'auth.password',
    components: {
      TitleThin,
      TextBase,
      InputPassword,
      ButtonBase
    },
    data(){
      return  {
        passwordIsValid: false,
        password: null
      }
    },
    computed: {
      ...mapGetters({
        getPassword: 'getUserPassword'
      }),
    },
    methods: {
      handlePassword(password){
        if(password !== false){
          this.passwordIsValid = true
          this.password = password
        } else {
          this.passwordIsValid = false
        }
      },
      login(){
        this.$core.predictor.ManualProcess('setting', 'cloudPassword', this.password);
      }
    },
    watch:{
      getPassword(_newPassword){
        if(_newPassword === null){
          this.password = '';
          this.$refs['password']
              .$refs['facade-input-password-ref']
              .$refs['facade-input-base-ref'].focus();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .password-view{
    width: 375px;
    .facade-input-password{
      margin-top: 16px;
    }
    .facade-button-base{
      margin-top: 32px;
    }
  }
</style>