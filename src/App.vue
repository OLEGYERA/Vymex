<template>
  <div id="app">
    <notifications position="top right" classes="vymex-notification"/>
    <router-view></router-view>
    <modal :status="getBlockModal" block :disable="code !== getPasscode" @onOk="unBlock()">
      <template #title>Сайт заблокирован, введите код-пароль</template>
      <template #description>
				<codepassword @onAction="code=$event" />
			</template>
      <template #button-accept>Применить</template>
    </modal>
  </div>
</template>

<script>
  import Modal from "@Facade/Modal/Base";
  import Codepassword from "@Facade/Input/Codepassword";
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'App',
    components: {Modal, Codepassword},
    created() {
      this.setBlockModal()
    },
    data() {
      return {
        code: ''
      }
    },
    methods: {
      ...mapMutations({
        setBlockModal: 'Users/setBlockModal',
        closeBlockModal: 'Users/setCloseBlockModal',
        setClearInterval: 'Users/setClearInterval'
      }),
      unBlock() {
        this.closeBlockModal()
        this.setBlockModal()
      },
    },
    computed: {
      ...mapGetters({
        getPasscode: 'Users/getPasscode',
        passcodeActive: 'Users/getPasscodeActive',
        getBlockModal: 'Users/getBlockModal'
      })
    },
    watch: {
      passcodeActive(val) {
        if (val) {
          this.setBlockModal(true)
        } else {
          this.setClearInterval()
        }
      }
    }
  }
</script>

<style lang="scss">
  html, body{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  html{
    font-size: 16px;
    background-color: $grey;
  }
  #app {
    width: 100%;
    height: 100%;
    font-family: Inter, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    .vue-notification-group{
      .vue-notification-wrapper{
        margin: 10px 30px 0 0;
        .vymex-notification{
          padding: 16px 16px 16px 32px;
          border-radius: 12px;
          font-weight: 500;
          line-height: 20px;
          cursor: pointer;
          &.error{
            color: $red;
            background: linear-gradient(90deg, rgba(255, 77, 79, 0.3) 0%, rgba(33, 42, 51, 0.3) 50.15%), #313D49;
          }
          &.success{
            padding: 16px;
            width: 335px;
            height: 56px;
            position: fixed;
            right: 20px;
            color: $green;
            background: linear-gradient(90deg, $green -70%, rgba(33, 42, 51, 0.3) 50.15%), #313D49;
          :before {
            content: url('./assets/img/icons/step-done.svg');
            margin-right: 12px;
            vertical-align: middle;
           }
          }
        }
        &:first-child{
          margin-top: 30px;
        }
      }

    }
  }
</style>
