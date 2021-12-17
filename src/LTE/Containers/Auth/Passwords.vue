<template>
  <div class="container-auth-passwords">
    <input-password
      :model="firstPasswordField"
      placeholder="Пароль"
      labeled
      ref="input-first-password"
      tooltip
      @onKeyEnter="$refs['input-second-password'].
                   $refs['facade-input-password-ref'].
                   $refs['facade-input-base-ref'].focus()"
      @onKeyTab="$refs['input-second-password'].
                   $refs['facade-input-password-ref'].
                   $refs['facade-input-base-ref'].focus()"
      @onPassword="handleFirstPasswordField"
    />
    <input-password
      :model="secondPasswordField"
      placeholder="Повторите пароль"
      labeled
      ref="input-second-password"
      :disable="!enableSecondPassword"
      :password-status="matchingPasswords"
      :password-text="matchingPasswords ? 'Пароли совпадают' : 'Пароли не совпадают'"
      @onPassword="handleSecondPasswordField"
    />
  </div>
</template>

<script>
  import InputPassword from "@Facade/Input/Password";

  export default {
    name: 'Container.Auth.Passwords',
    components: {InputPassword},
    data() {
      return {
        firstPasswordField: null,
        secondPasswordField: null,
        enableSecondPassword: false,
      }
    },
    computed: {
      matchingPasswords(){
        return this.firstPasswordField === this.secondPasswordField && this.enableSecondPassword
      }
    },
    methods: {
      handleFirstPasswordField(password){
        if(password !== false){
          this.enableSecondPassword = true
          this.firstPasswordField = password;
        }
        else if(this.enableSecondPassword) {
          this.enableSecondPassword = false;
          this.secondPasswordField = '';
        }
      },
      handleSecondPasswordField(password){
        this.secondPasswordField = password;
      }
    },
    watch: {
      matchingPasswords(to){
        this.$emit('onAction', to ? this.firstPasswordField : false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container-auth-passwords{
    width: 100%;
    .facade-input-password{
      margin-top: 20px;
    }
  }
</style>