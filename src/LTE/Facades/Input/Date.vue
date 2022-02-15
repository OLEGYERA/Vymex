<template>
  <div class="facade-input-date" :disable="disable">
    <div class="date-input" @click="openCalendarModalUi">
      <input-base
        :placeholder="placeholder"
        :model="dateModel"
        :disable="disable"
        labeled
      />
      <icon-date/>
    </div>
    <calendar-modal-ui
      :status="calendarModalStatus"
      :selected-date="dateModel"
      @onDate="pickNewDate"
      @onClose="calendarModalStatus=false"/>
  </div>
</template>

<script>
  import InputBase from '@Facade/Input/Base'
  import IconDate from '@Icon/Date'
  import {CalendarModalUi} from '@Providers'

  export default {
    name: 'Facade.Input.Date',
    components: {
      InputBase,
      IconDate,
      CalendarModalUi
    },
    props: {
      model: String,
      placeholder: String,
      disable: Boolean
    },
    mounted() {
      this.dateModel = this.model;
    },
    data: () => ({
      calendarModalStatus: false,
      dateModel: null
    }),
    methods: {
      openCalendarModalUi(){
        if(!this.disable) this.calendarModalStatus = true;
      },
      pickNewDate(date){
        this.dateModel = date;
        this.calendarModalStatus = false;
        this.$emit('onDate', this.dateModel)
      }
    },
    watch: {
      model(to){
        if(this.dateModel !== to) this.dateModel = to;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .facade-input-date {
    width: 100%;
    position: relative;

    .date-input {
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      z-index: 0;

      .icon-date {
        height: min-content;
        position: absolute;
        right: 4px;
        color: #fff;
        z-index: -1;
      }

      .facade-input-base {
        padding-right: 22px;
      }

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;
      }
    }

    &[disable] {
      outline: none;
      cursor: not-allowed;
      .icon-date{
        color: $grey-scale-300
      }
    }
  }
</style>