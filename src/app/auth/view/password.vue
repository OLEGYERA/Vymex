<template>
  <div class="password-view">
    <text-heading-title>Войти в аккаунт</text-heading-title>
    <text-heading-description>Для входа в приложение введите ваш пароль</text-heading-description>
    <input-password placeholder="Пароль" @onPassword="handlePassword" tooltip/>
    <button-base

    >
      Войти в аккаунт
    </button-base>
  </div>

</template>

<script>
  import InputPassword from '@/components/input/password'
  import TextHeadingTitle from "@/components/text/heading-title";
  import TextHeadingDescription from "@/components/text/heading-description";
  import ButtonBase from "@/components/button/base";

  export default {
    name: 'auth.password',
    components: {
      TextHeadingTitle,
      TextHeadingDescription,
      InputPassword,
      ButtonBase
    },
    data(){
      
    },
    methods: {
      handlePassword(password){
        if(password !== false){
          
        }
        console.log(password)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .password-view{
    width: 375px;
    .input-password{
      margin-top: 16px;
    }
    .button-base{
      margin-top: 32px;
    }
  }
</style>