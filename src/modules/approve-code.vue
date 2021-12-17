<template>
  <div class="approve-code-module">
    <input-base
      disableDebounce
      mask-pattern="#"
      position="center"
      :disable="stage[2].val !== null || status === false"
      :input-model="stage[1].val"
      :input-focus="stage[1].toggleFocus"
      @onInput="fillCodeField(1, $event)"
    />
    <input-base
      disableDebounce
      mask-pattern="#"
      position="center"
      :disable="stage[1].val === null || stage[3].val !== null || status === false"
      :input-model="stage[2].val"
      :input-focus="stage[2].toggleFocus"
      @onInput="fillCodeField(2, $event)"
      @onKeyBackspace="backspaceCodeField(2)"
    />
    <input-base
      disableDebounce
      mask-pattern="#"
      position="center"
      :disable="stage[2].val === null || stage[4].val !== null || status === false"
      :input-model="stage[3].val"
      :input-focus="stage[3].toggleFocus"
      @onInput="fillCodeField(3, $event)"
      @onKeyBackspace="backspaceCodeField(3)"
    />
    <input-base
      disableDebounce
      mask-pattern="#"
      position="center"
      :disable="stage[3].val === null || stage[5].val !== null || status === false"
      :input-model="stage[4].val"
      :input-focus="stage[4].toggleFocus"
      @onInput="fillCodeField(4, $event)"
      @onKeyBackspace="backspaceCodeField(4)"
    />
    <input-base
      disableDebounce
      mask-pattern="#"
      position="center"
      :disable="stage[4].val === null || stage[6].val !== null || status === false"
      :input-model="stage[5].val"
      :input-focus="stage[5].toggleFocus"
      @onInput="fillCodeField(5, $event)"
      @onKeyBackspace="backspaceCodeField(5)"
    />
    <input-base
      disableDebounce
      mask-pattern="#"
      position="center"
      :disable="stage[5].val === null || status === false"
      :input-model="stage[6].val"
      :input-focus="stage[6].toggleFocus"
      @onInput="fillCodeField(6, $event)"
      @onKeyBackspace="backspaceCodeField(6)"
    />
  </div>
</template>

<script>
  import InputBase from '@/components/input/base'

  export default {
    name: 'approve.code.module',
    components: {
      InputBase
    },
    props: {
      status: Boolean
    },
    data() {
      return {
        stage: {
          '1': {
            val: null,
            toggleFocus: false
          },
          '2': {
            val: null,
            toggleFocus: false
          },
          '3': {
            val: null,
            toggleFocus: false
          },
          '4': {
            val: null,
            toggleFocus: false
          },
          '5': {
            val: null,
            toggleFocus: false
          },
          '6': {
            val: null,
            toggleFocus: false
          },
        }
      }
    },
    methods: {
      fillCodeField(stage, data){
        this.stage[stage].val = data ? data : null;
        if(this.stage[stage].val !== null && stage !== 6){
          setTimeout(() => this.stage[stage + 1].toggleFocus = !this.stage[stage + 1].toggleFocus, 0)
        }
        if(this.stage[stage].val !== null && stage === 6 && this.status !== false){
          this.$emit('onAction', this.putCodeTogether())
        }
      },
      backspaceCodeField(stage){
        this.stage[stage].val = null
        setTimeout(() => this.stage[stage - 1].toggleFocus = !this.stage[stage - 1].toggleFocus, 0)
      },
      putCodeTogether(){
        let codeStage = 1, fullCode = '';
        while (codeStage <= 6){
          fullCode += this.stage[codeStage].val
          codeStage++
        }
        return fullCode;
      },
      clearCodeFields(){
        let codeStage = 1;
        while (codeStage <= 6){
          this.stage[codeStage].val = null
          codeStage++
        }
      }
    },
    watch: {
      status(to){
        if(to){
          this.clearCodeFields()
          setTimeout(() => this.stage[1].toggleFocus = !this.stage[1].toggleFocus, 0)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .approve-code-module{
    display: flex;
    justify-content: space-between;
    .input-base{
      margin-right: 12px;
      &:last-child{
        margin-right: 0;
      }
    }
  }
</style>