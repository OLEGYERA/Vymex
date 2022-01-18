<template>
  <div class="code-view">
    <title-thin>Введите код</title-thin>
    <text-base>Мы отправили код на номер <br> {{ showUserPhoneNumber }}</text-base>
    <auth-code
      :status="approveCodeStatus"
      @onAction="sendApproveCodeData"/>
    <div class="label-box">
      <text-label v-if="resendCodeTime !== null">Отправить повторно через <countdown-timer :time="resendCodeTime" @onExpired="resendCodeTime = null"/></text-label>
      <text-label v-else><button-link @onClick="resendCode">Отправить повторно</button-link></text-label>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import TitleThin from "@Facade/Title/Thin";
  import TextBase from "@Facade/Text/Base";
  import AuthCode from "@Container/Auth/Code";
  import TextLabel from "@/LTE/Facades/Text/Label";
  import CountdownTimer from "@Facade/Time/CountdownTimer";
  import ButtonLink from "@Facade/Button/Link";

  export default {
    name: 'auth.code',
    components: {
      TitleThin,
      TextBase,
      AuthCode,
      TextLabel,
      CountdownTimer,
      ButtonLink
    },
    created() {
      this.prepareResendCodeTime()
    },
    data(){
      return {
        approveCodeStatus: true,
        resendCodeTime: null
      }
    },
    computed: {
      ...mapGetters({
        UT: 'getUT',
        chooseCountry: 'getChooseCountry',
        phoneLthNumber: 'getPhoneLthNumber',
        isEqualDash: 'getIsEqualDash',
      }),
      showUserPhoneNumber(){
        return `+${this.chooseCountry?.phoneIdent} ${this.phoneLthNumber.withMask} `
      }
    },
    methods: {
      prepareResendCodeTime(){
        let timeDiff = this.UT - (new Date().getTime() / 1000 - 60)
        if(timeDiff > 0){
          this.resendCodeTime = timeDiff
        } else {
          this.resendCodeTime = null;
        }
      },
      sendApproveCodeData(code){
        this.approveCodeStatus = false;
        this.$core.predictor
          .prepareEraManually('second', 'phase5', code)
          .runPredictedData()
      },
      resendCode(){
        this.$core.predictor
          .prepareEraManually('second', 'generateNewAuthData')
          .runPredictedData()
          .prepareComponentManually('auth', 'sendNewCode')
          .runPredictedData()
      }
    },
    watch: {
      UT(){
        this.prepareResendCodeTime()
      },
      isEqualDash(status){
        if(status === true){
          this.$core.predictor
            .prepareEraManually('second', 'phase6')
            .runPredictedData()        }
        else if(status === false) {
          this.$core.predictor
            .prepareComponentManually('auth', 'sendKeyError')
            .runPredictedData()
        } else {
          this.approveCodeStatus = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .code-view{
    width: 375px;
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