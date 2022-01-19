<template>
  <div class="login-view">
    <title-thin>Войти в Vymex</title-thin>
    <text-base>Введите свой номер мобильного телефона, чтобы войти в систему.</text-base>
    <auth-phone
      :status="!isClientBlocking"
      @onStatus="isStatusCompleted = $event"/>
    <button-base :disable="!isStatusCompleted || isClientBlocking" @onClick="sendLoginData">Получить код</button-base>
    <div class="label-box">
      <text-label v-if="isClientBlocking">Устройство заблокировано. Повторите <br>попытку через <countdown-timer :time="clientBlocking" @onExpired="clientBlockExpired"/></text-label>
    </div>
  </div>
</template>

<script>
  /*eslint-disable*/
  import TitleThin from "@Facade/Title/Thin"
  import TextBase from "@Facade/Text/Base"
  import AuthPhone from "@Container/Auth/Phone"
  import CountdownTimer from "@Facade/Time/CountdownTimer";
  import TextLabel from "@Facade/Text/Label"
  import ButtonBase from "@Facade/Button/Base"
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'auth.login',
    components: {
      TitleThin,
      TextBase,
      TextLabel,
      AuthPhone,
      ButtonBase,
      CountdownTimer
    },
    data(){
      return {
        isStatusCompleted: null,
        isAfterBlocked: false
      }
    },
    mounted() {
      // this.$core.log.info('lorem  this.$core.log.variable(this.clientBlocking  this.$core.log.variable(this.clientBlocking')
      this.$core.log.variable(this.isClientBlocking, 'isClientBlocking', true)
      if(this.clientBlocking === 0) this.clientBlockExpired()
    },
    computed: {
      ...mapGetters({clientBlocking: 'getClientBlocking'}),
      isClientBlocking(){
        return !(this.clientBlocking === null);
      }
    },
    methods: {
      ...mapMutations(['setClientBlocking']),
      clientBlockExpired(){
        this.$core.log.info('The client block has been removed!')
        this.setClientBlocking(null);
        this.isAfterBlocked = true;
      },
      sendLoginData(){
        if(!this.isAfterBlocked)
          this.$core.predictor.manualProcess('Auth', 'sendPhoneData')

        else {
          this.isAfterBlocked = false;
          this.$core.predictor.manualProcess('Auth', 'sendNewCode')

        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .login-view{
    width: 400px;
    .facade-title-thin{
      margin-top: 0;
    }
    .facade-text-base{
      margin-bottom: rem(40);
    }
    .label-box{
      margin-top: 50px;
      height: 20px;
      .facade-text-label{
        display: flex;
        .facade-time-countdown-timer{
          padding-left: 5px;
        }
      }
    }

  }
</style>