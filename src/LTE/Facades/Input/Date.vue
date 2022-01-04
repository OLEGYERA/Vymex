<template>
  <div class="facade-input-date">
    <div class="input-date-intro" @click="handleIntroClick">
      <input-base
        :model="model"
        :placeholder="placeholder"
        :mask="[/[0-3]/, /[0-9]/, '.', /[0-1]/, /[0-9]/, '.', /[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/]"
        labeled
      />
    </div>

  </div>
</template>

<script>
  import InputBase from '@Facade/Input/Base'
  import ModalBase from '@Facade/Modal/Base'
  import InputValidation from '@Facade/Input/Validation'

  export default {
    name: 'Facade.Input.Date',
    components: {
      InputBase,
      ModalBase,
      InputValidation
    },
    props: {
      model: {
        type: String,
        validator: model => {
          let splitTime = model.split('.')
          if(splitTime.length === 3)
            return Number(splitTime[0]) <= 31 && Number(splitTime[1]) <= 12 &&
            Number(splitTime[2]) >= 1920

          return false
        }
      },
      placeholder: String,
    },
    data(){
      return {
        modalDateStatus: false,
        year: null,
        newYear: null,
        yearError: null,
        day: null
      }
    },
    methods: {
      handleIntroClick(){
        this.modalDateStatus = true
      },
      handleNewYear(){
        let _year = Number(this.newYear);
        if(_year !== null){
          if(_year >= 1920 && _year <= (new Date).getFullYear() - 16){
            this.yearError = null;
            this.newYear = null
          } else {
            this.yearError = false;
            this.newYear = null;
          }
        }
      },
      handlePressOk(){

      }
    },
    computed: {

    },
  }
</script>

<style lang="scss" scoped>
  .facade-input-date{
    .input-date-intro{
      position: relative;
      cursor: pointer;
      &:after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
    .facade-modal-base{
      ::v-deep{
        .modal-base-body{
          height: 350px;
        }
        .date-picker{
          display: flex;
        }
      }
    }

  }
</style>