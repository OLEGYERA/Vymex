<template>
  <div class="facade-input-password" :class="{error: errorAfterBlur, success: tooltipSuccess, disable: disable}">
    <input-base
      :model="model"
      :placeholder="placeholder"
      :type="showPasswordStatus ? 'text' : 'password'"
      :disable="disable"
      :labeled="labeled"
      ref="facade-input-password-ref"
      @onBlur="handleBlur"
      @onInput="handleInputPassword"
      @onKeyEnter="$emit('onKeyEnter')"
      @onKeyTab="$emit('onKeyTab')"
    /><icon-eye
      @mousedown.native.prevent="showPassword" v-if="!showPasswordStatus"
    />
    <div class="password-tooltip" v-if="tooltip">
      <ul class="tooltip-list">
        <li class="tooltip-item" :class="{success: tooltipList.length}">8-32 символа — длина пароля</li>
        <li class="tooltip-item" :class="{success: tooltipList.register}">Буквы в верхнем и нижнем регистре</li>
        <li class="tooltip-item" :class="{success: tooltipList.special}">спец. символы</li>
      </ul>
    </div>

    <div class="password-alert" v-if="!tooltip && (errorAfterBlur || tooltipSuccess)">
      {{passwordText}}
    </div>
  </div>
</template>

<script>
  import InputBase from '@Facade/Input/Base'
  import IconEye from "@Icon/Eye";

  export default {
    name: 'Facade.Input.Password',
    components: {
      InputBase,
      IconEye,
    },
    props: {
      model: {},
      placeholder: {},
      disable: {},
      labeled: {},
      tooltip: Boolean,
      passwordStatus: Boolean,
      passwordText: String,
    },
    data() {
      return {
        errorAfterBlur: false,
        tooltipList: {
          length: null,
          register: null,
          special: null,
        },
        showPasswordStatus: false,
      }
    },
    methods: {
      handleBlur(){
        this.showPasswordStatus = false;
        if(!this.errorAfterBlur && !this.tooltipSuccess) this.errorAfterBlur = true
      },
      handleInputPassword(password){
        if(!this.tooltip){
          if(password === undefined) return;
          this.$emit('onPassword', password);
          if(this.tooltipSuccess || password.length === 0) this.errorAfterBlur = false;
          return;
        }

        this.tooltipList.length = password.length >= 8 && password.length <= 32 ? true : null

        const passwordArr = String(password).split('')
        let lr = false, ur = false, sr = null //low and upper register || special register
        let regex = new RegExp("^[a-zA-Z0-9]+$");

        passwordArr.forEach(letter => {
          if(isNaN(parseInt(letter))) {
            if(regex.test(letter)){
              if(!lr && letter === letter.toUpperCase()) lr = true
              if(!ur && letter === letter.toLowerCase()) ur = true
            } else if(sr == null) sr = true
          }
        })
        this.tooltipList.register = lr && ur ? true : null
        this.tooltipList.special = sr

        if(this.tooltipSuccess || password.length === 0) this.errorAfterBlur = false;
        this.$emit('onPassword', this.tooltipSuccess ? password : false)
      },
      showPassword(){
        if(!this.disable){
          this.showPasswordStatus = true;
          setTimeout(() => this.$refs['facade-input-password-ref'].$refs['facade-input-base-ref'].focus(), 100);
        }
      }
    },
    computed: {
      tooltipSuccess(){
        if(this.tooltip)
          return this.tooltipList.length && this.tooltipList.register && this.tooltipList.special;
        else {
          return this.passwordStatus
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .facade-input-password{
    display: flex;
    position: relative;
    flex-direction: column;
    .icon-eye{
      position: absolute;
      right: 7px;
      top: 20px;
      color: $grey-scale-200;
      cursor: pointer;
    }

    .password-tooltip{
      margin-top: 16px;
      text-align: left;
      font-size: 16px;
      line-height: 26px;
      font-weight: 400;
      .tooltip-list{
        margin: 0;
        padding-left: 20px;
        .tooltip-item{
          color: $grey-scale-200;
          &.success{
            color: $green;
          }
        }
      }
    }

    .password-alert{
      margin-top: 8px;
      text-align: left;
      font-size: 16px;
      line-height: 20px;
      height: 20px;
    }

    &.error{
      .facade-input-base{
        border-color: $red;
      }
      .tooltip-list{
        .tooltip-item{
          color: $red;
        }
      }
      .password-alert{
        color: $red;
      }
    }
    &.success{
      .facade-input-base{
        border-color: $green;
      }
      .password-alert{
        color: $green;
      }
    }

    &.disable{
      .icon-eye{
        cursor: not-allowed;
      }
    }


    //&.success{
    //  .input-base{
    //    border-color: $green;
    //  }
    //  .validation-alert{
    //    color: $green;
    //  }
    //}
    //&.error{
    //  .input-base{
    //    border-color: $red;
    //  }
    //  .validation-alert{
    //    color: $red;
    //  }
    //}
  }
</style>