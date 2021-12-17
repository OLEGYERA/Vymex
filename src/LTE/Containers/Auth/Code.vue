<template>
  <div class="container-auth-code" @paste.prevent="handleClipboardData">
    <input-base
      :model="code.val1"
      @onInput="enterNumber(1, $event)"
      @onKeyDelete="deleteNumber(1)"
      mask="#"
      ref="code.val1"
      position="center"
      :disable="code.val2 !== null || status === false"
      disable-debounce
    /><input-base
      :model="code.val2"
      @onInput="enterNumber(2, $event)"
      @onKeyDelete="deleteNumber(2)"
      mask="#"
      ref="code.val2"
      position="center"
      :disable="code.val1 === null || code.val3 !== null || status === false"
      disable-debounce
    /><input-base
      :model="code.val3"
      @onInput="enterNumber(3, $event)"
      @onKeyDelete="deleteNumber(3)"
      ref="code.val3"
      mask="#"
      position="center"
      :disable="code.val2 === null || code.val4 !== null || status === false"
      disable-debounce
    /><input-base
      :model="code.val4"
      @onInput="enterNumber(4, $event)"
      @onKeyDelete="deleteNumber(4)"
      ref="code.val4"
      mask="#"
      position="center"
      :disable="code.val3 === null || code.val5 !== null || status === false"
      disable-debounce
    /><input-base
      :model="code.val5"
      @onInput="enterNumber(5, $event)"
      @onKeyDelete="deleteNumber(5)"
      ref="code.val5"
      mask="#"
      position="center"
      :disable="code.val4 === null || code.val6 !== null || status === false"
      disable-debounce
    /><input-base
      :model="code.val6"
      @onInput="enterNumber(6, $event)"
      @onKeyDelete="deleteNumber(6)"
      ref="code.val6"
      mask="#"
      position="center"
      :disable="code.val5 === null || status === false"
      disable-debounce
    />
  </div>
</template>

<script>
  import InputBase from "@/LTE/Facades/Input/Base";

  export default {
    name: 'Container.Auth.Code',
    props: {
      status: {
        type: Boolean,
        required: true
      }
    },
    components: {InputBase},
    data(){
      return {
        code: {
          val1: null,
          val2: null,
          val3: null,
          val4: null,
          val5: null,
          val6: null,
        }
      }
    },
    methods: {
      handleClipboardData(event){
        let clipped = event.clipboardData.getData('text');
        if(clipped.length === 6){
          let clippedIndex = 0;
          while(clippedIndex < 6){
            if(!isNaN(Number(clipped[clippedIndex]))) {
              this.code[`val${clippedIndex + 1}`] = clipped[clippedIndex++];
            } else {
              this.clearCode();
              break;
            }
          }
        }
      },
      referralFocus(refID) {
        if (this.status)
          setTimeout(() => {
            if(this.status) this.$refs[`code.val${refID}`].$refs['facade-input-base-ref'].focus()
          }, 0);
      },
      referralBlur(refID){
        if(this.status)
          setTimeout(() => {
            if(this.status) this.$refs[`code.val${refID}`].$refs['facade-input-base-ref'].blur()
          }, 0);
      },
      enterNumber(stage, data){
        if(data){
          this.code[`val${stage}`] = data
          if(stage !== 6){
            this.referralFocus(stage + 1)
          } else {
            this.referralBlur(6)
            this.$emit('onAction', this.getCode())
          }
        } else {
          this.code[`val${stage}`] = null
        }
      },
      deleteNumber(stage){
        if(stage !== 1 && !this.code[`val${stage}`]){
          this.code[`val${stage - 1}`] = null;
          this.referralFocus(stage - 1);
        }
      },
      getCode(){
        let codeStage = 1, fullCode = '';
        while (codeStage <= 6){
          fullCode += this.code[`val${codeStage++}`]
        }
        return fullCode;
      },
      clearCode(){
        this.code = {
          val1: null,
          val2: null,
          val3: null,
          val4: null,
          val5: null,
          val6: null,
        }
      }
    },
    watch: {
      status(to){
        if(to){
          this.clearCode()
          this.referralFocus(1)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container-auth-code{
    display: flex;
    ::v-deep{
      .facade-input-base{
        margin-right: 12px;
        &:last-child{
          margin-right: 0;
        }
      }
    }
  }
</style>