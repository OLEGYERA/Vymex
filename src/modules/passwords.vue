<template>
  <div class="passwords-module">
    <input-password
      :input-model="firstPasswordField"
      placeholder="Пароль"
      tooltip
      @onPassword="handleFirstPasswordField"
    />
    <input-password
      placeholder="Повторите пароль"
      :input-model="secondPasswordField"
      :disable="!enableSecondPassword"
      :password-status="matchingPasswords"
      :password-text="matchingPasswords ? 'Пароли совпадают' : 'Пароли не совпадают'"
      @onPassword="handleSecondPasswordField"
    />
  </div>
</template>

<script>
  import InputPassword from "@/components/input/password";

  export default {
    name: 'passwords.module',
    components: {
      InputPassword
    },
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
  .passwords-module{
    width: 100%;
    .input-password{
      margin-top: 16px;
      &:first-child{
        margin-top: 0;
      }
    }
  }
</style>